export const config = { runtime: 'edge' };

const PAGES: Array<{ loc: string; changefreq?: string; priority?: number }> = [
  { loc: "/" , changefreq: "daily", priority: 1.0 },
  { loc: "/contact.html", changefreq: "monthly", priority: 0.6 }
  // celowo NIE dodajemy: /thanks.html, /brand.html, /health.html, testów itp.
];

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const proto = req.headers.get('x-forwarded-proto') || 'https';
  const host  = req.headers.get('x-forwarded-host') || req.headers.get('host') || url.host;
  const base  = `${proto}://${host}`;

  const now = new Date().toISOString();

  const xmlItems = PAGES.map(p => {
    const u = `${base}${p.loc}`;
    return [
      "<url>",
      `<loc>${escapeXml(u)}</loc>`,
      `<lastmod>${now}</lastmod>`,
      p.changefreq ? `<changefreq>${p.changefreq}</changefreq>` : "",
      p.priority   != null ? `<priority>${p.priority.toFixed(1)}</priority>` : "",
      "</url>"
    ].join("");
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>` +
              `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlItems}</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600"  // 1h
    }
  });
}

function escapeXml(s: string) {
  return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");
}
