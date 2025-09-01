import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AwonLanding from "./pages/AwonLanding"; // <- jeśli u Ciebie plik ma inną nazwę/ścieżkę, podmień import
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminOwnerPanel from "./pages/AdminOwnerPanel";

function Protected({ children }: { children: React.ReactElement }) {
  const authRaw = localStorage.getItem("AWON_AUTH");
  const isAuthed = !!authRaw;
  const loc = useLocation();
  if (!isAuthed) return <Navigate to="/login" replace state={{ from: loc.pathname }} />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AwonLanding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/rejestracja" element={<Register />} />
      <Route
        path="/admin"
        element={
          <Protected>
            <AdminOwnerPanel />
          </Protected>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
