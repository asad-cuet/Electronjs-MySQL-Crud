// Fetch categories from the API exposed via the preload script
async function fetchCategories() {
    try {
      const categories = await window.electronAPI.fetchCategories();
      const tableBody = document.getElementById('categories-table-body');
  
      // Clear any existing rows
      tableBody.innerHTML = '';
  
      // Populate table with categories
      categories.forEach((category) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${category.id}</td>
          <td>${category.name}</td>
          <td>${category.description}</td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }
  
  // Fetch categories when the page loads
  document.addEventListener('DOMContentLoaded', fetchCategories);
  