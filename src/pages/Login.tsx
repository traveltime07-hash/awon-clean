import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Lock, Mail, LogIn } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSubmitting(true);
      await new Promise(r => setTimeout(r, 400));
      navigate("/");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100 flex flex-col">
      <header className="border-b border-slate-800/60">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 font-semibold tracking-tight">
            <img src="/logo/awon-mark.svg" alt="" width={24} height={24} className="opacity-90" />
            <span>AWON</span>
          </Link>
          <nav className="text-sm">
            <Link to="/contact.html" className="hover:underline">Kontakt</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <section className="hidden md:block">
              <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
                Zaloguj się
              </h1>
              <p className="mt-3 text-slate-300/90 max-w-prose">
                Dostęp do panelu zarządzania obiektami noclegowymi AWON.
              </p>
            </section>

            <section className="bg-slate-900/70 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-lg shadow-slate-950/30">
              <form className="space-y-5" onSubmit={onSubmit}>
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-1">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 opacity-70" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      autoComplete="email"
                      required
                      placeholder="np. jan.kowalski@example.com"
                      className="w-full pl-10 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:border-slate-500 outline-none placeholder-slate-400 text-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-1">Hasło</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 opacity-70" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                      placeholder="••••••••"
                      className="w-full pl-10 pr-3 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:border-slate-500 outline-none placeholder-slate-400 text-slate-100"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium bg-slate-100 text-slate-900 hover:bg-white disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <LogIn className="size-4" />
                  {submitting ? "Logowanie…" : "Zaloguj się"}
                </button>

                <p className="text-sm text-slate-400">
                  Nie masz konta?{" "}
                  <Link to="/register" className="text-slate-200 hover:underline">
                    Zarejestruj się
                  </Link>
                </p>
              </form>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800/60">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between text-sm text-slate-400">
          <div className="inline-flex items-center gap-2">
            <img src="/logo/awon-mark.svg" width={16} height={16} alt="" />
            <span>AWON</span>
          </div>
          <div>awonsystem.pl</div>
        </div>
      </footer>
    </div>
  );
}
