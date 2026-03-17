const API = 'https://budget-tracker-production-6872.up.railway.app/api/expenses';

// Load expenses when page starts
document.addEventListener('DOMContentLoaded', function() {
  // If no token redirect to login
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  // Show username in the header
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    document.getElementById('username').textContent = 'Hi, ' + user.name;
  }

  fetchExpenses();
});

function getToken() {
  return localStorage.getItem('token');
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}
async function fetchExpenses() {
  try {
    const response = await fetch(API, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    const expenses = await response.json();
    renderExpenses(expenses);
    updateTotal(expenses);
    renderCharts(expenses);
  } catch (error) {
    console.log('Error fetching expenses:', error);
  }
}

async function addExpense() {
  const desc = document.getElementById('desc').value;
  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;

  if (desc === '' || amount === '' || amount <= 0) {
    alert('Please enter a description and a valid amount');
    return;
  }

  try {
    const response = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ desc, amount: parseFloat(amount), category })
    });

    if (response.ok) {
      document.getElementById('desc').value = '';
      document.getElementById('amount').value = '';
      fetchExpenses(); // refresh the list
    }
  } catch (error) {
    console.log('Error adding expense:', error);
  }
}

async function deleteExpense(id) {
  try {
    await fetch(API + '/' + id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    fetchExpenses(); // refresh the list
  } catch (error) {
    console.log('Error deleting expense:', error);
  }
}

function renderExpenses(expenses) {
  const list = document.getElementById('expense-list');
  list.innerHTML = '';

  expenses.forEach(function(expense) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="expense-desc">${expense.desc}</span>
      <span class="expense-cat">${expense.category}</span>
      <span class="expense-amount">KES ${expense.amount.toLocaleString()}</span>
      <button onclick="deleteExpense('${expense._id}')">Delete</button>
    `;
    list.appendChild(li);
  });
}

function updateTotal(expenses) {
  const total = expenses.reduce(function(sum, expense) {
    return sum + expense.amount;
  }, 0);
  document.getElementById('total').textContent = 'KES ' + total.toLocaleString();
}

let categoryChartInstance = null;
let barChartInstance = null;

function renderCharts(expenses) {
  const categoryTotals = {};
  expenses.forEach(function(expense) {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals[expense.category] = expense.amount;
    }
  });

  const categoryLabels = Object.keys(categoryTotals);
  const categoryData = Object.values(categoryTotals);

  if (categoryChartInstance) categoryChartInstance.destroy();

  const ctx1 = document.getElementById('categoryChart').getContext('2d');
  categoryChartInstance = new Chart(ctx1, {
    type: 'doughnut',
    data: {
      labels: categoryLabels,
      datasets: [{
        data: categoryData,
        backgroundColor: ['#4f46e5','#10b981','#f59e0b','#ef4444','#8b5cf6'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      plugins: { legend: { position: 'bottom' } }
    }
  });

  const top5 = [...expenses]
    .sort(function(a, b) { return b.amount - a.amount; })
    .slice(0, 5);

  if (barChartInstance) barChartInstance.destroy();

  const ctx2 = document.getElementById('barChart').getContext('2d');
  barChartInstance = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: top5.map(function(e) { return e.desc; }),
      datasets: [{
        label: 'KES',
        data: top5.map(function(e) { return e.amount; }),
        backgroundColor: '#4f46e5',
        borderRadius: 6
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) { return 'KES ' + value.toLocaleString(); }
          }
        }
      }
    }
  });
}