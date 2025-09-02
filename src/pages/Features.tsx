import React, { useState } from "react";
import { Modal } from "../shared/ui/Modal";
import { Button } from "../shared/ui/Button";
import { PremiumModal } from "../modules/billing/PremiumModal";

export function Features() {
  const [openPremium, setOpenPremium] = useState(false);
  return (
    <div className="card">
      <h1>Funkcje</h1>
      <table className="table" style={{marginTop:12}}>
        <thead><tr><th>Bezpłatne</th><th>Płatne</th></tr></thead>
        <tbody>
          <tr>
            <td>Obiekty/Pokoje, Kalendarz (podstawa), Lista 30 dni</td>
            <td>Faktury, Wizytówka WWW, Subkonta, Integracje</td>
          </tr>
        </tbody>
      </table>
      <div style={{marginTop:16}}>
        <Button onClick={()=>setOpenPremium(true)}>Przejdź na Premium (BLIK)</Button>
      </div>
      <Modal open={openPremium} onClose={()=>setOpenPremium(false)}>
        <PremiumModal tenantSlug="apartamenty-sloneczna" email="owner@example.com" onClose={()=>setOpenPremium(false)} />
      </Modal>
    </div>
  );
}
