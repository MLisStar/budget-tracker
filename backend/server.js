const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const expenseRoutes = require('./routes/expenses');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// All expense routes live under /api/expenses
app.use('/api/expenses', expenseRoutes);
app.use('/api/auth', authRoutes);

app.get('/', function(req, res) {
  res.json({ message: 'Budget Tracker API is running' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(function() {
    console.log('Connected to MongoDB');
    app.listen(PORT, function() {
      console.log('Server running on http://localhost:' + PORT);
    });
  })
  .catch(function(error) {
    console.log('Connection failed:', error);
  });