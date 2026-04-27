import { NavLink } from "react-router-dom";
import { useState } from "react";
import { toggleNavbar } from "../utils/toggleNavBar";
import { Button } from "../atoms/Button";
import { MoonlightIcon } from "../atoms/icons/MoonlightIcon";

const directions = [
  { href: "/", label: "Home" },
  { href: "/documentation", label: "Documentation" },
  { href: "/search", label: "Search" },
  { href: "/statistics", label: "Statistics" },
  { href: "/calendar", label: "Calendar" },
  { href: "/forum", label: "Forum" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#f6f1e7] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO */}
        <div className="text-green-900 font-bold text-xl ">
          {/* //TODO:Que el logo se coulte cuando se vista móvil */}
          <MoonlightIcon className="text-primary-900 md:hidden" />
        </div>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-6">
          {directions.map(({ href, label }) => (
            <NavLink
              key={href}
              to={href}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm transition ${
                  isActive
                    ? "bg-green-900 text-white"
                    : "text-green-900 hover:bg-green-100"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* ICON / BUTTON */}
        <div className="flex items-center gap-3">
          <Button
            icon={MoonlightIcon}
            variant="ghost"
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-2 bg-[#f6f1e7]">
          {directions.map(({ href, label }) => (
            <NavLink
              key={href}
              to={href}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl ${
                  isActive
                    ? "bg-green-900 text-white"
                    : "text-green-900 hover:bg-green-100"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
