// This array holds all our expenses in memory
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let categoryChartInstance = null;
let barChartInstance = null;
renderExpenses();
updateTotal();
renderCharts();

function addExpense() {
  // Step 1: Grab what the user typed
  const desc = document.getElementById('desc').value;
  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;

  // Step 2: Basic validation — don't add empty entries
  if (desc === '' || amount === '' || amount <= 0) {
    alert('Please enter a description and a valid amount');
    return;
  }

  // Step 3: Build an expense object
  const expense = {
    id: Date.now(),        // unique ID using current timestamp
    desc: desc,
    amount: parseFloat(amount),  // convert string to a number
    category: category
  };

  // Step 4: Add it to our array
  expenses.push(expense);
  saveToStorage();

  // Step 5: Update the page
  renderExpenses();
  updateTotal();

  // Step 6: Clear the input fields
  document.getElementById('desc').value = '';
  document.getElementById('amount').value = '';
}

function renderExpenses() {
  const list = document.getElementById('expense-list');
  list.innerHTML = '';  // clear the list first

  expenses.forEach(function(expense) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="expense-desc">${expense.desc}</span>
      <span class="expense-cat">${expense.category}</span>
      <span class="expense-amount">KES ${expense.amount.toLocaleString()}</span>
      <button onclick="deleteExpense(${expense.id})">Delete</button>
    `;
    list.appendChild(li);
  });
}

function updateTotal() {
  // Add up all amounts using reduce
  const total = expenses.reduce(function(sum, expense) {
    return sum + expense.amount;
  }, 0);

  document.getElementById('total').textContent = 'KES ' + total.toLocaleString();
}

function deleteExpense(id) {
  // Keep every expense EXCEPT the one with this id
  expenses = expenses.filter(function(expense) {
    return expense.id !== id;
  });
  saveToStorage();

  renderExpenses();
  updateTotal();
}
function saveToStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}
function renderCharts() {
  // --- DONUT CHART: spending by castegory ---

  // Group expenses by category and sum the amounts
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

  // Destroy old chart before drawing a new one
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
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });

  // --- BAR CHART: top expenses by amount ---

  // Sort expenses highest to lowest, take top 5
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
  renderCharts();
}
