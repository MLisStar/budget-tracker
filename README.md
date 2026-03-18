# Budget Tracker KES 🇰🇪

A full stack personal finance tracker with user authentication and data visualisation.


## Live Features
- Register and login with JWT authentication
- Password hashed with bcrypt - never stored as plain text
Each user sees only their own expense
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

**Backend
- Node.js + Express REST API
- JWT authentication
- bcryptjs for password hashing
- MongoDB + Mongoose
- CORS, dotenv

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

