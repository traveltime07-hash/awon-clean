export const config = { runtime: 'edge' };

type Contact = { name: string; email: string; message: string; website?: string };

export default async function handler(req: Request): Promise<Response> {
  // preflight CORS (na wszelki wypadek, gdyby ktoś chciał wysłać JSON przez fetch)
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders()
    });
  }

  try {
    if (req.method !== 'POST') {
      return json({ ok: false, error: 'Method Not Allowed' }, 405);
    }

    const u = new URL(req.url);
    const redirect = u.searchParams.get('redirect') || '/thanks.html';

    const ct = (req.headers.get('content-type') || '').toLowerCase();

    let data: Contact = { name: '', email: '', message: '' };

    if (ct.includes('application/json')) {
      const body = await req.json();
      data = {
        name: String(body.name || ''),
        email: String(body.email || ''),
        message: String(body.message || ''),
        website: String(body.website || '')
      };
    } else {
      const form = await req.formData();
      data = {
        name: String(form.get('name') || ''),
        email: String(form.get('email') || ''),
        message: String(form.get('message') || ''),
        website: String(form.get('website') || '')
      };
    }

    // honeypot
    if (data.website && data.website.trim() !== '') {
      return json({ ok: true, note: 'honeypot' }, 202);
    }

    // prosta walidacja
    if (data.name.trim().length < 2) return json({ ok: false, error: 'name' }, 400);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) return json({ ok: false, error: 'email' }, 400);
    if (data.message.trim().length < 10) return json({ ok: false, error: 'message' }, 400);

    // TODO: tutaj w kolejnym kroku podłączymy e-mail (Resend/SMTP)
    // Tymczasem log (do podglądu w Vercel → Functions → Logs)
    console.log('CONTACT', {
      at: new Date().toISOString(),
      ip: req.headers.get('x-forwarded-for') || 'unknown',
      ua: req.headers.get('user-agent') || 'unknown',
      name: data.name,
      email: data.email,
      len: data.message.length
    });

    // Jeśli to formularz (a nie JSON API), zrób 303 → /thanks.html
    if (!ct.includes('application/json')) {
      return new Response(null, {
        status: 303, // See Other
        headers: { 'Location': redirect, ...corsHeaders() }
      });
    }

    // Odpowiedź JSON dla klientów API
    return json({ ok: true }, 200);
  } catch (e: any) {
    return json({ ok: false, error: String(e) }, 500);
  }
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...corsHeaders(), 'cache-control': 'no-store' }
  });
}

function corsHeaders() {
  return {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type'
  };
}
