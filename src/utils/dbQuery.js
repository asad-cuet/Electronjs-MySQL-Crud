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
const runQuery = (query, callback) => {
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Query error:', err.stack);
      callback(err, null);
      return;
    }
    callback(null, results);
  });
};

module.exports = runQuery;
