import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">MyWebsite</div>
        <div
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(true)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      <div className={`fullscreen-menu ${menuOpen ? 'slide-in' : 'slide-out'}`}>
  <button className="close-btn" onClick={() => setMenuOpen(false)}>X</button>
  <ul>
    <li>Home</li>
    <li>About</li>
    <li>Services</li>
    <li>Contact</li>
  </ul>
</div>
    </>
  );
}

export default Navbar;
