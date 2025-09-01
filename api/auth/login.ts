import { createSession } from "../_utils/auth";

export const config = { runtime: "edge" };

const ADMIN_EMAIL = "traveltime07@gmail.com";
const ADMIN_PASS  = "12345678aA";

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  let body: any = {};
  try {
    body = await req.json();
  } catch {}

  const email = String(body?.email || "");
  const pass  = String(body?.password || "");

  if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
    const { cookie } = await createSession(email, "admin", 60 * 60 * 24 * 7);
    return new Response(JSON.stringify({ ok: true, role: "admin", email }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "set-cookie": cookie
      }
    });
  }

  return new Response(JSON.stringify({ ok: false, error: "Invalid credentials" }), {
    status: 401,
    headers: { "content-type": "application/json" }
  });
}
