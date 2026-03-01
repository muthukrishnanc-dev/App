
[Uploading Screencast from 2026-03-01 09-37-00.webm…]()

# MyProject TaskManager

A full-stack task management application built with the MERN stack (MongoDB, Express.js, React, Node.js).

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React|
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT (JSON Web Tokens) |

---

## Features

- User registration and login with JWT authentication
- Create, read, update, and delete tasks
- Mark tasks as complete / incomplete
- Filter tasks by status and priority
- Protected routes for authenticated users

---

## Project Structure

```
myproject-taskmanager/
├── client/                   # React frontend
│   ├── public/
│   └── src/
│       ├── components/       # Axios API calls
│       └── App.jsx
├── server/                   # Node/Express backend
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   └── server.js
├── .env
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local)
- npm

**Set up environment variables**

Create a `.env` file in the `server/` directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

**Install server dependencies**

```bash
cd server
npm install
```

**4. Install client dependencies**

```bash
cd ../client
npm install
```

### Running the App

**Development mode (run both simultaneously):**

```bash
# In /server
npm run dev

# In /client
npm start
```

Or use concurrently from the root:

```bash
npm run dev
```

The React app runs on `http://localhost:3000` and the Express API on `http://localhost:5000`.

---

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive JWT |

### Tasks (Protected — requires Bearer token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/manager/tasks` | Get all tasks for user |
| POST | `/manager/tasks` | Create a new task |
| PUT | `/manager/tasks/:id` | Update a task |
| DELETE | `/manager/tasks/:id` | Delete a task |

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Port for the Express server |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWTs |
| `NODE_ENV` | `development` or `production` |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start server with nodemon |
| `npm start` | Start server (production) |
| `npm test` | Run tests |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

---

## License

This project is licensed under the MIT License.
