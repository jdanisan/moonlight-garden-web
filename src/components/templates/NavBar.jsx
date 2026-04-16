import { NavLink } from "react-router-dom";

// import { Image } from "../atoms/Image";
// import img from "../../assets/icon-original.ico";
import {toggleNavbar} from "../utils/toggleNavBar"
import {GlobalIcon} from "../atoms/icons/GlobalIcon"
import { Button } from "../atoms/Button";

export function NavBar() {
  return (
    <header>
      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>

        <NavLink
          to="/characters"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Characters
        </NavLink>

        <NavLink
          to="/locations"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Locations
        </NavLink>

        <NavLink
          to="/episodes"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Episodes
        </NavLink>
      </div>

      <Button icon={GlobalIcon} className={"icon-rick"} onClick={toggleNavbar}/>
    </header>
  );
}
