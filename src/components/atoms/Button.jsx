import React from "react";

export function Button({ label, icon, onClick, className, variant = 'primary' }) {
  return (
    <button className={`btn ${variant} ${className}`} onClick={onClick}>
      {icon && <img src={icon} alt={label || "icon"} style={{ marginRight: label ? "8px" : 0 }} />}
      {label && <span>{label}</span>}
    </button>
  );
}