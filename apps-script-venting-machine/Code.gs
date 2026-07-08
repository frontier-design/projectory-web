/**
 * VENTING MACHINE API
 *
 * - Returns random questions from Prompts sheet
 * - Records responses in Responses sheet (max 3 words)
 * - Serves random responses or unique words extracted from Responses
 * - Accepts API key via query (?key=) or header (x-api-key)
 */

// ---------- Config ----------
const CONFIG = (function () {
  const properties = PropertiesService.getScriptProperties();
  return {
    // API_KEY must be set in Script Properties (Project Settings → Script
    // Properties). Never hardcode it here — this file is in a public repo.
    API_KEY: (properties.getProperty('API_KEY') || '').trim(),
    SPREADSHEET_ID:
      (properties.getProperty('SPREADSHEET_ID') || '').trim() ||
      '1KIqnUsqvbZJbSLSSfPkY7p8ILKLu-B2k6cy1zTlCSbo4',

    // Read caching (seconds)
    PROMPTS_CACHE_TTL: 300,      // 5 min
    RESPONSES_CACHE_TTL: 60,     // 1 min (responses change more often)

    // Cache keys
    PROMPTS_CACHE_KEY: 'prompts:v1',
    RESPONSES_CACHE_KEY: 'responses:v1',

    // Persistence sheet for unique printed words
    PRINTED_WORDS_SHEET: 'PrintedWords',
  };
})();

// ---------- Utils ----------
function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function errorResponse(message) {
  return jsonResponse({ error: String(message) });
}

function getApiKey_(e) {
  const paramsKey = (e && e.parameter && e.parameter.key) || '';
  const headers = (e && e.headers) || {};
  const headerKey = headers['x-api-key'] || headers['X-Api-Key'] || '';
  return (paramsKey || headerKey || '').trim();
}

function requireAuth_(e) {
  const got = getApiKey_(e);
  const expected = (CONFIG.API_KEY || '').trim();
  if (!expected || got !== expected) {
    throw new Error('Unauthorized');
  }
}

// ---------- Lazy sheet handles ----------
let _ss, _promptsSheet, _responsesSheet;

function getSS_() {
  if (!_ss) _ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  return _ss;
}

function getPromptsSheet_() {
  if (_promptsSheet) return _promptsSheet;
  const ss = getSS_();
  // Support either "Prompt" or "Prompts"
  _promptsSheet = ss.getSheetByName('Prompt') || ss.getSheetByName('Prompts');
  return _promptsSheet;
}

function getResponsesSheet_() {
  if (_responsesSheet) return _responsesSheet;
  const ss = getSS_();
  _responsesSheet = ss.getSheetByName('Responses');
  return _responsesSheet;
}

// ---------- Cached reads ----------
function loadPromptsFromSheet_() {
  const sheet = getPromptsSheet_();
  if (!sheet) throw new Error('Prompt/Prompts sheet not found');
  const lastRow = sheet.getLastRow();
  if (lastRow < 1) return [];
  const values = sheet.getRange(1, 1, lastRow, 1).getValues().map(r => String(r[0]).trim());
  const first = (values[0] || '').toLowerCase();
  const hasHeader = ['prompt', 'prompts', 'question', 'questions'].indexOf(first) !== -1;
  const prompts = (hasHeader ? values.slice(1) : values).filter(v => v.length > 0);
  return prompts;
}

function getCachedPrompts_() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get(CONFIG.PROMPTS_CACHE_KEY);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed)) return parsed;
    } catch (_) {}
  }
  const prompts = loadPromptsFromSheet_();
  cache.put(CONFIG.PROMPTS_CACHE_KEY, JSON.stringify(prompts), Math.min(CONFIG.PROMPTS_CACHE_TTL, 600));
  return prompts;
}

function loadResponsesFromSheet_() {
  const sheet = getResponsesSheet_();
  if (!sheet) throw new Error('Responses sheet not found');
  const lastRow = sheet.getLastRow();
  if (lastRow < 1) return [];
  // Column C = Answer per your writer
  const values = sheet.getRange(1, 3, lastRow, 1).getValues().map(r => String(r[0]).trim());
  const first = (values[0] || '').toLowerCase();
  const hasHeader = ['answer', 'answers', 'response', 'responses'].indexOf(first) !== -1;
  const answers = (hasHeader ? values.slice(1) : values).filter(v => v.length > 0);
  return answers;
}

