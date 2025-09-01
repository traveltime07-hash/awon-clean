export const config = { runtime: "edge" };

const SECRET = "awon-demo-edge-secret-change-me"; // demo; później damy ENV

const enc = new TextEncoder();

async function hmac(input: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(input));
  const bytes = new Uint8Array(sig);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/=+$/g, "");
}

export async function createSession(email: string, role: "admin" | "owner", ttlSeconds = 60 * 60 * 24) {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const data = `${email}|${role}|${exp}`;
  const sig = await hmac(data);
  const value = `${data}|${sig}`;
  const cookie = `awon_session=${value}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${ttlSeconds}`;
  return { cookie, value, exp };
}

export function parseCookies(req: Request): Record<string, string> {
  const h = req.headers.get("cookie") || "";
  const out: Record<string, string> = {};
  h.split(";").forEach((part) => {
    const [k, ...rest] = part.trim().split("=");
    if (!k) return;
    out[k] = decodeURIComponent(rest.join("="));
  });
  return out;
}

export async function verifySession(req: Request): Promise<{ email: string; role: "admin" | "owner" } | null> {
  const cookies = parseCookies(req);
  const v = cookies["awon_session"];
  if (!v) return null;
  const parts = v.split("|");
  if (parts.length !== 4) return null;
  const [email, role, expStr, sig] = parts;
  const data = `${email}|${role}|${expStr}`;
  const expect = await hmac(data);
  if (expect !== sig) return null;
  const exp = parseInt(expStr, 10);
  if (isNaN(exp) || exp < Math.floor(Date.now() / 1000)) return null;
  if (role !== "admin" && role !== "owner") return null;
  return { email, role };
}

export function clearCookie(): string {
  return `awon_session=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0`;
}
