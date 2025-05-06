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
