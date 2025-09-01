import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          {/* left: logo + name */}
          <Link to="/" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 font-bold">
              AW
            </div>
            <div>
              <div className="text-base font-semibold leading-5">AWON</div>
              <div className="text-xs text-slate-400 leading-4">
                Administracja wynajmem obiektów noclegowych
              </div>
            </div>
          </Link>

          {/* center: nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:text-white text-slate-300">
              Funkcje
            </a>
            <a href="#pricing" className="hover:text-white text-slate-300">
              Cennik
            </a>
            <a href="#contact" className="hover:text-white text-slate-300">
              Kontakt
            </a>
          </nav>

          {/* right: auth buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-500"
            >
              Zaloguj
            </Link>
            <Link
              to="/rejestracja"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
            >
              Załóż bezpłatne konto
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <section className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* hero text */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Bezpłatny system zarządzania dla właścicieli obiektów noclegowych
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Kalendarz rezerwacji, codzienne zadania dla personelu, harmonogram
              sprzątania i baza klientów. Podstawowe narzędzia bez opłat.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/rejestracja"
                className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold hover:bg-emerald-500"
              >
                Korzystaj za darmo
              </Link>
              <a
                href="#features"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10"
              >
                Zobacz funkcje
              </a>
            </div>

            <ul className="mt-8 space-y-2 text-sm text-slate-200">
              <li>• Kalendarz rezerwacji</li>
              <li>• Codzienne zadania i harmonogram sprzątania</li>
              <li>• Baza klientów (historia rezerwacji)</li>
              <li>• Zarządzanie wieloma obiektami</li>
            </ul>
          </div>

          {/* side card */}
          <aside className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <div className="text-sm font-semibold">AWON</div>
            <div className="mt-1 text-sm text-slate-300">
              Administracja wynajmem obiektów noclegowych
            </div>
            <div className="mt-4 text-sm text-slate-400">
              Adres: [Twoje dane]
            </div>

            <div id="quicklinks" className="mt-6 grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-semibold">Szybkie linki</div>
                <ul className="mt-2 space-y-1 text-sm text-slate-300">
                  <li>
                    <a href="#help" className="hover:text-white">
                      Pomoc
                    </a>
                  </li>
                  <li>
                    <a href="#privacy" className="hover:text-white">
                      Regulamin
                    </a>
                  </li>
                  <li>
                    <a href="#privacy" className="hover:text-white">
                      Polityka prywatności
                    </a>
                  </li>
                </ul>
              </div>
              <div id="contact">
                <div className="text-sm font-semibold">Kontakt</div>
                <div className="mt-2 text-sm text-slate-300">
                  E: kontakt@awon.example
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* FEATURES */}
        <section id="features" className="mt-16">
          <h2 className="text-xl font-semibold">Najważniejsze funkcje</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "Kalendarz rezerwacji",
                d: "Szybki podgląd obłożenia i zarządzanie pobytami.",
              },
              {
                t: "Zadania i sprzątanie",
                d: "Automatyczny harmonogram i checklisty dla personelu.",
              },
              {
                t: "Baza klientów",
                d: "Historia rezerwacji, notatki i tagi gości.",
              },
              {
                t: "Wiele obiektów",
                d: "Jedno konto — wiele lokalizacji i zespołów.",
              },
              {
                t: "Powiadomienia",
                d: "Mail/SMS (opcjonalnie) dla gości i zespołu.",
              },
              {
                t: "Uprawnienia",
                d: "Role: właściciel, manager, personel, podgląd.",
              },
            ].map((f) => (
              <div
                key={f.t}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="text-base font-semibold">{f.t}</div>
                <div className="mt-2 text-sm text-slate-300">{f.d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING (placeholder) */}
        <section id="pricing" className="mt-16">
          <h2 className="text-xl font-semibold">Cennik</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-lg font-semibold">Podstawowy</div>
              <div className="mt-2 text-sm text-slate-300">
                Najważniejsze narzędzia — bezpłatnie.
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5">
              <div className="text-lg font-semibold">Rozszerzony</div>
              <div className="mt-2 text-sm text-slate-200">
                Dodatkowe moduły i wsparcie (opcjonalnie).
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-10 border-t border-white/10 py-8">
        <div className="mx-auto max-w-7xl px-6 text-sm text-slate-400">
          © {new Date().getFullYear()} AWON — Wszelkie prawa zastrzeżone.
        </div>
      </footer>
    </div>
  );
}
