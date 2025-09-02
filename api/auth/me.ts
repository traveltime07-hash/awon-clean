// api/auth/me.ts
// Edge Function (Edge = funkcja wykonywana w szybkiej infrastrukturze Vercel, bez Node.js – używa Web API Request/Response)
export const runtime = "edge";

export async function GET(_req: Request) {
  // MOCK zwracający „zalogowanego” użytkownika – do czasu podpięcia prawdziwej sesji
  return Response.json({ email: "demo@awonsystem.pl", role: "owner" });
}
