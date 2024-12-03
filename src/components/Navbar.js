
import React, { useState } from 'react';
import { Link } from 'react-scroll'; // Import Link from react-scroll
import '../styles/Navbar.css'; // Import the CSS for styling the navbar

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <a href="#!" className="brand-name">ForexFuturesCrypto</a>
        </div>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <Link
              to="services"
              smooth={true}
              duration={500}
              onClick={() => setMenuOpen(false)}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="strategy"
              smooth={true}
              duration={500}
              onClick={() => setMenuOpen(false)}
            >
              Strategy
            </Link>
          </li>
          <li>
            <Link
              to="pricing"
              smooth={true}
              duration={500}
              onClick={() => setMenuOpen(false)}
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              to="faq"
              smooth={true}
              duration={500}
              onClick={() => setMenuOpen(false)}
            >
              FAQ
            </Link>
          </li>
          <li>
            <Link
              to="contact"
              smooth={true}
              duration={500}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
        <div className="hamburger-menu" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

