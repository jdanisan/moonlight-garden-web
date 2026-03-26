import React from "react";

export function Button({ label, icon, onClick, className }) {
  return (
    <button className={className} onClick={onClick}>
      {icon && <img src={icon} alt={label || "icon"} style={{ marginRight: label ? "8px" : 0 }} />}
      {label && <span>{label}</span>}
    </button>
  );
}