// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import HomePage from './components/Home';
import CurrencyRates from './components/CurrencyRates';
import ErrorPage from './components/Error';

function App() {
  const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage mode={mode} toggleTheme={toggleTheme} />} />
          <Route path="/currencies" element={<CurrencyRates mode={mode} toggleTheme={toggleTheme} />} />
          <Route path="/error" element={<ErrorPage mode={mode} toggleTheme={toggleTheme} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
