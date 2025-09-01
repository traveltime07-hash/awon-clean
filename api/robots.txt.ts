export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  const u = new URL(req.url);
  const host = u.hostname;                      // <- prawdziwy host z URL
  const proto = u.protocol.replace(":", "") || "https";
  const base  = `${proto}://${host}`;
  const isStaging = host.startsWith("staging."); // <- pewna detekcja

  const lines = isStaging
    ? [
        "User-agent: *",
        "Disallow: /",
        `# staging: blokada indeksacji`,
        `# ${base}`
      ]
    : [
        "User-agent: *",
        "Disallow:",                       // standard (pusto = dozwolone wszystko)
        `Sitemap: ${base}/sitemap.xml`,
        `# production: indeksacja dozwolona`
      ];

  return new Response(lines.join("\n") + "\n", {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",        // <- brak cache
      "vary": "Host"                      // <- rozdziel cache per host gdyby jednak
    }
  });
}
