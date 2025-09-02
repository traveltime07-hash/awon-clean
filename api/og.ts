export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') ?? 'AWON — system zarządzania wynajmem';
    // Ciemne tło #0F172A, jasny tekst #E5E7EB, format PNG 1200x630
    const remote = `https://placehold.co/1200x630/0F172A/E5E7EB/png?text=${encodeURIComponent(title)}`;
    const r = await fetch(remote, { cache: 'no-store' });
    return new Response(r.body, {
      status: r.status,
      headers: {
        'content-type': 'image/png',
        // cache 1 dzień – żeby roboty nie męczyły funkcji
        'cache-control': 'public, max-age=86400'
      }
    });
  } catch (e) {
    return new Response('OG proxy error', { status: 500 });
  }
}
