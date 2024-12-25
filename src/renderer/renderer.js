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
          <td>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${category.id}">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }



// Fetch categories when the page loads
document.addEventListener('DOMContentLoaded', fetchCategories);


// Listen for the form submission
document.getElementById('addCategoryForm').addEventListener('submit', async (e) => {
e.preventDefault(); // Prevent default form submission

const name = document.getElementById('categoryName').value;
const description = document.getElementById('categoryDescription').value;

try {
    // Send the new category data to the main process
    const response = await window.electronAPI.addCategory({ name, description });

    if (response.success) {
    // Close the modal
    const modalElement = document.getElementById('addCategoryModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

    // Clear the form inputs
    document.getElementById('addCategoryForm').reset();

    // Refresh the categories table
    fetchCategories();
    } else {
    console.error('Error adding category:', response.error);
    }
} catch (error) {
    console.error('Error:', error);
}
});
  

function refreshCategories()
{
  fetchCategories();
  alert('Refreshed');
}
  