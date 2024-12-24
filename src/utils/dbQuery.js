const connection = require('./db');

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as ID:', connection.threadId);
});

// Export a function to perform queries
const runQuery = (query, params, callback) => {
    // Ensure parameters are passed when necessary (for parameterized queries)
    connection.query(query, params, (err, results) => {
      if (err) {
        console.error('Query error:', err.stack);
        callback(err, null); // Error in the first argument, results in the second
        return;
      }
      callback(null, results); // Success, pass the results
    });
  };

module.exports = runQuery;

