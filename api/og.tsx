import { ImageResponse } from '@vercel/og';
export const config = { runtime: 'edge' };
// (dla pewności, nie jest wymagane, ale nie szkodzi)
export const contentType = 'image/png';

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'AWON — system zarządzania wynajmem';

    return new ImageResponse(
      (
        <div
          style={{
            // KLUCZOWE: używamy backgroundColor i WARTOŚCI LICZBOWYCH (bez 'px')
            backgroundColor: '#0F172A',
            color: '#E5E7EB',
            width: 1200,
            height: 630,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 60,
            fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif'
          }}
        >
          {/* lewa strona: logo + nazwa */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ width: 140, height: 140, borderRadius: 28, border: '4px solid #22C55E', position: 'relative' }}>
              <svg width="140" height="140" viewBox="0 0 72 72" style={{ position: 'absolute', left: 28, top: 20 }}>
                <path d="M10 40 L36 20 L62 40" fill="none" stroke="#22C55E" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 40 V56 H52 V40" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M26 48 L32 54 L44 42" fill="none" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: 0.5 }}>AWON</div>
              <div style={{ fontSize: 28, color: '#94A3B8' }}>system zarządzania wynajmem</div>
            </div>
          </div>

          {/* prawa strona: tytuł */}
          <div style={{ maxWidth: 560, textAlign: 'right', fontSize: 44, fontWeight: 700, lineHeight: 1.15 }}>
            {title}
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (e: any) {
    return new Response('OG error: ' + String(e?.message || e), { status: 500 });
  }
}
