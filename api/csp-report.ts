export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return new Response(null, { status: 204 });
  // Raportów nie zapisujemy – wystarczy 204 No Content
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "cache-control": "no-store"
    }
  });
}
