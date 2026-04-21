import { NavLink } from "react-router-dom";
import { useState } from "react";

// import { Image } from "../atoms/Image";
// import img from "../../assets/icon-original.ico";
import { toggleNavbar } from "../utils/toggleNavBar";
import { GlobalIcon } from "../atoms/icons/GlobalIcon";
import { Button } from "../atoms/Button";
const directions = [
  { href: "/", label: "Home" },
  { href: "/characters", label: "Characters" },
  { href: "/locations", label: "Locations" },
  { href: "/episodes", label: "Episodes" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <header
      className={`bg-linear-to-br from-[#571261] to-[#2b4e86] fixed top-0 w-full min-h-14 z-1000 flex items-center justify-between px-4 py-1 pl-1.5 ${
        open ? "flex-col items-start" : ""
      }`}
    >
      <div
        className={`text-primary-50 flex flex-col md:flex-row ${
          open ? "block" : "hidden md:flex"
        }`}
      >
        {directions.map(({ href, label }) => (
          <NavLink
            key={href}
            to={href}
            onClick={()=>setOpen(false)}
            className={({ isActive }) =>
              `px-3.5 py-3.5 text-[17px] whitespace-nowrap gap-5 shrink-0 hover:bg-link-hover hover:text-primary-50 ${
                isActive ? "underline underline-offset-4 font-bold" : ""
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

      <Button
        icon={GlobalIcon}
        variant="ghost"
        onClick={() => setOpen(prev => !prev)}
        //Variante ghost sin fondo y sin contorno solo svg
      />
    </header>
  );
}