function getCachedResponses_() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get(CONFIG.RESPONSES_CACHE_KEY);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed)) return parsed;
    } catch (_) {}
  }
  const answers = loadResponsesFromSheet_();
  cache.put(CONFIG.RESPONSES_CACHE_KEY, JSON.stringify(answers), Math.min(CONFIG.RESPONSES_CACHE_TTL, 600));
  return answers;
}

// ---------- HTTP Handlers ----------
function doGet(e) {
  try {
    if (!e) return testConnection();

    // Auth
    try {
      requireAuth_(e);
    } catch (err) {
      return errorResponse(err.message || 'Unauthorized');
    }

    const params = e.parameter || {};
    const action = (params.action || '').trim();

    if (action === 'question') return getRandomQuestion_();
    if (action === 'randomResponse') return getRandomResponse_();
    if (action === 'randomResponses') return getRandomResponses_(params.n);
    if (action === 'randomUniqueWord') return getRandomUniqueWord_();
    if (action === 'test') return testConnection();

    if (!action) {
      return jsonResponse({
        message: 'Venting Machine API',
        availableActions: ['question', 'randomResponse', 'randomResponses', 'randomUniqueWord', 'test'],
        usage:
          'GET ?action=question&key=YOUR_API_KEY\n' +
          'GET ?action=randomResponse&key=YOUR_API_KEY\n' +
          'GET ?action=randomResponses&n=5&key=YOUR_API_KEY\n' +
          'GET ?action=randomUniqueWord&key=YOUR_API_KEY\n' +
          'GET ?action=test&key=YOUR_API_KEY\n',
      });
    }

    return errorResponse('Invalid action. Available actions: question, randomResponse, randomResponses, randomUniqueWord, test');
  } catch (error) {
    console.error('doGet error:', error);
    return errorResponse(error.toString());
  }
}

function doPost(e) {
  try {
    if (!e) return errorResponse('Invalid request');

    try {
      requireAuth_(e);
    } catch (err) {
      return errorResponse(err.message || 'Unauthorized');
    }

    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (_) {
      return errorResponse('Invalid JSON');
    }

    if (!data || !data.question || !data.answer) {
      return errorResponse('Missing question or answer');
    }

    return submitResponse_(String(data.question), String(data.answer));
  } catch (error) {
    console.error('doPost error:', error);
    return errorResponse(error.toString());
  }
}

// ---------- Endpoints ----------
function testConnection() {
  return jsonResponse({
    message: 'Venting Machine API is working!',
    timestamp: new Date().toISOString(),
    config: {
      hasApiKey: !!CONFIG.API_KEY,
      hasSpreadsheetId: !!CONFIG.SPREADSHEET_ID,
      apiKeyLength: CONFIG.API_KEY ? CONFIG.API_KEY.length : 0,
      spreadsheetIdLength: CONFIG.SPREADSHEET_ID ? CONFIG.SPREADSHEET_ID.length : 0,
      availableActions: ['question', 'randomResponse', 'randomResponses', 'randomUniqueWord', 'test']
    },
  });
}

// ---- Questions (Prompts) ----
function getRandomQuestion_() {
  try {
    const prompts = getCachedPrompts_();
    if (!prompts.length) return errorResponse('No questions found in Prompts sheet');
    const idx = Math.floor(Math.random() * prompts.length);
    return jsonResponse({
      question: prompts[idx],
      totalQuestions: prompts.length,
    });
  } catch (error) {
    console.error('getRandomQuestion error:', error);
    return errorResponse('Failed to get random question: ' + error.toString());
  }
}

// ---- Responses (answers) convenience ----
function getRandomResponse_() {
  try {
    const answers = getCachedResponses_();
    if (!answers.length) return errorResponse('No answers found');
    const idx = Math.floor(Math.random() * answers.length);
    return jsonResponse({ answer: answers[idx], totalAnswers: answers.length });
  } catch (error) {
    console.error('getRandomResponse error:', error);
    return errorResponse('Failed to get random answer: ' + error.toString());
  }
}

