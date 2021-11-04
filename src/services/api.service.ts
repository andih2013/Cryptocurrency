import 'whatwg-fetch'

const APIURL = 'https://api.coingecko.com/api/v3/'

async function loadData(requestPath: string, queryString?: string): Promise<any> {
  // Use fetchPolyfill to avoid errors from the browsers that don't support fetch
  const url = `${APIURL}${requestPath}${queryString ?? ''}`;
  const response = await window.fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data.');
  }
  return response.json();
}

export { loadData }
