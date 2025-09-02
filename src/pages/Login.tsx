import React from "react";
import { Input } from "../shared/ui/Input";
import { Button } from "../shared/ui/Button";

export function Login() {
  return (
    <div className="container">
      <div className="card" style={{maxWidth:420, margin:"40px auto"}}>
        <h1>Logowanie</h1>
        <label style={{display:"block", marginTop:12}}>E-mail
          <Input type="email" placeholder="email@domena.pl" />
        </label>
        <label style={{display:"block", marginTop:12}}>Hasło
          <Input type="password" placeholder="••••••••" />
        </label>
        <div style={{display:"flex", gap:8, marginTop:16}}>
          <Button>Wejdź</Button>
          <Button variant="ghost">Rejestracja</Button>
        </div>
      </div>

      {/* Publiczna część strony głównej: demo + lista funkcji */}
      <div className="card" style={{marginTop:24}}>
        <h2>Podgląd demo</h2>
        <p>Tu będzie mini-podgląd modułów ustawiany przez Administratora serwisu.</p>
      </div>

      <div className="card" style={{marginTop:16}}>
        <h2>Funkcje systemu</h2>
        <table className="table">
          <thead><tr><th>Bezpłatne</th><th>Płatne</th></tr></thead>
          <tbody>
            <tr>
              <td>Logowanie, Obiekty/Pokoje, Kalendarz (podstawowy), Lista 30 dni</td>
              <td><span className="badge badge-paid">Faktury</span>, Wizytówka WWW, Subkonta, Integracje</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
