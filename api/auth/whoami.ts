export const config = { runtime: 'edge' };
export default async function handler(_req: Request): Promise<Response> {
  return new Response(JSON.stringify({ ok: true, endpoint: "auth/whoami", user: null }), {
    status: 200,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "access-control-allow-origin": "*" }
  });
}
