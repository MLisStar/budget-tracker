const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');

// GET all expenses
router.get('/', async function(req, res) {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses', error });
  }
});

// POST a new expense
router.post('/', async function(req, res) {
  try {
    const expense = new Expense({
      desc: req.body.desc,
      amount: req.body.amount,
      category: req.body.category
    });
    const saved = await expense.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error saving expense', error });
  }
});

// DELETE an expense by ID
router.delete('/:id', async function(req, res) {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense', error });
  }
});

module.exports = router;