const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'attendance_system'
});

db.connect((err) => {
    if (err) {
      console.error('MySQL connection error:', err);
    } else {
      console.log('Connected to MySQL');
    }
});

app.get('/attendance', (req, res) => {
    const query = 'SELECT * FROM attendance';
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error fetching attendance records:', err);
        res.status(500).send('Error fetching attendance records');
      } else {
        res.status(200).json(result);
      }
    });
});
  
app.post('/signin', (req, res) => {
    const { name } = req.body;
    const query = 'INSERT INTO attendance (name, signin_time) VALUES (?, NOW())';
    db.query(query, [name], (err, result) => {
      if (err) {
        console.error('Error signing in:', err);
        res.status(500).send('Error signing in');
      } else {
        res.status(200).send('Signed in successfully');
      }
    });
});
  
app.post('/signout', (req, res) => {
    const { name } = req.body;
    const query = 'UPDATE attendance SET signout_time = NOW() WHERE name = ? AND signout_time IS NULL';
    db.query(query, [name], (err, result) => {
      if (err) {
        console.error('Error signing out:', err);
        res.status(500).send('Error signing out');
      } else {
        res.status(200).send('Signed out successfully');
      }
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
    console.log('Server is running');
});