export function Button({ label, icon, onClick, className, variant = 'primary' }) {
  return (
    <button type="button" className={`btn ${variant} ${className}`} onClick={onClick}>
      {icon && <img src={icon} alt={label || "icon"}/>}
      {label && <span>{label}</span>}
    </button>
  );
}