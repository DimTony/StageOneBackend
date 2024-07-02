const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/api/hello', async (req, res) => {
  try {
    const visitorName = decodeURIComponent(
      req.query.visitor_name || 'Guest'
    ).replace(/"/g, '');

    const ipResponse = await axios.get('https://api.ipify.org?format=json');
    const ipAddress = ipResponse.data.ip;

    const geoResponse = await axios.get(`https://ipinfo.io/${ipAddress}/json`);
    const { city } = geoResponse.data;

    res.json({
      client_ip: ipAddress,
      location: city,
      greeting: `Hello, ${visitorName}!, the temperature is 11 degrees Celsius in ${city}`,
    });
  } catch (error) {
    console.error('Error fetching IP info:', error);
    res.status(500).send('Error fetching IP info');
  }
});

module.exports = app;
