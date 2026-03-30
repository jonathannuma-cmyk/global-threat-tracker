import { NavLink } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="app-nav">
      <NavLink to="/" end className={({ isActive }) => `app-nav-link ${isActive ? "active" : ""}`}>
        ☢ Nuclear Arsenal Tracker
      </NavLink>
      <NavLink to="/middle-east" className={({ isActive }) => `app-nav-link ${isActive ? "active" : ""}`}>
        ◈ Middle East Ballistic Missiles
      </NavLink>
    </nav>
  );
}
