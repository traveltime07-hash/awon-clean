export const config = { runtime: 'edge' };
export default async function handler(req: Request): Promise<Response> {
  if(req.method!=='POST') return new Response(null,{status:204,headers:{'cache-control':'no-store','access-control-allow-origin':'*'}});
  let payload:any=null; try{ payload = await req.json(); }catch(_){}
  console.log('AWON EVENT', payload);
  return new Response(null, { status: 204, headers: { 'cache-control':'no-store', 'access-control-allow-origin':'*' }});
}
