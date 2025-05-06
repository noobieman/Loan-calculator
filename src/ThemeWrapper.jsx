// ThemeWrapper.jsx
import React from 'react';
import { useDarkMode } from './DarkModeContext';

const ThemeWrapper = ({ children }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      {children}
    </div>
  );
};

export default ThemeWrapper;
