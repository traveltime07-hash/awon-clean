import { verifySession } from "../_utils/auth";
export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  const s = await verifySession(req);
  if (!s) return new Response("Unauthorized", { status: 401 });
  return new Response(JSON.stringify({ ok: true, ...s }), { status: 200, headers: { "content-type": "application/json" } });
}
