// src/pages/Obiekty.tsx
import React, { useEffect, useState } from "react";

const ROOMS_STORAGE_KEY = "awon_rooms";
const DEFAULT_ROOMS = ["Ap. 1", "Ap. 2", "Ap. 3", "Ap. 4"];

function loadRooms(): string[] {
  try {
    const raw = localStorage.getItem(ROOMS_STORAGE_KEY);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr) && arr.length) return arr.slice(0, 200).map(String);
    }
  } catch {}
  return DEFAULT_ROOMS.slice();
}
function saveRooms(next: string[]) {
  try {
    localStorage.setItem(ROOMS_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("awon:rooms-change"));
  } catch {}
}

export default function Obiekty() {
  const [rooms, setRooms] = useState<string[]>(loadRooms);
  const [newRoom, setNewRoom] = useState("");

  useEffect(() => {
    const h = () => setRooms(loadRooms());
    window.addEventListener("storage", h as any);
    window.addEventListener("awon:rooms-change", h as any);
    return () => {
      window.removeEventListener("storage", h as any);
      window.removeEventListener("awon:rooms-change", h as any);
    };
  }, []);

  function addRoom() {
    const v = newRoom.trim();
    if (!v) return;
    const next = [...rooms, v];
    saveRooms(next);
    setRooms(next);
    setNewRoom("");
  }
  function delRoom(name: string) {
    const next = rooms.filter((r) => r !== name);
    saveRooms(next);
    setRooms(next);
  }
  function renameRoom(oldName: string, nextName: string) {
    const next = rooms.map((r) => (r === oldName ? nextName : r));
    saveRooms(next);
    setRooms(next);
  }

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="text-xl font-semibold mb-4">Twoje obiekty / pokoje</h1>
      <div className="rounded-xl border bg-white p-4">
        <div className="flex gap-2">
          <input
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
            placeholder="Nazwa nowego pokoju (np. Ap. 5)"
            className="flex-1 rounded-md border px-3 py-2"
          />
          <button onClick={addRoom} className="rounded-lg bg-blue-600 px-4 py-2 text-white">Dodaj</button>
        </div>

        <div className="mt-4 space-y-2">
          {rooms.map((r) => (
            <RoomRow key={r} name={r} onDelete={() => delRoom(r)} onRename={(v) => renameRoom(r, v)} />
          ))}
          {rooms.length === 0 && <div className="text-sm text-gray-500">Brak pokoi — dodaj pierwszy.</div>}
        </div>
      </div>
    </div>
  );
}

function RoomRow({ name, onDelete, onRename }: { name: string; onDelete: () => void; onRename: (next: string) => void }) {
  const [edit, setEdit] = useState(false);
  const [val, setVal] = useState(name);
  return (
    <div className="flex items-center justify-between rounded-lg border p-2">
      {edit ? (
        <input className="rounded-md border px-2 py-1" value={val} onChange={(e) => setVal(e.target.value)} />
      ) : (
        <div className="font-medium">{name}</div>
      )}
      <div className="flex items-center gap-2">
        {edit ? (
          <>
            <button onClick={() => { onRename(val.trim() || name); setEdit(false); }} className="rounded-md border px-2 py-1 text-sm">Zapisz</button>
            <button onClick={() => { setVal(name); setEdit(false); }} className="rounded-md border px-2 py-1 text-sm">Anuluj</button>
          </>
        ) : (
          <>
            <button onClick={() => setEdit(true)} className="rounded-md border px-2 py-1 text-sm">Zmień nazwę</button>
            <button onClick={onDelete} className="rounded-md border px-2 py-1 text-sm hover:bg-red-50">Usuń</button>
          </>
        )}
      </div>
    </div>
  );
}
