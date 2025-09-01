import React, { useState, useEffect, useCallback } from "react";

// Prosty stan strony pobierany z localStorage (edycja w panelu admin)
type Feature = { id: string; name: string; desc?: string; paid?: boolean };
type SiteState = {
  heroTitle: string;
  heroText: string;
  features: Feature[];
};
const LS_KEY = "awon_site_state_v1";

function loadState(): SiteState {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    heroTitle: "Bezpłatny system zarządzania dla właścicieli obiektów noclegowych",
    heroText:
      "AWON — system do zarządzania rezerwacjami, zadaniami i personelem. Korzystanie z podstawowych narzędzi jest całkowicie bezpłatne; dodatkowe płatne funkcje są bardziej zaawansowane i możesz je włączyć w koncie Premium.",
    features: [
      { id: "cal", name: "Kalendarz rezerwacji", paid: false },
      { id: "tasks", name: "Codzienne zadania i harmonogram sprzątania", paid: false },
      { id: "crm", name: "Baza klientów (historia rezerwacji)", paid: false },
      { id: "multi", name: "Zarządzanie wieloma obiektami", paid: false },
      { id: "sync", name: "Synchronizacja (Booking, Airbnb)", paid: true },
      { id: "api", name: "API / Webhooks", paid: true }
    ]
  };
}

