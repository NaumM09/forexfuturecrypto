import React, { useState, useEffect, useCallback, useRef } from "react";
import { NavLink} from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  // We don't need to explicitly use location since NavLink handles active state

  // Handle scroll events for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        if (!scrolled) setScrolled(true);
      } else {
        if (scrolled) setScrolled(false);
      }
    };

    // Optimized scroll handler with throttling
    let scrollTimer;
    const throttledScroll = () => {
      if (!scrollTimer) {
        scrollTimer = setTimeout(() => {
          handleScroll();
          scrollTimer = null;
        }, 100);
      }
    };

    window.addEventListener("scroll", throttledScroll);
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, [scrolled]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && menuOpen) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleMenu = useCallback(() => {
    setMenuOpen(prevState => !prevState);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  // Updated nav items for actual pages
  const navItems = [
    { path: "/community", label: "Community" },
    { path: "/events", label: "Events" },
    { path: "/resources", label: "Resources" },
    { path: "/brokers", label: "Brokers" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} ref={navRef}>
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className="brand-name" aria-label="FX Futures Crypto Africa Homepage">
            <span className="brand-text">Fx Futures Crypto</span>
            <span className="brand-africa">Africa</span>
          </NavLink>
        </div>
        
        <button 
          className={`hamburger-menu ${menuOpen ? "active" : ""}`} 
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) => isActive ? "active" : ""}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <a
              href="https://wa.me/+27810593062"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="contact-link"
              aria-label="Connect via WhatsApp"
            >
              <svg className="whatsapp-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/>
              </svg>
              <span>Connect</span>
            </a>
          </li>
          <li className="login-menu-item">
            <NavLink to="/join" className="login-button" onClick={closeMenu}>
              <span className="login-text">Join Our Network</span>
              <span className="login-arrow">→</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;