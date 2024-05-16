const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

// MySQL Connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'trafficcity'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('MySQL Connected...');
});

// Handle form submission
app.post('/register', (req, res) => {
  const { username, password, email, vehicle_class, car_make, car_model, license_plate } = req.body;

  const query = 'INSERT INTO users (username, password, email, vehicle_class, car_make, car_model, license_plate) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [username, password, email, vehicle_class, car_make, car_model, license_plate], (err, result) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      return res.status(500).send('Database error');
    }
    res.send('Registration complete');
  });
});

// Serve the main index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
