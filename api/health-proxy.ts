export const config = { runtime: 'edge' }; // działa szybciej i nie wymaga zależności

export default async function handler(request: Request): Promise<Response> {
  const target = 'https://api.awonsystem.pl/health';

  try {
    const upstream = await fetch(target, {
      // przekazujemy akceptowane typy; bez cookies
      headers: { 'accept': 'application/json, text/plain;q=0.9, */*;q=0.8' },
      // cache wyłączony – zawsze świeże
      cache: 'no-store',
    });

    const contentType = upstream.headers.get('content-type') || 'application/json; charset=utf-8';
    const text = await upstream.text();

    return new Response(text, {
      status: upstream.status,
      headers: {
        'content-type': contentType,
        // CORS na wszelki wypadek (choć i tak jest to nasz origin)
        'access-control-allow-origin': '*',
        'cache-control': 'no-store',
      },
    });
  } catch (err: any) {
    const body = JSON.stringify({
      ok: false,
      error: 'UPSTREAM_FETCH_FAILED',
      details: (err && err.message) ? String(err.message) : 'unknown',
    });

    return new Response(body, {
      status: 502,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'access-control-allow-origin': '*',
        'cache-control': 'no-store',
      },
    });
  }
}
