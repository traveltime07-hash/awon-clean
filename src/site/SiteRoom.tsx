import React from "react";
import { useParams } from "react-router-dom";
export function SiteRoom() {
  const { roomSlug } = useParams();
  return (
    <div className="container">
      <div className="card">
        <h1>Pokój {roomSlug}</h1>
        <p>Opis, galeria, dostępność (read-only).</p>
      </div>
    </div>
  );
}
