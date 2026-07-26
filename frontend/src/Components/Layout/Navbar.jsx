import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../SignUp/AuthContext";
import { useFlash } from "../../Context/FlashContext";
import './Navbar.css'

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { setFlash } = useFlash();
  const [query, setQuery] = useState("");

  const handleLogout = () => {
    logout();
    setFlash({ type: "success", message: "Logged out successfully" });
  };

  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  const handleThemeToggle = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.body.classList.toggle("dark-theme", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  return (
    <nav className="navbar-row">
      <div className="navbar-container  ">
             
        <Link className="nav-logo campus-brand" to="/">
          <span className="text-danger brand-bmsit fs-4">BMSIT</span>{" "}
          <span className="text-primary brand-campus fs-4">Campus</span>
        </Link>

        <div className="nav-actions">
          {user ? (
            <button
              className="nav-btn-outline"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="nav-btn-outline">
              Login
            </Link>
          )}

          <button
            className="nav-btn-outline theme-toggle-navbar"
            onClick={handleThemeToggle}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <i className={`fa-solid ${isDark ? "fa-sun" : "fa-moon"}`}></i>
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
