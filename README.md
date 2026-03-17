# Budget Tracker KES 🇰🇪

A full stack personal finance tracker.

## Live Features
- Add and delete expenses in Kenyan Shillings (KES)
- Categorise spending (food, transport, rent, entertainment)
- Live doughnut chart showing spending by category
- Bar chart showing top expenses
- Data stored permanently in MongoDB cloud database

## Tech Stack
**Frontend
- HTML5, CSS3, Vanilla JavaScript
- Chart.js for data visualisation

**Backend
- Node.js + Express REST API
- MongoDB + Mongoose
- CORS, dotenv

## API Endpoints
| Method | Endpoint | Description|
| GET | /api/expense | Fetch all expenses |
| POST | /api/expenses | create new expense |
| DELETE | /api/expenses/:id | Delete an expense

## Run Locally
```bash
## Backend
cd backend
npm install
node server.js

## Frontend
Open frontend/index.html with Server
```

## Environment Variables
Create a `.env` file in the backend folder:

