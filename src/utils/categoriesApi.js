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



  ipcMain.handle('delete-category', async (event, id) => {
    try {
      const query = 'DELETE FROM categories WHERE id = ?';
  
      // Use a Promise wrapper to handle the callback-based `runQuery`
      const result = await new Promise((resolve, reject) => {
        runQuery(query, [id], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
  
      return { success: true, result };
    } catch (error) {
      console.error('Error deleting category:', error);
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('get-category', async (event, id) => {
    try {
      const query = 'SELECT * FROM categories WHERE id = ?';
      return new Promise((resolve, reject) => {
        runQuery(query, [id], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });

    } catch (error) {
      console.error('Error in fetching:', error);
      return { success: false, error: error.message };
    }
  });
