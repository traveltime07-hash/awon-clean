/** OG image generator (PNG 1200x630) */
import { ImageResponse } from '@vercel/og';
export const config = { runtime: 'edge' };

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'AWON — system zarządzania wynajmem';
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px', height: '630px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: '#0F172A', color: '#E5E7EB', padding: '60px 80px',
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif'
        }}
      >
        {/* Logo mark */}
        <div style={{ display:'flex', alignItems:'center', gap: 24 }}>
          <div style={{
            width: 140, height: 140, borderRadius: 28, background: '#0F172A',
            boxShadow: '0 10px 30px rgba(0,0,0,.35)', position:'relative', border:'2px solid #22C55E'
          }}>
            {/* Domek + check w SVG paths */}
            <svg width="140" height="140" viewBox="0 0 72 72" style={{position:'absolute',left:34,top:26}}>
              <path d="M10 40 L36 20 L62 40" fill="none" stroke="#22C55E" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 40 V56 H52 V40" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M26 48 L32 54 L44 42" fill="none" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap: 8 }}>
            <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: .5 }}>AWON</div>
            <div style={{ fontSize: 28, color: '#94A3B8' }}>system zarządzania wynajmem</div>
          </div>
        </div>
        {/* Tytuł strony */}
        <div style={{
          maxWidth: 560, textAlign: 'right', fontSize: 44, fontWeight: 700, lineHeight: 1.15,
          color: '#E5E7EB'
        }}>
          {title}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
