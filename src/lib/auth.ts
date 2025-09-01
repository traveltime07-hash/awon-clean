// src/lib/auth.ts
export type User = { email: string };

const KEY_TOKEN = "aw_token";
const KEY_USER = "aw_user";

export function isAuthenticated(): boolean {
  return !!localStorage.getItem(KEY_TOKEN);
}

export function getUser(): User | null {
  try {
    const raw = localStorage.getItem(KEY_USER);
    return raw ? JSON.parse(raw) as User : null;
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(KEY_TOKEN);
  localStorage.removeItem(KEY_USER);
}

export async function login(email: string, password: string) {
  // 1) Próba prawdziwego backendu (jeśli kiedyś dodasz)
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      localStorage.setItem(KEY_TOKEN, data.token || "mock-token");
      localStorage.setItem(KEY_USER, JSON.stringify({ email }));
      return;
    }
  } catch (_) {
    // ignoruj – fallback niżej
  }

  // 2) Fallback lokalny (demo)
  if (email === "traveltime07@gmail.com" && password === "12345678aA") {
    localStorage.setItem(KEY_TOKEN, "mock-token");
    localStorage.setItem(KEY_USER, JSON.stringify({ email }));
    return;
  }

  throw new Error("Nieprawidłowe dane logowania.");
}

export async function register(email: string, password: string) {
  // jeśli dodasz backend:
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) return;
  } catch (_) {}

  // Fallback (demo): udajemy rejestrację OK
  return;
}
