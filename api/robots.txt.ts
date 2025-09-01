export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  const proto = req.headers.get('x-forwarded-proto') || 'https';
  const host  = req.headers.get('x-forwarded-host') || req.headers.get('host') || '';
  const base  = `${proto}://${host}`;
  const isStaging = host.startsWith("staging.");

  // Uwaga: brand/thanks/health itp. i tak zabezpieczamy nagłówkiem X-Robots-Tag w vercel.json
  const lines = isStaging
    ? [
        "User-agent: *",
        "Disallow: /",
        `# Staging: blokujemy indeksację`,
        `# ${base}`
      ]
    : [
        "User-agent: *",
        "Disallow:",
        `Sitemap: ${base}/sitemap.xml`,
        `# Production: indeksacja dozwolona`
      ];

  return new Response(lines.join("\n") + "\n", {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600"
    }
  });
}
