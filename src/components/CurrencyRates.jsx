/**
 * The `CurrencyRates` function in CurrencyRates.jsx fetches and displays currency exchange rates based
 * on USD, with pagination for navigation.
 * @returns The `CurrencyRates` component is being returned. It fetches currency exchange rates based
 * on USD from an API, displays the rates in a table with pagination, and includes a basic example
 * component for the navbar.
 */
// CurrencyRates.jsx
import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Pagination, Box
} from '@mui/material';
import BasicExample from './Navbar';


function CurrencyRates({ mode, toggleTheme }) {
  const [rates, setRates] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const ratesPerPage = 10;

  useEffect(() => {
    fetch('https://v6.exchangerate-api.com/v6/af9b4ec33fe3ba2fca6f4851/latest/USD')
      .then((res) => res.json())
      .then((data) => setRates(data.conversion_rates))
      .catch((err) => console.error(err));
  }, []);

  const rateEntries = Object.entries(rates);
  const totalPages = Math.ceil(rateEntries.length / ratesPerPage);
  const start = (currentPage - 1) * ratesPerPage;
  const currentRates = rateEntries.slice(start, start + ratesPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
    <BasicExample  mode={mode} toggleTheme={toggleTheme} />
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Currency Exchange Rates (Base: USD)
        </Typography>

        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Currency</strong></TableCell>
                <TableCell align="right"><strong>Rate</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRates.map(([currency, rate]) => (
                <TableRow key={currency}>
                  <TableCell>{currency}</TableCell>
                  <TableCell align="right">{rate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box mt={3}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </Container>
    </>
  );
}

export default CurrencyRates;
