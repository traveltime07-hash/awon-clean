import React from "react";
export function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div style={{position:"fixed", inset:0, background:"rgba(2,6,23,0.7)", display:"grid", placeItems:"center", zIndex:50}}
         onClick={onClose}>
      <div className="card" style={{maxWidth:600, width:"98%"}} onClick={e=>e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
