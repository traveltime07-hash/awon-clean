export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.searchParams.get('path') || '/';
  const host = req.headers.get('host') || '';
  const target = `https://${host}${path}`;

  try {
    const r = await fetch(target, { cache: 'no-store' });
    const cc = r.headers.get('cache-control') || '';
    const ct = r.headers.get('content-type') || '';
    const body = JSON.stringify({ path, status: r.status, cacheControl: cc, contentType: ct, target }, null, 2);
    return new Response(body, {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'access-control-allow-origin': '*' }
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: 'FETCH_FAILED', message: String(e?.message || e) }, null, 2), {
      status: 500,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'access-control-allow-origin': '*' }
    });
  }
}
