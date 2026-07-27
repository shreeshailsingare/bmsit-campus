import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../SignUp/AuthContext";
import { useFlash } from "../../Context/FlashContext";
import './Navbar.css'

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { setFlash } = useFlash();
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchOverlayRef = useRef(null);

  const handleLogout = () => {
    logout();
    setFlash({ type: "success", message: "Logged out successfully" });
    setMobileMenuOpen(false);
  };

  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  const handleThemeToggle = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.body.classList.toggle("dark-theme", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/filter?search=${encodeURIComponent(query.trim())}`);
      setQuery("");
      closeSearch();
    }
  };

  const openSearch = useCallback(() => {
    setSearchOpen(true);
    // Focus after animation completes
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setQuery("");
  }, []);

  const isActive = (path) => location.pathname === path;

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu and search on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // ESC key closes search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && searchOpen) {
        closeSearch();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen, closeSearch]);

  // Prevent body scroll when search is open on mobile
  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  const navLinks = [
    { path: "/", label: "Home", icon: "fa-house" },
    { path: "/filter", label: "Browse", icon: "fa-filter" },
    { path: "/placementnews", label: "Placement", icon: "fa-briefcase" },
    { path: "/display", label: "Highlights", icon: "fa-display" },
  ];

  return (
    <nav className="navbar-row">
      <div className="navbar-container">
        {/* Left: Hamburger + Logo */}
        <div className="nav-left">
          <button
            className={`hamburger-btn ${mobileMenuOpen ? "open" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <Link className="nav-logo" to="/">
            <span className="logo-bmsit">BMSIT</span>
            <span className="logo-campus">Campus</span>
          </Link>
        </div>

        {/* Center: Desktop Nav Links */}
        <div className="nav-center-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-center-link ${isActive(link.path) ? "active" : ""}`}
            >
              <i className={`fa-solid ${link.icon}`}></i>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Right: Search + Theme + Auth */}
        <div className="nav-right">
          {/* Search Toggle (mobile) */}
          <button
            className="nav-icon-btn search-toggle-btn"
            onClick={openSearch}
            aria-label="Open search"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>

          {/* Theme Toggle */}
          <button
            className="nav-icon-btn theme-btn"
            onClick={handleThemeToggle}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle theme"
          >
            <i className={`fa-solid ${isDark ? "fa-sun" : "fa-moon"}`}></i>
          </button>

          {/* Auth */}
          {user ? (
            <div className="nav-user-menu">
              <Link to="/profile" className="nav-user-avatar" title={user.name}>
                <img
                  src={user.profile_image?.url || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                  alt="profile"
                />
              </Link>
            </div>
          ) : (
            <Link to="/login" className="nav-btn-login" aria-label="Login">
              <i className="fa-solid fa-right-to-bracket"></i>
            </Link>
          )}
        </div>
      </div>

      {/* ============================================
          MOBILE SEARCH OVERLAY
          ============================================ */}
      <div
        ref={searchOverlayRef}
        className={`mobile-search-overlay ${searchOpen ? "open" : ""}`}
        onClick={(e) => {
          if (e.target === searchOverlayRef.current) {
            closeSearch();
          }
        }}
      >
        <div className="mobile-search-container">
          <button
            className="mobile-search-back"
            onClick={closeSearch}
            aria-label="Close search"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          <form onSubmit={handleSearch} className="mobile-search-form">
            <i className="fa-solid fa-magnifying-glass mobile-search-icon"></i>
            <input
              ref={searchInputRef}
              type="text"
              className="mobile-search-input"
              placeholder="Search posts, clubs, events..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                className="mobile-search-clear"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer-overlay ${mobileMenuOpen ? "open" : ""}`} onClick={() => setMobileMenuOpen(false)} />
      <div ref={menuRef} className={`mobile-drawer ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-drawer-header">
          <span className="mobile-drawer-title">Menu</span>
          <button className="mobile-drawer-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* User info */}
        {user && (
          <div className="mobile-drawer-user">
            <img
              src={user.profile_image?.url || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
              alt="profile"
              className="mobile-drawer-avatar"
            />
            <div>
              <div className="mobile-drawer-name">{user.name}</div>
              <div className="mobile-drawer-username">@{user.username}</div>
            </div>
          </div>
        )}

        <div className="mobile-drawer-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-drawer-link ${isActive(link.path) ? "active" : ""}`}
            >
              <i className={`fa-solid ${link.icon}`}></i>
              <span>{link.label}</span>
            </Link>
          ))}

          <hr className="mobile-drawer-divider" />

          {user ? (
            <>
              <Link to="/profile" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>
                <i className="fa-solid fa-circle-user"></i>
                <span>Profile</span>
              </Link>
              <Link to="/profile/saved" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>
                <i className="fa-regular fa-folder"></i>
                <span>Saved Posts</span>
              </Link>
              <Link to="/profile/edit" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>
                <i className="fa-regular fa-pen-to-square"></i>
                <span>Edit Profile</span>
              </Link>
              <button className="mobile-drawer-link mobile-drawer-logout" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>
              <i className="fa-solid fa-right-to-bracket"></i>
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;