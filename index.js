require('dotenv').config();
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

    const API_KEY = process.env.API_KEY;

    const weatherresponse = await axios.get(
      `https://api.weatherapi.com/v1/current.json?q=${ipAddress}&key=${API_KEY}`
    );

    res.json({
      client_ip: ipAddress,
      location: weatherresponse.data.location.region,
      greeting: `Hello, ${visitorName}!, the temperature is ${weatherresponse.data.current.temp_c} degrees Celsius in ${weatherresponse.data.location.region}`,
    });
  } catch (error) {
    console.error('Error fetching IP info:', error);
    res.status(500).send('Error fetching IP info');
  }
});

module.exports = app;
