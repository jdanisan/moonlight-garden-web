export function Button({
  label,
  icon:Icon,
  onClick,
  className,
  variant = "expanded",
}) {
  // console.log(icon, label)
  return (
    <button
      type="button"
      className={`btn ${variant} ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon/>}
      {label && <span>{label}</span>}
    </button>
  );
}
