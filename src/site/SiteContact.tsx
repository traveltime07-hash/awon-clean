import React from "react";
import { Input } from "../shared/ui/Input";
import { Button } from "../shared/ui/Button";

export function SiteContact() {
  return (
    <div className="container">
      <div className="card" style={{maxWidth:560}}>
        <h1>Zapytanie o wycenę</h1>
        <label style={{display:"block", marginTop:10}}>Imię i nazwisko <Input placeholder="Jan Kowalski" /></label>
        <label style={{display:"block", marginTop:10}}>E-mail <Input type="email" placeholder="jan@domena.pl" /></label>
        <label style={{display:"block", marginTop:10}}>Telefon <Input placeholder="+48 ..." /></label>
        <div style={{display:"flex", gap:8, marginTop:10}}>
          <Input type="date" /> <Input type="date" />
        </div>
        <label style={{display:"block", marginTop:10}}>Wiadomość
          <textarea placeholder="Proszę o ofertę..." rows={4}></textarea>
        </label>
        <div style={{marginTop:12}}>
          <Button>Wyślij</Button>
        </div>
      </div>
    </div>
  );
}
