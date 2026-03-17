const API = 'https://budget-tracker-production-6872.up.railway.app/api';

async function register() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const message = document.getElementById('auth-message');

  if (!name || !email || !password) {
    showMessage('Please fill in all fields', 'error');
    return;
  }

  try {
    const response = await fetch(API + '/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      showMessage('Account created! Redirecting to login...', 'success');
      setTimeout(function() {
        window.location.href = 'login.html';
      }, 1500);
    } else {
      showMessage(data.message, 'error');
    }
  } catch (error) {
    showMessage('Something went wrong. Try again.', 'error');
  }
}

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    showMessage('Please fill in all fields', 'error');
    return;
  }

  try {
    const response = await fetch(API + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Save token and user info to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = 'index.html';
    } else {
      showMessage(data.message, 'error');
    }
  } catch (error) {
    showMessage('Something went wrong. Try again.', 'error');
  }
}

function showMessage(msg, type) {
  const el = document.getElementById('auth-message');
  el.textContent = msg;
  el.className = 'auth-message ' + type;
}