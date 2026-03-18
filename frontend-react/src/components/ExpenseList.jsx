import API from '../api'

const categoryColors = {
  food: 'bg-green-100 text-green-700',
  transport: 'bg-blue-100 text-blue-700',
  rent: 'bg-purple-100 text-purple-700',
  entertainment: 'bg-yellow-100 text-yellow-700',
  other: 'bg-gray-100 text-gray-700'
}

export default function ExpenseList({ expenses, onDeleted }) {
  async function handleDelete(id) {
    try {
      await API.delete('/expenses/' + id)
      onDeleted()
    } catch (err) {
      console.log('Error deleting:', err)
    }
  }

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center text-gray-400">
        No expenses yet. Add your first one above!
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Expenses</h2>
      <div className="space-y-3">
        {expenses.map(expense => (
          <div key={expense._id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-3">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${categoryColors[expense.category]}`}>
                {expense.category}
              </span>
              <span className="text-gray-700 text-sm">{expense.desc}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-800">
                KES {expense.amount.toLocaleString()}
              </span>
              <button
                onClick={() => handleDelete(expense._id)}
                className="text-red-400 hover:text-red-600 text-sm hover:bg-red-50 px-2 py-1 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}