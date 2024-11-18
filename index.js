const express = require('express');
const cors = require('cors');
const moment = require('moment');
const momentTimezone = require('moment-timezone');

const app = express();

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// Basic route for the homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Helper functions
const isValidDate = (date) => {
  return moment(date).isValid();
};

const getDateResponse = (date) => {
  const parsedDate = new Date(date);
  if (parsedDate.toString() === "Invalid Date") {
    return { error: "Invalid Date" };
  }
  return {
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  };
};

// API Endpoints

// Base API endpoint for current time
app.get("/api", (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString(),
  });
});

// Date handling endpoint
app.get("/api/:date", (req, res) => {
  const { date } = req.params;

  // Check for Unix timestamp
  const timestamp = parseInt(date);
  if (!isNaN(timestamp)) {
    const unixDate = new Date(timestamp);
    return res.json({
      unix: unixDate.getTime(),
      utc: unixDate.toUTCString(),
    });
  }

  // Check for valid date string
  const response = getDateResponse(date);
  res.json(response);
});

// Leap year checker
app.get("/api/leap-year/:year", (req, res) => {
  const year = parseInt(req.params.year);
  if (isNaN(year)) {
    return res.json({ error: "Invalid Year" });
  }

  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  res.json({ year, isLeapYear: isLeap });
});

// Duration calculator
app.get("/api/duration", (req, res) => {
  const { start, end } = req.query;

  if (!isValidDate(start) || !isValidDate(end)) {
    return res.json({ error: "Invalid Date(s)" });
  }

  const startDate = moment(start);
  const endDate = moment(end);
  const days = endDate.diff(startDate, 'days');

  res.json({
    start: startDate.toUTCString(),
    end: endDate.toUTCString(),
    days,
  });
});

// Day of the week
app.get("/api/day/:date", (req, res) => {
  const { date } = req.params;

  if (!isValidDate(date)) {
    return res.json({ error: "Invalid Date" });
  }

  const day = moment(date).format('dddd');
  res.json({ date, day });
});

// Countdown timer
app.get("/api/countdown", (req, res) => {
  const { date } = req.query;

  if (!isValidDate(date)) {
    return res.json({ error: "Invalid Date" });
  }

  const targetDate = moment(date);
  const now = moment();
  const diff = moment.duration(targetDate.diff(now));

  res.json({
    date: targetDate.toUTCString(),
    countdown: {
      days: diff.days(),
      hours: diff.hours(),
      minutes: diff.minutes(),
      seconds: diff.seconds(),
    },
  });
});

// Supported date formats
app.get("/api/formats", (req, res) => {
  res.json({
    supportedFormats: [
      "YYYY-MM-DD",
      "MM-DD-YYYY",
      "DD-MM-YYYY",
      "Unix Timestamp",
    ],
  });
});

// Historical events (dummy data)
app.get("/api/events/:monthDay", (req, res) => {
  const { monthDay } = req.params;
  const events = {
    "12-25": [
      "800 - Charlemagne is crowned Holy Roman Emperor.",
      "1066 - William the Conqueror is crowned king of England.",
    ],
    "07-04": [
      "1776 - Declaration of Independence of the United States.",
      "1826 - Deaths of Thomas Jefferson and John Adams.",
    ],
  };

  res.json({
    date: monthDay,
    events: events[monthDay] || [],
  });
});

// Age calculator
app.get("/api/age", (req, res) => {
  const { birthdate } = req.query;

  if (!isValidDate(birthdate)) {
    return res.json({ error: "Invalid Date" });
  }

  const birthDate = moment(birthdate);
  const now = moment();
  const age = now.diff(birthDate, 'years');

  res.json({ birthdate, age });
});

// Multi-language support
app.get("/api/:date?", (req, res) => {
  const { date } = req.params;
  const { lang } = req.query;

  const validLangs = ['en', 'es', 'fr'];
  const response = getDateResponse(date || new Date());

  if (response.error) {
    return res.json(response);
  }

  if (lang && validLangs.includes(lang)) {
    moment.locale(lang);
    response.utc = moment(response.utc).format('LLLL');
  }

  res.json(response);
});

// Start the server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
