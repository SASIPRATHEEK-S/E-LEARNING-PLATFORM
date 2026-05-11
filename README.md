# E-Learning Platform

Full-stack e-learning web app: students enrol in courses, take quizzes, and track progress; instructors author courses & quizzes; admins manage users.

This repository is a **monorepo** containing two independent apps:

```
E-learning-platform/
├── backend/   # Node.js + Express + MongoDB REST API
└── e-app/     # React 19 + Vite frontend (SPA)
```

> Each folder has its **own README** with detailed setup, environment variables and troubleshooting:
> - [`backend/README.md`](backend/README.md)
> - [`e-app/README.md`](e-app/README.md)

---

## Features

- Email + OTP signup, JWT cookie-based login, role-based access (student / instructor / admin)
- Course creation, enrolment, lesson playback
- Quiz authoring, taking, analytics
- Student & instructor dashboards with charts
- Ratings and complaints workflow

---

## Prerequisites

| Tool      | Version | Notes                                            |
| --------- | ------- | ------------------------------------------------ |
| Node.js   | >= 18   | <https://nodejs.org/>                            |
| npm       | comes with Node                                  |
| MongoDB   | local install or free Atlas cluster              |
| Git       | any recent version                               |
| Gmail App Password | for OTP emails (Nodemailer)             |

---

## Quick start

```bash
# 1. Clone
git clone <repo-url>
cd E-learning-platform

# 2. Backend
cd backend
npm install
copy env\.env.example env\.env       # Windows
# cp env/.env.example env/.env       # macOS / Linux
# -> open env/.env and fill in values
npm run dev                           # http://localhost:5000

# 3. Frontend (in a NEW terminal)
cd ../e-app
npm install
copy .env.example .env                # Windows (optional — defaults work)
# cp .env.example .env                # macOS / Linux
npm run dev                           # http://localhost:5173
```

Open <http://localhost:5173> in your browser.

---

## Environment configuration

Two separate `.env` files — both **git-ignored**:

| File                     | Used by  | Template                  |
| ------------------------ | -------- | ------------------------- |
| `backend/env/.env`       | Backend  | `backend/env/.env.example` |
| `e-app/.env`             | Frontend | `e-app/.env.example`      |

**Backend variables** (full table in `backend/README.md`):
`PORT`, `NODE_ENV`, `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRE`, `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM`, `FRONTEND_URL`.

**Frontend variables** (full table in `e-app/README.md`):
`VITE_API_BASE_URL`, `VITE_APP_NAME`.

---

## Running both apps together

You need **two terminals**:

| Terminal | Folder   | Command       | URL                        |
| -------- | -------- | ------------- | -------------------------- |
| 1        | `backend`| `npm run dev` | <http://localhost:5000>    |
| 2        | `e-app`  | `npm run dev` | <http://localhost:5173>    |

CORS is configured so that the frontend at `http://localhost:5173` can call the backend at `http://localhost:5000` with cookies — change `FRONTEND_URL` in `backend/env/.env` if you run the frontend on a different port.

---

## Tech stack at a glance

**Backend:** Node.js, Express 5, MongoDB, Mongoose, JWT, bcryptjs, Nodemailer, cookie-parser, cors, dotenv.
**Frontend:** React 19, Vite 8, react-router-dom 7, Bootstrap 5, Bootstrap Icons, Animate.css, Recharts.

---

## Repository layout

```
E-learning-platform/
├── .gitignore
├── README.md                ← you are here
├── backend/
│   ├── .gitignore
│   ├── README.md
│   ├── env/
│   │   └── .env.example
│   ├── app.js   server.js
│   ├── config/  controllers/  databases/
│   ├── middlewares/  models/  routes/
│   ├── services/  utils/
│   └── package.json
└── e-app/
    ├── .gitignore
    ├── README.md
    ├── .env.example
    ├── index.html  vite.config.js
    ├── public/
    ├── src/
    │   ├── components/  pages/  context/
    │   ├── routes/  styles/  assets/
    │   ├── App.jsx  main.jsx
    │   └── App.css  index.css
    └── package.json
```

---

## Security notes (read before pushing)

- **Never commit secrets.** `.env` files are git-ignored. If a secret was ever committed (even in history), rotate it: change DB passwords, regenerate `JWT_SECRET`, revoke and reissue any Gmail App Passwords / API keys.
- Use a long random `JWT_SECRET` (>=32 chars). Generate with:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- For Gmail SMTP use an **App Password**, not your real Google password.
- Keep `node_modules/` out of the repo (the `.gitignore` handles this).

---

## Contributing

1. Create a branch off `main`.
2. Run `npm run lint` (frontend) before committing.
3. Open a PR against `main`.
