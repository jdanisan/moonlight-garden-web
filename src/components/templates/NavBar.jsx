import { NavLink } from "react-router-dom";

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
        <a href="/Ejercicio JS.pdf" target="_blank">
          Documentation
        </a>
        <a href="/statement.md" target="_blank">
          Statement
        </a>

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

      <img
        className="icon"
        id="icon-nav-bar"
        src="/img/icon-original.ico"
        alt="logo"
      />
    </header>
  );
}
