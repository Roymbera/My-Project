

// Function to fetch and display expenses
const fetchExpenses = async () => {
  const token = localStorage.getItem('authToken'); // Retrieve the token

  try {
      const response = await fetch('http://localhost:3000/api/expenses', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}` // Include the token in the request header
          }
      });

      if (!response.ok) {
          throw new Error('Failed to fetch expenses');
      }

      const expenses = await response.json();
      updateExpenseUI(expenses); // Update the UI with fetched data

  } catch (error) {
      console.error('Error fetching expenses:', error);
      document.getElementById('status').textContent = 'Error fetching expenses';
  }
};

// Function to update UI with expenses data
const updateExpenseUI = (expenses) => {
  const transactionList = document.getElementById('transactionList');
  transactionList.innerHTML = '';

  expenses.forEach(expense => {
      const li = document.createElement('li');
      li.textContent = `Amount: $${expense.amount} | Date: ${expense.date} | Category: ${expense.category}`;
      transactionList.appendChild(li);
  });
};

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', fetchExpenses);
