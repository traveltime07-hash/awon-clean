import React, { useEffect, useState } from "react";

type Feature = { id: string; name: string; desc?: string; paid?: boolean };
type SiteState = { heroTitle: string; heroText: string; features: Feature[] };

const LS_KEY = "awon_site_state_v1";

function load(): SiteState {
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

function save(s: SiteState) {
  localStorage.setItem(LS_KEY, JSON.stringify(s));
  window.dispatchEvent(new Event("storage"));
}

export default function Admin() {
  const [ok, setOk] = useState<boolean | null>(null);
  const [state, setState] = useState<SiteState>(load);
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("AWON_GALLERY_IMAGES") || "[]"); } catch { return []; }
  });

  useEffect(() => {
    (async () => {
      const r = await fetch("/api/auth/whoami");
      setOk(r.ok);
      if (!r.ok) window.location.replace("/app/login");
    })();
  }, []);

  function onAddFeature() {
    const id = "f-" + Math.random().toString(36).slice(2, 8);
    setState((s) => ({ ...s, features: [...s.features, { id, name: "Nowa funkcja", paid: false }] }));
  }
  function onDelFeature(id: string) {
    setState((s) => ({ ...s, features: s.features.filter((x) => x.id !== id) }));
  }
  async function onSave() {
    setSaving(true);
    try {
      save(state);
      alert("Zapisano treści strony głównej.");
    } finally {
      setSaving(false);
    }
  }
  function onUploadFiles(files: FileList | null) {
    if (!files || !files.length) return;
    const read = (f: File) =>
      new Promise<string>((res, rej) => {
        const fr = new FileReader();
        fr.onload = () => res(String(fr.result));
        fr.onerror = rej;
        fr.readAsDataURL(f);
      });
    Promise.all(Array.from(files).map(read)).then((urls) => {
      const next = [...images, ...urls];
      setImages(next);
      localStorage.setItem("AWON_GALLERY_IMAGES", JSON.stringify(next));
      (window as any).AWON_GALLERY_IMAGES = next;
      alert("Dodano obrazy do galerii.");
    });
  }
  function clearGallery() {
    setImages([]);
    localStorage.setItem("AWON_GALLERY_IMAGES", "[]");
    (window as any).AWON_GALLERY_IMAGES = [];
  }
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.replace("/app/login");
  }

  if (ok === null) return <div className="p-4">Sprawdzanie sesji…</div>;
  if (!ok) return null;

  return (
    <div className="mx-auto max-w-4xl p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Panel administratora</h1>
        <button onClick={logout} className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">Wyloguj</button>
      </div>

      <section className="rounded-xl border bg-white p-4">
        <h2 className="font-medium mb-3">Treści strony głównej</h2>
        <label className="block">
          <div className="text-sm text-gray-700">Nagłówek (hero)</div>
          <input className="mt-1 w-full rounded-md border px-3 py-2"
            value={state.heroTitle} onChange={(e) => setState({ ...state, heroTitle: e.target.value })}/>
        </label>
        <label className="block mt-3">
          <div className="text-sm text-gray-700">Opis pod nagłówkiem</div>
          <textarea className="mt-1 w-full rounded-md border px-3 py-2" rows={3}
            value={state.heroText} onChange={(e) => setState({ ...state, heroText: e.target.value })}/>
        </label>
        <div className="mt-4">
          <div className="mb-2 text-sm text-gray-700">Funkcje (✓ darmowe / ✕ tylko Premium)</div>
          <div className="space-y-2">
            {state.features.map((f) => (
              <div key={f.id} className="flex items-center gap-2 rounded-lg border p-2">
                <input className="flex-1 rounded-md border px-2 py-1" value={f.name}
                  onChange={(e) => setState((s) => ({ ...s, features: s.features.map((x) => (x.id === f.id ? { ...x, name: e.target.value } : x)) }))}/>
                <label className="text-sm flex items-center gap-1">
                  <input type="checkbox" checked={!!f.paid}
                    onChange={(e) => setState((s) => ({ ...s, features: s.features.map((x) => (x.id === f.id ? { ...x, paid: e.target.checked } : x)) }))}/>
                  Płatna
                </label>
                <button onClick={() => onDelFeature(f.id)} className="text-sm rounded-md border px-2 hover:bg-red-50">Usuń</button>
              </div>
            ))}
            <button onClick={onAddFeature} className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white">Dodaj funkcję</button>
          </div>
        </div>
        <div className="mt-4">
          <button disabled={saving} onClick={onSave} className="rounded-lg bg-blue-600 px-4 py-2 text-white">{saving ? "Zapisywanie..." : "Zapisz zmiany"}</button>
        </div>
      </section>

      <section className="rounded-xl border bg-white p-4">
        <h2 className="font-medium mb-3">Galeria na landing (podgląd w Home)</h2>
        <input type="file" accept="image/*" multiple onChange={(e) => onUploadFiles(e.target.files)} />
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((src, i) => (
            <img key={i} src={src} className="w-full h-24 object-cover rounded-md border" />
          ))}
        </div>
        <div className="mt-3">
          <button onClick={clearGallery} className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">Wyczyść galerię</button>
        </div>
      </section>
    </div>
  );
}
