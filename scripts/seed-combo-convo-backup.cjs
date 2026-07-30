const fs = require("fs");
const path = require("path");

const fetch = globalThis.fetch || require("node-fetch");

const SUBMIT_URL =
  "https://script.google.com/macros/s/AKfycbyBjqgKCilAgqqpy_HkuyrrJ0HaLka-Ch6yea-swOFSKnfRu7dPO7dTc4yLNx2gQ0ZR/exec";

const DELAY_MS = 800;

function parsePayloadMessage(message) {
  const prefix = "POST payload: ";
  if (!message || typeof message !== "string" || !message.startsWith(prefix)) {
    return null;
  }
  const objStr = message.slice(prefix.length).trim();
  if (!objStr.startsWith("{")) return null;

  try {
    // Log format is JS object literal (single/double quotes). Safe to use
    // Function here since input is from our own server logs.
    const fn = new Function("return (" + objStr + ")");
    const payload = fn();
    if (!payload || typeof payload !== "object") return null;
    return {
      orangeCard: String(payload.orangeCard ?? ""),
      blueCard: String(payload.blueCard ?? ""),
      whatIsA: String(payload.whatIsA ?? ""),
      thatCould: String(payload.thatCould ?? ""),
      freeText: String(payload.freeText ?? ""),
      email: String(payload.email ?? ""),
    };
  } catch (e) {
    return null;
  }
}

function extractPayloads(logEntries) {
  const payloads = [];
  const seen = new Set();
  for (const entry of logEntries) {
    const msg = entry.message;
    const payload = parsePayloadMessage(msg);
    if (!payload) continue;
    const key = `${payload.orangeCard}|${payload.blueCard}|${payload.freeText}`;
    if (seen.has(key)) continue;
    seen.add(key);
    payloads.push(payload);
  }
  return payloads;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function postPayload(payload, index, total) {
  const res = await fetch(SUBMIT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  let body;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text.slice(0, 100) };
  }
  const ok = res.ok && body.success !== false && !body.error;
  const status = `${res.status} ${ok ? "OK" : "FAIL"}`;
  const short = [
    payload.orangeCard,
    payload.blueCard,
    payload.freeText?.slice(0, 30),
  ].join(" | ");
  console.log(`[${index + 1}/${total}] ${status} – ${short}`);
  if (!ok) {
    console.warn("  response:", body.error || body.raw || text.slice(0, 150));
  }
  return { index, ok, payload, body };
}

async function main() {
  const backupPath = path.resolve(
    process.cwd(),
    process.argv[2] || "backupData.json",
  );
  if (!fs.existsSync(backupPath)) {
    console.error("Backup file not found:", backupPath);
    process.exit(1);
  }

  const raw = fs.readFileSync(backupPath, "utf8");
  let entries;
  try {
    entries = JSON.parse(raw);
  } catch (e) {
    console.error("Invalid JSON in backup file:", e.message);
    process.exit(1);
  }

  if (!Array.isArray(entries)) {
    console.error("Backup file must be a JSON array of log entries.");
    process.exit(1);
  }

  const payloads = extractPayloads(entries);
  console.log(`Found ${payloads.length} unique POST payloads in backup.\n`);

  if (payloads.length === 0) {
    console.log("Nothing to seed. Exiting.");
    process.exit(0);
  }

  const results = [];
  for (let i = 0; i < payloads.length; i++) {
    const r = await postPayload(payloads[i], i, payloads.length);
    results.push(r);
    if (i < payloads.length - 1) await sleep(DELAY_MS);
  }

  const okCount = results.filter((r) => r.ok).length;
  const failCount = results.length - okCount;
  console.log("\nDone.");
  console.log(`  Success: ${okCount}`);
  if (failCount) console.log(`  Failed:  ${failCount}`);
  process.exit(failCount ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
