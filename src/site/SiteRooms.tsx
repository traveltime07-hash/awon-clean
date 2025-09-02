import React from "react";
import { Link, useParams } from "react-router-dom";
export function SiteRooms() {
  const { tenantSlug } = useParams();
  const rooms = [{slug:"1", name:"Pokój 1"}, {slug:"2", name:"Pokój 2"}];
  return (
    <div className="container">
      <div className="card">
        <h1>Pokoje</h1>
        <ul>
          {rooms.map(r => <li key={r.slug}><Link to={`/site/${tenantSlug}/rooms/${r.slug}`}>{r.name}</Link></li>)}
        </ul>
      </div>
    </div>
  );
}
