// Import required modules
const express = require('express');
const mysql = require('mysql');

// Create an Express application
const app = express();

const cors = require('cors');

// Use CORS middleware
app.use(cors());
app.use(express.json());

const url='http://127.0.0.1:5500/form.html'

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'manager',
  database: 'balram'
});

// Define a route
app.get(`/users`, (req, res) => {
    console.log("req.header",req.headers);
    console.log("req.body",req.body);
    console.log("req.param",req.params);
    console.log("req.query",req.query);
    console.log("req.baseurl",req.baseUrl);

    const getjob=req?.query.getjob
  // Acquire a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Perform a query
    connection.query('SELECT * FROM EMP where JOB=?',[getjob], (err, rows) => {
      // Release the connection back to the pool
      connection.release();

      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      // Send the results
      res.json(rows);
    });
  });
});

app.post(`/submit`, (req, res) => {
    console.log("req.body:",req.body);
    const { name, sal, job } = req?.body;
    if (!name || !sal || !job) {
      res.status(400).send('Name and email are required');
      return;
    }
  
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to MySQL database:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      connection.query('INSERT INTO EMP (ENAME, SAL,JOB) VALUES (?, ?, ?)', [name,sal, job], (err, result) => {
        connection.release();
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.status(201).send('User added successfully');
      });
    });
  });

// Start the server
const port = 5000; // You can change the port if needed
app.listen(port, () => {
  console.log(`Server listen at port 5000`);
});
