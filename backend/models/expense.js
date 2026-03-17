const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  desc: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['food', 'transport', 'rent', 'entertainment', 'other']
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Expense', expenseSchema);