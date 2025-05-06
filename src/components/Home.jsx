/* The above code is a React component named `HomePage` that serves as a loan calculator dashboard.
Here is a summary of what the code does: */
import React, { useState } from 'react';
import BasicExample from './Navbar';
import useFetch from './useFetch';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box
} from '@mui/material';

function HomePage({ mode, toggleTheme }) {
  const [emiUSD, setEmiUSD] = useState(null); // EMI in USD
  const [scheduleUSD, setScheduleUSD] = useState([]); // Schedule in USD
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');

  // Fetch conversion rates
  const { data, loading, error } = useFetch(
    'https://v6.exchangerate-api.com/v6/af9b4ec33fe3ba2fca6f4851/latest/USD'
  );

  const handleCalculate = () => {
    const P = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const years = parseFloat(term);

    const R = annualRate / 100 / 12;
    const N = years * 12;

    const emiVal = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmiUSD(emiVal.toFixed(2));

    // Build amortization schedule in USD
    let balance = P;
    const table = [];

    for (let month = 1; month <= N; month++) {
      const interest = balance * R;
      const principal = emiVal - interest;
      balance -= principal;

      table.push({
        month,
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        remaining: balance > 0 ? balance.toFixed(2) : '0.00'
      });
    }

    setScheduleUSD(table);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Get conversion rate
  const conversionRate = data?.conversion_rates[selectedCurrency] || 1;

  // Convert USD values to selected currency
  const convertedEmi = emiUSD ? (emiUSD * conversionRate).toFixed(2) : null;
  const convertedSchedule = scheduleUSD.map((row) => ({
    ...row,
    principal: (parseFloat(row.principal) * conversionRate).toFixed(2),
    interest: (parseFloat(row.interest) * conversionRate).toFixed(2),
    remaining: (parseFloat(row.remaining) * conversionRate).toFixed(2)
  }));

  return (
    <>
      <BasicExample  mode={mode} toggleTheme={toggleTheme} />
      <Container maxWidth="md">
        <Box mt={5} textAlign="center">
          <Typography variant="h4" gutterBottom>
            Loan Calculator Dashboard
          </Typography>

          <Grid container spacing={3} justifyContent="center" mt={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Loan Amount"
                type="number"
                variant="outlined"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Interest Rate (%)"
                type="number"
                variant="outlined"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Term (Years)"
                type="number"
                variant="outlined"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </Grid>
          </Grid>

          <Box mt={3}>
            <Button variant="contained" color="primary" onClick={handleCalculate}>
              CALCULATE
            </Button>

            <Grid item xs={12} mt={3}>
              <TextField
                select
                label="Currency"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                fullWidth
                SelectProps={{ native: true }}
              >
                {['USD', 'INR', 'GBP', 'EUR', 'CAD', 'AUD', 'JPY'].map((cur) => (
                  <option key={cur} value={cur}>
                    {cur}
                  </option>
                ))}
              </TextField>
            </Grid>

            {convertedEmi && (
              <Box mt={4}>
                <Typography variant="h6">
                  Monthly EMI: {selectedCurrency} {convertedEmi}
                </Typography>

                <Box mt={3}>
                  <Typography variant="h6">
                    Amortization Schedule ({selectedCurrency})
                  </Typography>
                  <table
                    style={{
                      width: '100%',
                      marginTop: '10px',
                      borderCollapse: 'collapse'
                    }}
                  >
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Principal</th>
                        <th>Interest</th>
                        <th>Remaining Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {convertedSchedule.map((row) => (
                        <tr key={row.month}>
                          <td>{row.month}</td>
                          <td>
                            {row.principal} {selectedCurrency}
                          </td>
                          <td>
                            {row.interest} {selectedCurrency}
                          </td>
                          <td>
                            {row.remaining} {selectedCurrency}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default HomePage;
