import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, useTheme } from '@mui/material';
import Navbar from './Navbar';

function ErrorPage({ mode, toggleTheme }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <>
      <Navbar mode={mode} toggleTheme={toggleTheme} />
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
          px: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          The page you’re looking for doesn’t exist or has been moved.
        </Typography>
        <Button variant="contained" onClick={handleGoHome}>
          Go to Home
        </Button>
      </Box>
    </>
  );
}

export default ErrorPage;
