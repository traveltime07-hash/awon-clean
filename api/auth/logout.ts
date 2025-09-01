import { clearCookie } from "../_utils/auth";
export const config = { runtime: "edge" };

export default async function handler(): Promise<Response> {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "set-cookie": clearCookie()
    }
  });
}
