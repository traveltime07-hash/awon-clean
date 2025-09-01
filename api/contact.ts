export const config = { runtime: 'edge' };

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  website?: string; // honeypot
};

function isEmail(x: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x);
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  let data: ContactPayload = {};
  const ct = req.headers.get('content-type') || '';

  try {
    if (ct.includes('application/json')) {
      data = await req.json();
    } else if (ct.includes('application/x-www-form-urlencoded')) {
      const form = await req.formData();
      data = Object.fromEntries(form.entries()) as ContactPayload;
    } else if (ct.includes('multipart/form-data')) {
      const form = await req.formData();
      data = Object.fromEntries(form.entries()) as ContactPayload;
    } else {
      return json({ ok: false, error: 'Unsupported Content-Type' }, 415);
    }
  } catch {
    return json({ ok: false, error: 'Invalid payload' }, 400);
  }

  // Honeypot — jeśli wypełnione, odrzucamy
  if (data.website && String(data.website).trim() !== '') {
    return json({ ok: true }, 204); // cicho ignorujemy bota
  }

  const name = String(data.name || '').trim();
  const email = String(data.email || '').trim().toLowerCase();
  const message = String(data.message || '').trim();

  if (!name || !email || !message) {
    return json({ ok: false, error: 'Wymagane pola: name, email, message' }, 400);
  }
  if (!isEmail(email)) {
    return json({ ok: false, error: 'Nieprawidłowy email' }, 400);
  }
  if (message.length > 4000) {
    return json({ ok: false, error: 'Wiadomość zbyt długa' }, 400);
  }

  // Log do Vercel (podgląd w Functions → Logs)
  console.log('AWON_CONTACT', { name, email, message, ts: new Date().toISOString() });

  return json({ ok: true });
}

function corsHeaders() {
  return {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'cache-control': 'no-store',
    'content-type': 'application/json; charset=utf-8'
  };
}

function json(obj: unknown, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: corsHeaders() });
}
