import React from 'react';
import { Link } from 'react-router-dom'; // For navigation between pages

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          ForexFutureCrypto
        </Link>

        {/* Menu */}
        <ul className="navbar-menu">
          <li><Link to="/strategies">Strategies</Link></li>
          <li><Link to="/testimonials">Testimonials</Link></li>
          <li><Link to="/why-choose-us">Why Choose Us</Link></li>
          <li><Link to="/pricing-plan">Pricing Plan</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
