const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

const FRED_API_KEY = process.env.FRED_API_KEY;

var TREASURIES = [
{ series: 'DGS1MO', duration: 30,  yield: 0, label: '1 month' },
{ series: 'DGS3MO', duration: 90, yield: 0, label: '3 month' },
{ series: 'DGS6MO', duration: 180, yield: 07, label: '6 month' },
{ series: 'DGS1', duration: 365, yield: 0, label: '1 year' },
{ series: 'DGS2', duration: 365 * 2, yield: 0, label: '2 year' },
{ series: 'DGS5', duration: 365 * 5, yield: 0, label: '5 year' },
{ series: 'DGS7', duration: 365 * 7, yield: 0, label: '7 year' },
{ series: 'DGS10', duration: 365 * 10, yield: 0, label: '10 year' },
{ series: 'DGS30', duration: 365 * 30, yield: 0, label: '30 year' }
]

app.get('/getYieldData', async (req, res) => {
try {

  for (const treasury of TREASURIES) {
    
    const response = await fetch(`https://api.stlouisfed.org/fred/series/observations?series_id=${treasury.series}&api_key=${FRED_API_KEY}&file_type=json&sort_order=desc&limit=1`);
    data = await response.json();

    treasury.yield = data.observations[0].value;

  }

  // Process the data as needed and then send it
  res.json(TREASURIES);
  
  } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

