function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable');
      tableBody.innerHTML = '';

      const list = data.data;
      list.forEach(item => {
        const row = document.createElement('tr');

        // Create and populate ID cell
        const idCell = document.createElement('td');
        idCell.textContent = item.id;
        row.appendChild(idCell);

        // Create and populate name cell
        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        // Create delete button with data-id attribute set to employee ID
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.setAttribute('data-id', item.id); // Set data-id attribute
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error(error));
}

// Add event listener to submit button
document.getElementById('employeeForm').addEventListener('submit', function (event) {
  event.preventDefault();
  createEmployee();
});

// Add event listener to delete button (event delegation)
document.getElementById('dataTable').addEventListener('click', function (event) {
  if (event.target && event.target.tagName === 'BUTTON' && event.target.textContent === 'Delete') {
    const id = event.target.dataset.id;
    deleteEmployee(id);
  }
});

// Function to create employee
function createEmployee() {
  console.log('hiii');
  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, name })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to create employee');
      }
      fetchEmployees(); 
      document.getElementById('employeeForm').reset(); 
    })
    .catch(error => console.error(error));
}

// Function to delete employee
function deleteEmployee(id) {
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }
      fetchEmployees(); 
    })
    .catch(error => console.error(error));
}

fetchEmployees();