function getRandomResponses_(n) {
  try {
    const count = Math.max(1, Math.min(Number(n) || 5, 100));
    const answers = getCachedResponses_();
    if (!answers.length) return errorResponse('No answers found');

    const out = [];
    if (count <= answers.length) {
      const idx = Array.from({ length: answers.length }, (_, i) => i);
      for (let i = 0; i < count; i++) {
        const r = i + Math.floor(Math.random() * (idx.length - i));
        const t = idx[i]; idx[i] = idx[r]; idx[r] = t;
        out.push(answers[idx[i]]);
      }
    } else {
      for (let i = 0; i < count; i++) {
        out.push(answers[Math.floor(Math.random() * answers.length)]);
      }
    }
    return jsonResponse({ answers: out, totalAnswers: answers.length });
  } catch (error) {
    console.error('getRandomResponses error:', error);
    return errorResponse('Failed to get random answers: ' + error.toString());
  }
}

// ---- Unique single word across all Responses ----

// Normalize a word: NFKD -> strip diacritics -> keep [A-Za-z0-9'-] -> lowercase
function normalizeWord_(s) {
  if (!s) return '';
  const nf = String(s).normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  const cleaned = nf.replace(/[^A-Za-z0-9'-]+/g, ' ');
  return cleaned.trim().toLowerCase();
}

// Tokenize a phrase into normalized words (unique per phrase)
function tokenizePhrase_(phrase) {
  const n = normalizeWord_(phrase || '');
  if (!n) return [];
  const words = n.split(/\s+/).filter(Boolean);
  return words.map(w => w.replace(/^[-']+|[-']+$/g,'')).filter(Boolean);
}

// Build the current unique word set from Responses (col C)
function collectAllWordsFromResponses_() {
  const answers = getCachedResponses_();
  const bag = new Set();
  for (let i = 0; i < answers.length; i++) {
    const words = tokenizePhrase_(answers[i]);
    for (const w of words) bag.add(w);
  }
  return Array.from(bag);
}

// PrintedWords sheet helpers
function getPrintedWordsSheet_() {
  const ss = getSS_();
  let sh = ss.getSheetByName(CONFIG.PRINTED_WORDS_SHEET);
  if (!sh) {
    sh = ss.insertSheet(CONFIG.PRINTED_WORDS_SHEET);
    sh.getRange(1,1,1,2).setValues([['Word','FirstPrintedAt']]);
  }
  return sh;
}

function getPrintedWordsSet_() {
  const sh = getPrintedWordsSheet_();
  const last = sh.getLastRow();
  if (last < 2) return new Set();
  const vals = sh.getRange(2, 1, last - 1, 1).getValues();
  const set = new Set();
  for (let i = 0; i < vals.length; i++) {
    const w = String(vals[i][0] || '').trim().toLowerCase();
    if (w) set.add(w);
  }
  return set;
}

function addPrintedWord_(w) {
  if (!w) return;
  const sh = getPrintedWordsSheet_();
  const next = sh.getLastRow() + 1;
  sh.getRange(next, 1, 1, 2).setValues([[String(w), new Date()]]);
}

// Endpoint: one never-before-printed word (global, persistent)
function getRandomUniqueWord_() {
  try {
    const allWords = collectAllWordsFromResponses_();
    if (!allWords.length) return errorResponse('No words available');

    const printed = getPrintedWordsSet_();
    const candidates = allWords.filter(w => !printed.has(w));
    if (!candidates.length) {
      return jsonResponse({
        word: null,
        done: true,
        message: 'No unused words remain. You have printed every word currently present in the sheet.',
      });
    }

    const idx = Math.floor(Math.random() * candidates.length);
    const chosen = candidates[idx];

    // Persist immediately to prevent duplicates across devices/runs
    addPrintedWord_(chosen);

    return jsonResponse({
      word: chosen,
      remaining: candidates.length - 1,
      totalUniqueWords: allWords.length,
      mode: 'unique-words-global'
    });
  } catch (error) {
    console.error('getRandomUniqueWord error:', error);
    return errorResponse('Failed to get unique word: ' + error.toString());
  }
}

// ---------- Writes ----------
function submitResponse_(question, answer) {
  try {
    const sheet = getResponsesSheet_();
    if (!sheet) return errorResponse('Responses sheet not found');

    // Validate word count (max 3 words)
    const wordCount = String(answer).trim().split(/\s+/).filter(Boolean).length;
    if (wordCount > 3) {
      return errorResponse('Answer must be 3 words or less');
    }

    sheet.appendRow([new Date(), question, String(answer).trim()]);

    return jsonResponse({
      success: true,
      message: 'Response recorded successfully',
      wordCount
    });
  } catch (error) {
    console.error('submitResponse error:', error);
    return errorResponse('Failed to submit response: ' + error.toString());
  }
}