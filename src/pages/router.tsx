import React from "react";
import { HashRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { Login } from "./Login";
import { Home } from "./Home";
import { Objects } from "./Objects";
import { CalendarPage } from "./CalendarPage";
import { Tasks } from "./Tasks";
import { Staff } from "./Staff";
import { Features } from "./Features";
import { AdminPayments } from "./admin/AdminPayments";
import { PublicSite } from "../site/PublicSite";
import { SiteRooms } from "../site/SiteRooms";
import { SiteRoom } from "../site/SiteRoom";
import { SiteContact } from "../site/SiteContact";

function Nav() {
  return (
    <nav className="container" style={{display:"flex", gap:10, alignItems:"center"}}>
      <Link to="/">AWON</Link>
      <span style={{opacity:.4}}>|</span>
      <Link to="/objects">Obiekty</Link>
      <Link to="/calendar">Kalendarz</Link>
      <Link to="/tasks">Lista 30 dni</Link>
      <Link to="/staff">Pracownicy</Link>
      <Link to="/features">Funkcje</Link>
      <span style={{marginLeft:"auto"}}><Link to="/login">Wyloguj</Link></span>
    </nav>
  );
}

function Shell({ children }: {children: React.ReactNode}) {
  return (<div>
    <Nav />
    <div className="container">{children}</div>
  </div>);
}

export function Router() {
  return (
    <HashRouter>
      <Routes>
        {/* Publiczne wizytówki */}
        <Route path="/site/:tenantSlug" element={<PublicSite />} />
        <Route path="/site/:tenantSlug/rooms" element={<SiteRooms />} />
        <Route path="/site/:tenantSlug/rooms/:roomSlug" element={<SiteRoom />} />
        <Route path="/site/:tenantSlug/contact" element={<SiteContact />} />

        {/* Logowanie */}
        <Route path="/login" element={<Login />} />

        {/* Prywatne (na razie bez guardów) */}
        <Route path="/" element={<Shell><Home /></Shell>} />
        <Route path="/objects" element={<Shell><Objects /></Shell>} />
        <Route path="/calendar" element={<Shell><CalendarPage /></Shell>} />
        <Route path="/tasks" element={<Shell><Tasks /></Shell>} />
        <Route path="/staff" element={<Shell><Staff /></Shell>} />
        <Route path="/features" element={<Shell><Features /></Shell>} />

        {/* Admin */}
        <Route path="/admin/payments" element={<Shell><AdminPayments /></Shell>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
