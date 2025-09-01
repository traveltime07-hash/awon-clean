export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  const host = (req.headers.get('host') || '').toLowerCase();
  const isStaging = host.startsWith('staging.');

  const body = isStaging
    ? "User-agent: *\nDisallow: /\n"
    : "User-agent: *\nAllow: /\nSitemap: https://awonsystem.pl/sitemap.xml\n";

  const headers: Record<string, string> = {
    "content-type": "text/plain; charset=utf-8",
    "cache-control": "public, max-age=300"
  };

  if (isStaging) {
    headers["x-robots-tag"] = "noindex, nofollow, noarchive";
  }

  return new Response(body, { status: 200, headers });
}
