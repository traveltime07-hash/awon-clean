// src/pages/Auth.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../lib/auth";

type Tab = "login" | "register";

export default function Auth({ defaultTab = "login" }: { defaultTab?: Tab }) {
  const [tab, setTab] = useState<Tab>(defaultTab);
  const nav = useNavigate();

  // login
  const [lemail, setLEmail] = useState("");
  const [lpass, setLPass] = useState("");
  const [lshow, setLShow] = useState(false);
  const [lloading, setLLoading] = useState(false);
  const [lerror, setLError] = useState("");

  // register
  const [remail, setREmail] = useState("");
  const [rpass, setRPass] = useState("");
  const [rpass2, setRPass2] = useState("");
  const [rshow, setRShow] = useState(false);
  const [rloading, setRLoading] = useState(false);
  const [rerror, setRError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLError("");
    setLLoading(true);
    try {
      await login(lemail.trim(), lpass);
      nav("/admin");
    } catch (err: any) {
      setLError(err?.message || "Błąd logowania.");
    } finally {
      setLLoading(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setRError("");
    if (!remail.includes("@")) return setRError("Podaj prawidłowy e-mail.");
    if (rpass.length < 8) return setRError("Hasło musi mieć co najmniej 8 znaków.");
    if (rpass !== rpass2) return setRError("Hasła nie są identyczne.");
    setRLoading(true);
    try {
      await register(remail.trim(), rpass);
      alert("Konto utworzone (demo). Zaloguj się.");
      setTab("login");
      setLEmail(remail);
    } catch (err: any) {
      setRError(err?.message || "Błąd rejestracji.");
    } finally {
      setRLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-lg mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setTab("login")}
              className={`px-4 py-2 rounded-lg text-sm ${tab==="login" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
            >
              Logowanie
            </button>
            <button
              onClick={() => setTab("register")}
              className={`px-4 py-2 rounded-lg text-sm ${tab==="register" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
            >
              Rejestracja
            </button>
          </div>

          {tab === "login" ? (
            <form onSubmit={handleLogin} className="grid gap-3">
              <label className="text-sm">
                E-mail
                <input
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm"
                  type="email"
                  value={lemail}
                  onChange={(e) => setLEmail(e.target.value)}
                  required
                />
              </label>
              <label className="text-sm">
                Hasło
                <div className="mt-1 flex">
                  <input
                    className="w-full rounded-l-md border border-gray-200 shadow-sm"
                    type={lshow ? "text" : "password"}
                    value={lpass}
                    onChange={(e) => setLPass(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="rounded-r-md border border-l-0 border-gray-200 px-3 text-sm"
                    onClick={() => setLShow((v) => !v)}
                  >
                    {lshow ? "Ukryj" : "Pokaż"}
                  </button>
                </div>
              </label>
              {lerror && <div className="text-sm text-red-600">{lerror}</div>}
              <div className="flex items-center justify-between">
                <a className="text-sm text-blue-600 hover:underline" href="#" onClick={(e)=>{e.preventDefault(); alert("Reset hasła (demo).");}}>
                  Nie pamiętam hasła
                </a>
                <button disabled={lloading} className="px-5 py-2 rounded-lg bg-blue-600 text-white">
                  {lloading ? "Logowanie..." : "Zaloguj"}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="grid gap-3">
              <label className="text-sm">
                E-mail
                <input
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm"
                  type="email"
                  value={remail}
                  onChange={(e) => setREmail(e.target.value)}
                  required
                />
              </label>
              <label className="text-sm">
                Hasło
                <div className="mt-1 flex">
                  <input
                    className="w-full rounded-l-md border border-gray-200 shadow-sm"
                    type={rshow ? "text" : "password"}
                    value={rpass}
                    onChange={(e) => setRPass(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="rounded-r-md border border-l-0 border-gray-200 px-3 text-sm"
                    onClick={() => setRShow((v) => !v)}
                  >
                    {rshow ? "Ukryj" : "Pokaż"}
                  </button>
                </div>
              </label>
              <label className="text-sm">
                Powtórz hasło
                <input
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm"
                  type={rshow ? "text" : "password"}
                  value={rpass2}
                  onChange={(e) => setRPass2(e.target.value)}
                  required
                />
              </label>
              {rerror && <div className="text-sm text-red-600">{rerror}</div>}
              <div className="flex justify-end">
                <button disabled={rloading} className="px-5 py-2 rounded-lg bg-blue-600 text-white">
                  {rloading ? "Rejestruję..." : "Utwórz konto"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
