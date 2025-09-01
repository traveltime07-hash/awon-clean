export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const raw = url.searchParams.get('path') || '/';
  const path = raw.startsWith('/') ? raw : '/' + raw;

  // Złóż adres do tej samej domeny (staging/production)
  const proto = req.headers.get('x-forwarded-proto') || 'https';
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || '';
  const target = `${proto}://${host}${path}`;

  try {
    // GET (nie HEAD), żeby uniknąć 405 przy niektórych plikach statycznych
    const r = await fetch(target, { method: 'GET', headers: { 'cache-control': 'no-cache' } });

    const headers: Record<string, string> = {};
    r.headers.forEach((v, k) => { headers[k] = v; });

    return json({
      ok: true,
      target,
      status: r.status,
      statusText: r.statusText,
      headers
    });
  } catch (e: any) {
    return json({ ok: false, target, error: String(e) }, 500);
  }
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'access-control-allow-origin': '*'
    }
  });
}
