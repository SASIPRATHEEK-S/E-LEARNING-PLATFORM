# E-Learning Platform — Backend

REST API for the E-Learning Platform. Built with **Node.js + Express + MongoDB (Mongoose)** and JWT-based authentication.

---

## 1. Tech Stack

| Layer          | Tech                            |
| -------------- | ------------------------------- |
| Runtime        | Node.js (>= 18)                 |
| Framework      | Express 5                       |
| Database       | MongoDB (local or Atlas) + Mongoose |
| Auth           | JWT + bcryptjs + cookie-parser  |
| Email / OTP    | Nodemailer (SMTP / Gmail)       |
| Dev tooling    | nodemon, dotenv, cors           |

---

## 2. Prerequisites

Install these on your machine before running the project:

- **Node.js** 18 or higher — <https://nodejs.org/>
- **npm** (ships with Node) — verify with `npm -v`
- **MongoDB** — either:
  - Local MongoDB Community Server — <https://www.mongodb.com/try/download/community>, **OR**
  - A free MongoDB Atlas cluster — <https://www.mongodb.com/atlas>
- **Git** — <https://git-scm.com/>
- A Gmail account with an **App Password** for sending OTP emails — <https://myaccount.google.com/apppasswords>

---

## 3. Setup

From the `backend/` folder:

```bash
# 1. Install dependencies
npm install

# 2. Create your env file from the template
#    Windows (PowerShell):
copy env\.env.example env\.env
#    macOS / Linux:
cp env/.env.example env/.env

# 3. Open env/.env and fill in real values (see section 4 below)
```

> **Important:** `env/.env` is git-ignored. Never commit it. Each developer maintains their own local copy.

---

## 4. Environment Variables (`env/.env`)

All variables, what they mean, and example values:

| Variable        | Required | Description                                                                 | Example                                                          |
| --------------- | :------: | --------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `PORT`          | No       | Port the API listens on. Defaults to `5000`.                                | `5000`                                                           |
| `NODE_ENV`      | No       | `development` or `production`.                                              | `development`                                                    |
| `MONGODB_URI`   | **Yes**  | MongoDB connection string. Local Mongo or Atlas.                            | `mongodb://localhost:27017/elearning`                            |
| `JWT_SECRET`    | **Yes**  | Secret used to sign JWTs. Use a long random string (>=32 chars).            | run `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `JWT_EXPIRE`    | No       | Token lifetime. Defaults to `7d`.                                           | `7d`                                                             |
| `EMAIL_HOST`    | **Yes**  | SMTP host.                                                                  | `smtp.gmail.com`                                                 |
| `EMAIL_PORT`    | **Yes**  | SMTP port (587 = STARTTLS, 465 = SSL).                                      | `587`                                                            |
| `EMAIL_USER`    | **Yes**  | SMTP username (your Gmail address).                                         | `your_email@gmail.com`                                           |
| `EMAIL_PASS`    | **Yes**  | SMTP password — for Gmail use an **App Password**, not your real password.  | `abcdefghijklmnop`                                               |
| `EMAIL_FROM`    | No       | "From" header on outgoing mail.                                             | `E-Learning Platform <your_email@gmail.com>`                     |
| `FRONTEND_URL`  | No       | Allowed CORS origin. Defaults to `http://localhost:5173` (Vite dev server). | `http://localhost:5173`                                          |

**Generating a JWT_SECRET (one-liner):**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Gmail App Password steps:**
1. Enable 2-Step Verification on your Google account.
2. Visit <https://myaccount.google.com/apppasswords>.
3. Create a new app password for "Mail" and paste the 16-character code into `EMAIL_PASS`.

---

## 5. Running the Server

```bash
# Development (auto-reload via nodemon)
npm run dev

# Production
npm start
```

The API is then available at:

```
http://localhost:5000
```

A health check: `GET http://localhost:5000/` → `{"message":"E-Learning Platform API"}`

---

## 6. API Endpoints (overview)

Base URL: `/api`

| Group        | Mount path           | Purpose                                |
| ------------ | -------------------- | -------------------------------------- |
| Auth         | `/api/auth`          | Signup (OTP), login, logout, current user |
| Profile      | `/api/profile`       | View / update user profile             |
| Users        | `/api/users`         | User management (admin)                |
| Courses      | `/api/courses`       | Create, list, update, delete courses   |
| Quizzes      | `/api/quizzes`       | Quiz CRUD, publish                     |
| Enrollments  | `/api/enrollments`   | Enroll students into courses           |
| Progress     | `/api/progress`      | Track lesson / course progress         |
| QuizAttempts | `/api/quiz-attempts` | Submit and review quiz attempts        |
| Ratings      | `/api/ratings`       | Rate courses                           |
| Complaints   | `/api/complaints`    | File / view complaints                 |

Sample auth flow:
- `POST /api/auth/send-otp` — send OTP to email
- `POST /api/auth/verify-otp` — verify OTP and create account
- `POST /api/auth/login` — get JWT cookie
- `POST /api/auth/logout` — clear JWT cookie
- `GET  /api/auth/me` — current user (requires auth)

---

## 7. Project Structure

```
backend/
├── app.js              # Express app, middleware, route mounting
├── server.js           # Entry point — loads env, starts HTTP listener
├── config/
│   └── dbConfig.js     # Reads env vars; central config object
├── controllers/        # Route handlers (one file per resource)
├── databases/
│   └── mongo.js        # Mongoose connect()
├── env/
│   ├── .env            # local secrets (git-ignored)
│   └── .env.example    # template — checked in
├── middlewares/
│   ├── auth.js         # JWT verification
│   └── authorize.js    # Role-based access (student/instructor/admin)
├── models/             # Mongoose schemas
├── routes/             # Route definitions
├── services/           # Business logic (auth, email, user)
├── utils/
│   └── logger.js
├── public/             # Static assets (currently empty)
├── views/              # Templates if needed (currently empty)
├── tests/              # Test files (currently empty)
├── package.json
└── README.md
```

---

## 8. Common Issues

- **"MongoNetworkError" / cannot connect**
  - Local Mongo: ensure the `mongod` service is running.
  - Atlas: whitelist your IP address (Network Access → Add IP).
- **"Invalid login: 535-5.7.8 Username and Password not accepted"** (Nodemailer)
  - You're using your normal Gmail password instead of an App Password. Generate an App Password and update `EMAIL_PASS`.
- **CORS errors from the frontend**
  - Make sure `FRONTEND_URL` matches the URL where the Vite dev server runs (default `http://localhost:5173`) and that the frontend sends requests with `credentials: "include"` so cookies work.
- **"JWT must be provided"**
  - The auth cookie is HTTP-only; the frontend must call the API with credentials enabled.

---

## 9. Scripts

| Script        | What it does                          |
| ------------- | ------------------------------------- |
| `npm run dev` | Start with `nodemon` (auto-reload)    |
| `npm start`   | Start in production mode (`node`)     |
| `npm test`    | Placeholder — no tests yet            |
