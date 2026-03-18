# Budget Tracker KES 🇰🇪

A full stack personal finance tracker with user authentication and data visualisation.

# Live Demo
** App ** -- https://budget-tracker-ten-teal.vercel.app/
** API ** -- budget-tracker-production-6872.up.railway.app

## Live Features
- Register and login with JWT authentication
- Password hashed with bcrypt - never stored as plain text
- Each user sees only their own expense
- Add and delete expenses in Kenyan Shillings (KES)
- Categorise spending (food, transport, rent, entertainment)
- Live doughnut chart showing spending by category
- Bar chart showing top expenses
- Data stored permanently in MongoDB cloud database
- Fully responsive - works on mobile and desktop.

## Tech Stack
**Frontend
- React 18 with Vite
- React Router for navigation
- Tailwind CSS for styling
- ReCharts for data visualisation
- Axios for API calls
- Deployed on Vercel

**Backend
- Node.js + Express REST API
- JWT authentication
- bcryptjs for password hashing
- MongoDB + Mongoose
- Deployed on Railway

## API Endpoints
| Method | Endpoint | Description| Auth Required
| POST | /api/auth/register | create new account | No
| POST | /api/auth/login | Login and get token | No
| GET | /api/expense | Fetch all expenses | Yes
| POST | /api/expenses | create new expense | Yes
| DELETE | /api/expenses/:id | Delete an expense | Yes

## Run Locally
```bash
## Backend
cd backend
npm install
node server.js

## Frontend
cd frontend-react
npm install
npm run dev
```

## Environment Variables
Create a `.env` file in the backend folder:

MONGO_URI=ConnectionString
JWT_SECRET=SecretKey


## Project Structure
```
budget-tracker
├─ backend
│  ├─ middleware
│  │  └─ auth.js
│  ├─ models
│  │  ├─ expense.js
│  │  └─ user.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ routes
│  │  ├─ auth.js
│  │  └─ expenses.js
│  └─ server.js
├─ frontend-react
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.js
│  ├─ public
│  │  ├─ favicon.svg
│  │  └─ icons.svg
│  ├─ src
│  │  ├─ api.js
│  │  ├─ App.jsx
│  │  ├─ assets
│  │  │  └─ hero.png
│  │  ├─ components
│  │  │  ├─ Charts.jsx
│  │  │  ├─ ExpenseForm.jsx
│  │  │  ├─ ExpenseList.jsx
│  │  │  └─ Navbar.jsx
│  │  ├─ index.css
│  │  ├─ main.jsx
│  │  └─ pages
│  │     ├─ Dashboard.jsx
│  │     ├─ Login.jsx
│  │     └─ Register.jsx
│  ├─ tailwind.config.js
│  └─ vite.config.js
└─ README.md

```