export const config = { runtime: "edge" };

export default async function handler(): Promise<Response> {
  const body = {
    status: "ok",
    service: "awonsystem",
    time: new Date().toISOString(),
    env: "production"
  };
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
}
