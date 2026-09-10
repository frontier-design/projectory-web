import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from '@/config/site';

// POSTs a payload to Web3Forms with the shared headers and access key, and
// returns both the raw Response and the parsed body.
//

export async function submitToWeb3Forms(payload: Record<string, unknown>) {
  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, ...payload }),
  });

  const result = await response.json();

  return { response, result };
}
