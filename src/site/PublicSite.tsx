import React from "react";
import { Link, useParams } from "react-router-dom";

export function PublicSite() {
  const { tenantSlug } = useParams();
  return (
    <div className="container">
      <div className="card">
        <h1>{tenantSlug} — wizytówka</h1>
        <p>Hero (zdjęcie główne), opis, kalendarz dostępności (podgląd), galeria.</p>
        <div style={{display:"flex", gap:10, marginTop:10}}>
          <Link to={`/site/${tenantSlug}/rooms`}>Pokoje</Link>
          <Link to={`/site/${tenantSlug}/contact`}>Kontakt / wycena</Link>
        </div>
      </div>
    </div>
  );
}
