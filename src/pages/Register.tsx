import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setOk("");

    const usersRaw = localStorage.getItem("AWON_USERS");
    const users = usersRaw ? (JSON.parse(usersRaw) as Array<{email:string;password:string;name?:string}>) : [];

    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      setErr("Użytkownik z tym adresem e-mail już istnieje.");
      return;
    }

    users.push({ email, password: pass, name });
    localStorage.setItem("AWON_USERS", JSON.stringify(users));
    setOk("Konto utworzone. Możesz się zalogować.");
    setTimeout(()=> nav("/login"), 800);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-xl font-semibold">Rejestracja</h1>
        <p className="text-sm text-gray-500 mt-1">Załóż konto demo (lokalnie).</p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <label className="text-sm">
            <div className="text-gray-700">Imię i nazwisko</div>
            <input
              value={name}
              onChange={e=>setName(e.target.value)}
              required
              className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2"
            />
          </label>

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
          {ok && <div className="text-sm text-green-600">{ok}</div>}

          <button type="submit" className="w-full rounded-lg bg-[#0B6EFD] text-white py-2 font-semibold">
            Utwórz konto
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600">
          Masz już konto?{" "}
          <Link to="/login" className="text-[#0B6EFD] underline">
            Zaloguj się
          </Link>
        </div>
      </div>
    </div>
  );
}
