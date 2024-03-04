// Require the mysql package
const mysql = require('mysql');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'manager',
  database: 'balram'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

// Perform a simple query
connection.query('SELECT * FROM EMP', (err, rows) => {
  if (err) {
    console.error('Error executing query:', err);
    return;
  }
  console.log('Data received from MySQL:');
  console.log(rows);
});

// Close the connection when done
connection.end();
