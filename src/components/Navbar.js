import React, { useState } from "react";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className="brand-name">
            ForexFuturesCrypto
          </NavLink>
        </div>
        <div className="hamburger-menu" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="services" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>
              Services
            </Link>
          </li>
          <li>
            <Link to="strategy" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>
              Strategy
            </Link>
          </li>
          <li>
            <Link to="pricing" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>
              Pricing
            </Link>
          </li>
          <li>
            <Link to="faq" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>
              FAQ
            </Link>
          </li>
          <li>
            <a
              href="https://wa.me/+27810593062"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="contact-link"
            >
              Contact
            </a>
          </li>
          <li className="login-menu-item">
            <NavLink to="/auth" className="login-button" onClick={() => setMenuOpen(false)}>
              Login / Sign Up
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
