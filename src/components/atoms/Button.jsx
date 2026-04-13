export function Button({
  label,
  icon:Icon,
  onClick,
  className,
  variant = "primary",
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
