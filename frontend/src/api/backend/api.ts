const baseUrl = '/api/';
// const baseUrl = 'http://localhost:5121/api/';

export async function api(
  input: string,
  init?: RequestInit
): Promise<Response> {
  return fetch(baseUrl + input, init);
}
