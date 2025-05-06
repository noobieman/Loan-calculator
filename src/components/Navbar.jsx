/**
 * The Navbar component in this React application includes a theme toggle button and a responsive menu
 * for navigation.
 * @returns The `Navbar` component is being returned. It consists of a navigation bar with a brand name
 * "Loan Calculator", a theme toggle button that switches between light and dark mode, a hamburger menu
 * icon for mobile view, and a fullscreen menu that slides in and out when the hamburger menu icon is
 * clicked. The fullscreen menu contains links to different pages like Home, Exchange Rate Live, and
 * Error Page.
 */
import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function Navbar({ mode, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">Loan Calculator</div>

        {/* Theme toggle button */}
        <IconButton className='iconButton' onClick={toggleTheme} color="inherit">
          {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>

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
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/currencies" onClick={() => setMenuOpen(false)}>Exchange Rate Live</Link></li>
          <li><Link to="/error" onClick={() => setMenuOpen(false)}>Error Page</Link></li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
