import React, { useMemo, useState } from "react";

const PHONE = "+48 600 000 000"; // TODO: ustaw w .env i podaj tutaj z importu
const PERIODS = [
  { months: 1, amount: 49 },
  { months: 3, amount: 129 },
  { months: 6, amount: 239 },
  { months: 12, amount: 449 },
];

export function PremiumModal({ tenantSlug, email, onClose }:
  { tenantSlug: string; email: string; onClose: () => void; }) {
  const [sel, setSel] = useState(PERIODS[0]);
  const [clicked, setClicked] = useState(false);
  const title = useMemo(() => `AWON ${tenantSlug} ${email}`.slice(0, 60), [tenantSlug, email]);

  async function handleConfirm() {
    setClicked(true);
    // TODO: mock API → nadaj 3 dni premium (tymczasowe)
    alert("Przyznaliśmy Ci Premium na 3 dni (tymczasowo). Admin zweryfikuje wpłatę.");
    onClose();
  }

  return (
    <div>
      <h2 style={{marginBottom:12}}>Przejdź na Premium</h2>
      <label>Okres:
        <select value={sel.months} onChange={e=>setSel(PERIODS.find(p=>p.months===Number(e.target.value))!)}>
          {PERIODS.map(p => <option key={p.months} value={p.months}>{p.months} mies. — {p.amount} PLN</option>)}
        </select>
      </label>
      <div className="card" style={{marginTop:12}}>
        <p>1) W aplikacji banku wybierz <b>BLIK → przelew na telefon</b>.</p>
        <p>2) Numer telefonu odbiorcy: <b>{PHONE}</b></p>
        <p>3) Kwota: <b>{sel.amount} PLN</b></p>
        <p>4) Tytuł przelewu: <code>{title}</code></p>
      </div>
      <div style={{display:"flex", gap:8, marginTop:12}}>
        <button className="btn btn-green" onClick={handleConfirm} disabled={clicked}>
          Tak, wykonałem przelew — przyznaj 3 dni Premium
        </button>
        <button className="btn btn-ghost" onClick={onClose}>Anuluj</button>
      </div>
    </div>
  );
}
