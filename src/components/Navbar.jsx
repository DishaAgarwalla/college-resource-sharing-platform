import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { ThemeToggle } from './ThemeToggle';

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activePath, setActivePath] = useState("");
  const dropdownRef = useRef(null);
  const role = localStorage.getItem("role");

  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const isActive = (path) => {
    return activePath === path ? "active" : "";
  };

  // Main navigation - Clean & Essential
  const mainNavLinks = [
    { to: "/dashboard", label: "Dashboard", icon: "📊" },
    { to: "/resources", label: "Resources", icon: "📚" },
    { to: "/upload", label: "Upload", icon: "📤" },
    { to: "/bookmarks", label: "Bookmarks", icon: "🔖" },
    { to: "/profile", label: "Profile", icon: "👤" },
  ];

  // Dropdown items - Secondary navigation
  const dropdownLinks = [
    { to: "/my-uploads", label: "My Uploads", icon: "📁" },
    { to: "/top-downloads", label: "Top Downloads", icon: "🔥" },
    { to: "/top-rated", label: "Top Rated", icon: "⭐" },
  ];

  // Admin dropdown items
  const adminLinks = [
    { to: "/admin", label: "Admin Panel", icon: "⚙️" },
    { to: "/manage-users", label: "Manage Users", icon: "👥" },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/dashboard" className="navbar-logo" onClick={closeMenu}>
            <div className="logo-icon-wrapper">
              <span className="logo-icon">📘</span>
            </div>
            <div className="logo-text-wrapper">
              <span className="logo-text">Resource</span>
              <span className="logo-highlight">Hub</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-desktop">
            <div className="nav-links-wrapper">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-link ${isActive(link.to)}`}
                >
                  <span className="nav-link-icon">{link.icon}</span>
                  <span>{link.label}</span>
                  {isActive(link.to) && <span className="nav-link-indicator"></span>}
                </Link>
              ))}

              {/* More Dropdown */}
              <div className="dropdown-wrapper" ref={dropdownRef}>
                <button 
                  className={`nav-link dropdown-toggle ${isDropdownOpen ? "active" : ""}`}
                  onClick={toggleDropdown}
                >
                  <span className="nav-link-icon">📌</span>
                  <span>More</span>
                  <svg 
                    className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                
                <div className={`dropdown-menu ${isDropdownOpen ? "open" : ""}`}>
                  {dropdownLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`dropdown-item ${isActive(link.to)}`}
                      onClick={closeMenu}
                    >
                      <span className="dropdown-item-icon">{link.icon}</span>
                      <span>{link.label}</span>
                      {isActive(link.to) && <span className="dropdown-active-indicator"></span>}
                    </Link>
                  ))}
                  
                  {role === "ADMIN" && (
                    <>
                      <div className="dropdown-divider"></div>
                      <div className="dropdown-section-label">Admin</div>
                      {adminLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className={`dropdown-item admin-dropdown-item ${isActive(link.to)}`}
                          onClick={closeMenu}
                        >
                          <span className="dropdown-item-icon">{link.icon}</span>
                          <span>{link.label}</span>
                          {isActive(link.to) && <span className="dropdown-active-indicator admin-indicator"></span>}
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="navbar-actions">
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Logout Button */}
              <button className="logout-btn" onClick={handleLogout}>
                <svg className="logout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <path d="M16 17l5-5-5-5" />
                  <path d="M21 12H9" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="mobile-toggle" onClick={toggleMenu}>
            <span className={`hamburger ${isMenuOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu-overlay ${isMenuOpen ? "open" : ""}`}>
          <div className="mobile-menu-container">
            <div className="mobile-user-profile">
              <div className="mobile-user-avatar">{role?.charAt(0) || "U"}</div>
              <div className="mobile-user-info">
                <span className="mobile-user-name">Welcome Back!</span>
                <span className="mobile-user-role">{role || "User"}</span>
              </div>
            </div>

            {mainNavLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`mobile-nav-link ${isActive(link.to)}`}
                onClick={closeMenu}
              >
                <span className="nav-link-icon">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
            
            <div className="mobile-divider"></div>
            <div className="mobile-section-title">More</div>
            
            {dropdownLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`mobile-nav-link ${isActive(link.to)}`}
                onClick={closeMenu}
              >
                <span className="nav-link-icon">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}

            {role === "ADMIN" && (
              <>
                <div className="mobile-divider"></div>
                <div className="mobile-section-title">Administration</div>
                {adminLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`mobile-nav-link ${isActive(link.to)}`}
                    onClick={closeMenu}
                  >
                    <span className="nav-link-icon">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </>
            )}

            <div className="mobile-divider"></div>
            
            {/* Mobile Theme Toggle */}
            <div className="mobile-theme-toggle">
              <ThemeToggle />
              <span className="mobile-theme-label">Toggle Theme</span>
            </div>

            <button className="mobile-logout-btn" onClick={handleLogout}>
              <svg className="logout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <path d="M16 17l5-5-5-5" />
                <path d="M21 12H9" />
              </svg>
              <span>Logout</span>
            </button>

            <div className="mobile-footer">
              <span>ResourceHub v1.0</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      <div className={`navbar-backdrop ${isMenuOpen ? "open" : ""}`} onClick={closeMenu}></div>
    </>
  );
}

export default Navbar;