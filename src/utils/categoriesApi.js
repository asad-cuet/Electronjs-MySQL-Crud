const { ipcMain } = require('electron');
const runQuery = require('./dbQuery');

// Define the API to fetch categories
ipcMain.handle('get-categories', async () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, name, description FROM categories';
    runQuery(query, (err, results) => {
      if (err) {
        console.error('Error fetching categories:', err.message);
        reject(err.message);
        return;
      }
      resolve(results);
    });
  });
});


ipcMain.handle('add-category', async (event, category) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO categories (name, description) VALUES (?, ?)';
      const values = [category.name, category.description];
  
      runQuery(query, values, (err, results) => {
        if (err) {
          console.error('Error adding category:', err.message);
          reject({ success: false, error: err.message });
          return;
        }
        resolve({ success: true, results });
      });
    });
  });
  
