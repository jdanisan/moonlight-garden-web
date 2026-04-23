const VARIANTS = {
  // //TODO: Repare this with the actual info
loadMore: "w-full rounded-lg py-2 px-3  text-card cursor-pointer font-semibold bg-primary-700 hover:bg-blue-500 hover:shadow-md",
ghost: "block md:hidden absolute right-4 top-3 shrink-0 cursor-pointer",
neonBtn:"p-2 text-link-hover cursor-pointer font-[18px] border-none outline-none",
removeFilters:"cursor-pointer border-2 rounded-md text-primary-50 border-primary-100 bg-primary-600 p-1.5",
residentsRate:"py-1.5 px-2.5 border-none text-center rounded-sm flex flex-row items-center cursor-pointer font-bold gap-1 bg-primary-200 hover:bg-primary-300  transition-colors duration-200 ease-in-out rounded-md p-1",
default:"bg-red-500"
};
export function Button({
  label,
  icon:Icon,
  onClick,
  className,
  variant = "default",
}) {
  return (
    <button
      type="button"
      className={`btn ${VARIANTS[variant] || ""} ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon/>}
      {label && <span>{label}</span>}
    </button>
  );
}
