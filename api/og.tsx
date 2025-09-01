import { ImageResponse } from '@vercel/og';
export const config = { runtime: 'edge' };

let fontDataPromise: Promise<ArrayBuffer> | null = null;
function loadFont() {
  if (!fontDataPromise) {
    fontDataPromise = fetch('https://og-playground.vercel.app/inter-latin-ext-700-normal.woff')
      .then(r => r.arrayBuffer());
  }
  return fontDataPromise;
}

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') ?? 'AWON — system zarządzania wynajmem';
    const fontData = await loadFont();
    return new ImageResponse(
      (
        <div style={{
          backgroundColor:'#0F172A', color:'#E5E7EB', width:1200, height:630,
          display:'flex', alignItems:'center', justifyContent:'center', padding:60
        }}>
          <div style={{ fontSize:64, fontWeight:700, lineHeight:1.2, textAlign:'center', maxWidth:1000 }}>
            {title}
          </div>
        </div>
      ),
      { width:1200, height:630, fonts:[{ name:'Inter', data:fontData, weight:700, style:'normal' }] }
    );
  } catch {
    return new Response('OG error', { status: 500 });
  }
}
