import { useState, useEffect } from 'react'
import API from '../api'
import Navbar from '../components/Navbar'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import Charts from '../components/Charts'

export default function Dashboard() {
  const [expenses, setExpenses] = useState([])

  async function fetchExpenses() {
    try {
      const res = await API.get('/expenses')
      setExpenses(res.data)
    } catch (err) {
      console.log('Error fetching expenses:', err)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* Total summary */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
          <p className="text-indigo-200 text-sm font-medium">Total spent</p>
          <p className="text-4xl font-bold mt-1">KES {total.toLocaleString()}</p>
          <p className="text-indigo-200 text-sm mt-2">{expenses.length} expenses tracked</p>
        </div>

        <ExpenseForm onExpenseAdded={fetchExpenses} />
        <Charts expenses={expenses} />
        <ExpenseList expenses={expenses} onDeleted={fetchExpenses} />
      </div>
    </div>
  )
}