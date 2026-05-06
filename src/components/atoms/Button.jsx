const VARIANTS = {
  loadMore: "w-full rounded-full py-2 px-3  text-card cursor-pointer font-semibold bg-primary-700 hover:bg-green-800 hover:shadow-md",
  ghost: "block md:hidden absolute right-4 top-3 shrink-0 cursor-pointer",
  close: " absolute font-[24px] top-6 right-6 w-12 h-12 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full transition-all",
  neonBtn: "p-2 text-link-hover cursor-pointer font-[18px] border-none outline-none",
  removeFilters: "cursor-pointer border-2 rounded-md text-primary-50 border-primary-100 bg-primary-600 p-1.5",
  sliderNavRight: "absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-all opacity-0 group-hover:opacity-100",
  sliderNavLeft: "absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-all opacity-0 group-hover:opacity-100",
  residentsRate: "py-1.5 px-2.5 border-none text-center rounded-sm flex flex-row items-center cursor-pointer font-bold gap-1 bg-primary-200 hover:bg-primary-300  transition-colors duration-200 ease-in-out rounded-md p-1",
  default: "bg-red-500",
  articles: "mt-4 bg-[#4a7c59] text-white text-sm px-4 py-2 rounded-full hover:bg-[#3e6a4b] transition w-fit",
  goBuy: "bg-emerald-700 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-emerald-900/20",
  authPrimary:"bg-green-600 text-white p-2 rounded hover:bg-green-700 transition",
  authLink:"text-blue-600 underline cursor-pointer text-sm",
};
export function Button({
  label,
  icon: Icon,
  onClick,
  className,
  variant = "default",
  type = "button"
}) {
  return (
    <button
      type={type}
      className={`btn ${VARIANTS[variant] || ""} ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon />}
      {label && <span>{label}</span>}
    </button>
  );
}
