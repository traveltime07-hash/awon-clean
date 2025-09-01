// src/pages/NotFound.tsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <div className="bg-white shadow rounded-2xl p-8 text-center">
        <div className="text-2xl font-semibold">404: Strona nie istnieje</div>
        <p className="mt-2 text-gray-600">Sprawdź adres lub wróć na stronę główną.</p>
        <div className="mt-6">
          <Link to="/" className="px-5 py-2 rounded-lg bg-blue-600 text-white">Strona główna</Link>
        </div>
      </div>
    </div>
  );
}