export default function AwonLanding() {
  const year = new Date().getFullYear();
  const [state, setState] = useState<SiteState>(loadState);

  useEffect(() => {
    const h = () => setState(loadState());
    window.addEventListener("storage", h as any);
    return () => window.removeEventListener("storage", h as any);
  }, []);

  function CheckIcon() {
    return (
      <svg className="inline-block h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  function CrossIcon() {
    return (
      <svg className="inline-block h-6 w-6 text-red-600" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  const smoothScroll = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const onNavigateRegister = useCallback((e?: any) => {
    e?.preventDefault?.();
    window.location.href = "/rejestracja";
  }, []);
  const onNavigateLogin = useCallback((e?: any) => {
    e?.preventDefault?.();
    window.location.href = "/app/login";
  }, []);

  function Gallery() {
    const [images, setImages] = useState<string[]>([]);
    const [idx, setIdx] = useState(0);
    useEffect(() => {
      const arr =
        (Array.isArray((window as any).AWON_GALLERY_IMAGES) && (window as any).AWON_GALLERY_IMAGES) ||
        JSON.parse(localStorage.getItem("AWON_GALLERY_IMAGES") || "[]");
      setImages(arr || []);
    }, []);
    useEffect(() => {
      if (!images.length) return;
      const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 4000);
      return () => clearInterval(t);
    }, [images]);
    if (!images.length) {
      return (
        <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
          <div className="text-gray-400">Brak zrzutów — dodaj je w panelu administratora</div>
        </div>
      );
    }
    return (
      <div className="w-full">
        <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
          <img src={images[idx]} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover" />
        </div>
        {images.length > 1 && (
          <div className="mt-3 flex items-center justify-center gap-3">
            <button onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)} className="px-3 py-1 rounded bg-white border">◀</button>
            <div className="flex gap-2 items-center">
              {images.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} className={`w-3 h-3 rounded-full ${i === idx ? "bg-[#0B6EFD]" : "bg-gray-300"}`} />
              ))}
            </div>
            <button onClick={() => setIdx((i) => (i + 1) % images.length)} className="px-3 py-1 rounded bg-white border">▶</button>
          </div>
        )}
      </div>
    );
  }

  useEffect(() => {
    document.title = "AWON — system do zarządzania rezerwacjami, zadaniami i personelem";
    const content =
      "AWON — system do zarządzania rezerwacjami, zadaniami i personelem. Korzystanie z podstawowych narzędzi jest całkowicie bezpłatne; dodatkowe płatne funkcje są bardziej zaawansowane i możesz je włączyć w koncie Premium.";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800">
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#0B6EFD] text-white font-bold rounded-lg flex items-center justify-center">AW</div>
          <div>
            <h1 className="text-lg font-semibold">AWON</h1>
            <div className="text-sm text-gray-500">Administracja wynajmem obiektów noclegowych</div>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          <button className="text-sm hover:underline" onClick={() => smoothScroll("features")}>Funkcje</button>
          <button className="text-sm hover:underline" onClick={() => smoothScroll("cennik")}>Cennik</button>
          <button className="text-sm hover:underline" onClick={() => smoothScroll("kontakt")}>Kontakt</button>
          <button onClick={onNavigateLogin} className="inline-block px-4 py-2 rounded-lg bg-[#0B6EFD] text-white text-sm font-medium">Zaloguj</button>
          <button onClick={onNavigateRegister} className="ml-4 inline-block px-4 py-2 rounded-lg bg-[#0B6EFD] text-white text-sm font-medium">Załóż bezpłatne konto</button>
        </nav>
      </header>

      <main>
        <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">{state.heroTitle}</h2>
            <p className="mt-4 text-lg text-gray-600">{state.heroText}</p>
            <div className="mt-6 flex gap-3">
              <button onClick={onNavigateRegister} className="px-6 py-3 rounded-lg bg-[#0B6EFD] text-white font-semibold">Korzystaj za darmo</button>
              <button onClick={() => smoothScroll("features")} className="px-6 py-3 rounded-lg border border-gray-200 text-sm">Zobacz funkcje</button>
            </div>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
              <li>• Kalendarz rezerwacji</li>
              <li>• Codzienne zadania i harmonogram sprzątania</li>
              <li>• Baza klientów</li>
              <li>• Zarządzanie wieloma obiektami</li>
            </ul>
          </div>
          <div className="order-first md:order-last flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-4">
              <div className="text-sm text-gray-500 mb-3">Podgląd systemu</div>
              <Gallery />
            </div>
          </div>
        </section>

        <section id="features" className="max-w-7xl mx-auto px-6 py-12">
          <h3 className="text-2xl font-semibold">Funkcje</h3>
          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm overflow-auto">
            <table className="min-w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 font-medium">Funkcja</th>
                  <th className="px-4 py-3 font-medium text-center">Podstawowy</th>
                  <th className="px-4 py-3 font-medium text-center">Rozszerzony</th>
                </tr>
              </thead>
              <tbody>
                {state.features.map((f) => (
                  <tr className="border-t" key={f.id}>
                    <td className="px-4 py-3">{f.name}</td>
                    <td className="px-4 py-3 text-center">{f.paid ? <CrossIcon/> : <CheckIcon/>}</td>
                    <td className="px-4 py-3 text-center">{f.paid ? <CheckIcon/> : <CrossIcon/>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-xs text-gray-500">
              Legenda: zielone ✓ w planie darmowym, czerwone ✕ — dostępne tylko w rozszerzonym.
            </p>
          </div>
        </section>

        <section id="cennik" className="max-w-7xl mx-auto px-6 py-12">
          <h3 className="text-2xl font-semibold">Cennik — co zyskujesz wybierając Premium</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold">Plan Darmowy</h4>
              <p className="mt-2 text-sm text-gray-600">0 zł / miesiąc — podstawowe narzędzia do prowadzenia obiektu.</p>
              <ul className="mt-4 list-disc list-inside text-sm text-gray-700">
                <li>Kalendarz rezerwacji</li>
                <li>Codzienne zadania i harmonogram sprzątania</li>
                <li>Baza klientów</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold">Plan Premium</h4>
              <p className="mt-2 text-sm text-gray-600">Więcej automatyzacji i integracji — idealne przy większej liczbie obiektów.</p>
              <div className="mt-4 text-lg font-bold">Cena: (do ustalenia)</div>
              <ul className="mt-4 list-disc list-inside text-sm text-gray-700">
                <li>Automatyczne przypisywanie zadań</li>
                <li>Synchronizacja z Booking i Airbnb</li>
                <li>API / Webhooks dla integracji</li>
                <li>Zaawansowane raporty i eksport do Excela</li>
                <li>Brak limitów użytkowników i obiektów</li>
                <li>Priorytetowe wsparcie</li>
                <li>Dłuższe przechowywanie kopii zapasowych</li>
              </ul>
              <div className="mt-6">
                <button onClick={onNavigateRegister} className="inline-block px-5 py-3 rounded-lg bg-[#0B6EFD] text-white font-semibold">
                  Wypróbuj Premium — 30 dni za darmo
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="kontakt" className="max-w-7xl mx-auto px-6 py-12">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold">Kontakt</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Dziękujemy — wiadomość wysłana (mock).");
              }}
              className="mt-4 grid grid-cols-1 gap-4"
            >
              <label className="block">
                <div className="text-sm text-gray-700">Imię i nazwisko</div>
                <input className="mt-1 w-full rounded-md border-gray-200 shadow-sm" type="text" required />
              </label>
              <label className="block">
                <div className="text-sm text-gray-700">E-mail</div>
                <input className="mt-1 w-full rounded-md border-gray-200 shadow-sm" type="email" required />
              </label>
              <label className="block">
                <div className="text-sm text-gray-700">Wiadomość</div>
                <textarea className="mt-1 w-full rounded-md border-gray-200 shadow-sm" rows={5} required />
              </label>
              <div>
                <button type="submit" className="px-5 py-3 rounded-lg bg-[#0B6EFD] text-white font-semibold">Wyślij wiadomość</button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-8 text-sm text-gray-500">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="font-semibold">AWON</div>
            <div>Administracja wynajmem obiektów noclegowych</div>
            <div className="mt-2">Adres: <span className="text-gray-700">[Twoje dane]</span></div>
          </div>
          <div className="flex gap-6">
            <div>
              <div className="font-medium">Szybkie linki</div>
              <ul className="mt-2">
                <li><a className="hover:underline" href="/pomoc">Pomoc</a></li>
                <li><a className="hover:underline" href="/regulamin">Regulamin</a></li>
                <li><a className="hover:underline" href="/polityka-prywatnosci">Polityka prywatności</a></li>
              </ul>
            </div>
            <div>
              <div className="font-medium">Kontakt</div>
              <div className="mt-2">E: <a className="hover:underline">kontakt@awon.example</a></div>
            </div>
          </div>
        </div>
        <div className="mt-6 text-xs text-gray-400">© {year} AWON — Wszelkie prawa zastrzeżone.</div>
      </footer>
    </div>
  );
}
