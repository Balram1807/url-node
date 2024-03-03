const sql = require('mssql');

// Config object for connecting to the database with Windows authentication
const config = {
    server: 'localhost',
    database: 'CarDispensary',
    options: {
        trustedConnection: true // Use Windows authentication
    }
};

// Function to execute a query
async function executeQuery() {
    try {
        // Create a new pool with the specified configuration
        const pool = await sql.connect(config);

        // Query database
        const result = await pool.request().query('SELECT * FROM Customer');

        // Log the result
        console.log(result.recordset);

        // Close the pool
        await pool.close();
    } catch (err) {
        // Log any errors
        console.error('SQL error', err);
    }
}

// Call the function to execute the query
executeQuery();
