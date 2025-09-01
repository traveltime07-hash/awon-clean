export const config = { runtime: 'edge' };
export default async function handler(req: Request): Promise<Response> {
  let payload:any=null; try{ payload = await req.json(); }catch(_){}
  return new Response(JSON.stringify({ ok:true, received:payload||null, ts:new Date().toISOString() }, null, 2), {
    status: 200, headers: { 'content-type':'application/json; charset=utf-8', 'cache-control':'no-store', 'access-control-allow-origin':'*' }
  });
}
