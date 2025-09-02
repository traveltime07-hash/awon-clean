import React from "react";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary"|"ghost"|"green" };
export function Button({ variant="primary", ...p }: Props) {
  const cl = ["btn"];
  if (variant==="ghost") cl.push("btn-ghost");
  if (variant==="green") cl.push("btn-green");
  return <button {...p} className={cl.join(" ")} />;
}
