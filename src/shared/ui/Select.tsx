import React from "react";
export function Select({ children, ...p }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...p}>{children}</select>;
}
