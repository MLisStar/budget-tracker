import { useState } from 'react'
import API from '../api'

export default function ExpenseForm({ onExpenseAdded }) {
  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('food')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!desc || !amount) return
    setLoading(true)

    try {
      await API.post('/expenses', {
        desc,
        amount: parseFloat(amount),
        category
      })
      setDesc('')
      setAmount('')
      setCategory('food')
      onExpenseAdded() // tell Dashboard to refresh
    } catch (err) {
      console.log('Error adding expense:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Add expense</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="Description e.g. Lunch"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          required
        />
        <div className="flex gap-3">
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Amount in KES"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            required
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="rent">Rent</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50"
        >
          {loading ? 'Adding...' : '+ Add Expense'}
        </button>
      </form>
    </div>
  )
}