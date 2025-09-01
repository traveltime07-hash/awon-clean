import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Twarde dane admina (demo)
    const ADMIN_EMAIL = "traveltime07@gmail.com";
    const ADMIN_PASS = "12345678aA";

    // Użytkownicy z rejestracji (demo)
    let ok = false;
    const usersRaw = localStorage.getItem("AWON_USERS");
    const users = usersRaw ? (JSON.parse(usersRaw) as Array<{email:string;password:string;name?:string}>) : [];

    if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
      ok = true;
      localStorage.setItem("AWON_AUTH", JSON.stringify({ email, role: "OWNER", name: "Owner" }));
    } else if (users.some(u => u.email === email && u.password === pass)) {
      ok = true;
      const u = users.find(u => u.email === email)!;
      localStorage.setItem("AWON_AUTH", JSON.stringify({ email, role: "USER", name: u.name || "Użytkownik" }));
    }

    if (!ok) { setErr("Błędny login lub hasło."); return; }

    nav("/admin");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-xl font-semibold">Zaloguj się</h1>
        <p className="text-sm text-gray-500 mt-1">Wpisz e-mail i hasło, aby wejść do panelu.</p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <label className="text-sm">
            <div className="text-gray-700">E-mail</div>
            <input
              type="email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2"
            />
          </label>

          <label className="text-sm">
            <div className="text-gray-700">Hasło</div>
            <input
              type="password"
              value={pass}
              onChange={e=>setPass(e.target.value)}
              required
              className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2"
            />
          </label>

          {err && <div className="text-sm text-red-600">{err}</div>}

          <button type="submit" className="w-full rounded-lg bg-[#0B6EFD] text-white py-2 font-semibold">
            Zaloguj
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600">
          Nie masz konta?{" "}
          <Link to="/rejestracja" className="text-[#0B6EFD] underline">
            Zarejestruj się
          </Link>
        </div>
      </div>
    </div>
  );
}
