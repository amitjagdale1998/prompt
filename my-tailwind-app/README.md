# Prompt Lab Web App

Full-stack monorepo for the Prompt Lab platform: a Vite + React + Tailwind v4 + Ant Design v6 frontend backed by a hardened Express 5 + MongoDB API.

## Project structure

```
.
├── backend/                # Express 5 API
│   ├── src/
│   │   ├── app.js          # Express app: middleware, routes, error handlers
│   │   ├── index.js        # Server bootstrap + graceful shutdown
│   │   ├── db.js           # Mongoose connection
│   │   ├── config/env.js   # Zod-validated environment loader
│   │   ├── middleware/     # auth, asyncHandler, errorHandler, validate
│   │   ├── models/         # Mongoose schemas (User, Prompt, Media)
│   │   ├── routes/         # auth, admin, prompts, users
│   │   └── utils/jwt.js    # JWT sign/verify helpers
│   ├── uploads/            # Local upload storage (git-ignored)
│   └── .env.example
├── frontend/               # Vite + React 19 client
│   ├── src/
│   │   ├── App.jsx, main.jsx, index.css
│   │   ├── context/        # AuthContext
│   │   ├── pages/          # Route components
│   │   └── data/           # Static lookup data
│   ├── tailwind.config.js  # Tailwind v4 (loaded via @tailwindcss/vite)
│   └── vite.config.js
├── eslint.config.js        # Flat ESLint config for both workspaces
├── .prettierrc.json
└── package.json            # npm workspaces root
```

## Requirements

- Node.js 20+
- npm 10+
- MongoDB 6+ running locally or a connection string

## Local setup

```bash
# 1. Install workspace dependencies
npm install

# 2. Configure backend env
cp backend/.env.example backend/.env
# then edit backend/.env and set JWT_SECRET and ADMIN_REGISTRATION_CODE

# 3. Run both apps
npm run dev
# or run them individually:
npm run dev:frontend
npm run dev:backend
```

Frontend dev server: <http://localhost:4173>
Backend API: <http://localhost:5000>

## Environment variables (backend)

See [backend/.env.example](backend/.env.example) for the full list. The backend validates env at startup with Zod and exits with a clear message if anything is missing or invalid.

| Variable | Required | Notes |
| --- | --- | --- |
| `MONGODB_URI` | yes | Mongo connection string |
| `JWT_SECRET` | yes | Min 16 chars |
| `ADMIN_REGISTRATION_CODE` | yes | Min 8 chars; required to register admin accounts |
| `CORS_ORIGIN` | no | Comma-separated allowlist (default `http://localhost:4173`) |
| `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX` | no | Global API rate limit |

## Security baseline

- `helmet` for security headers
- `express-rate-limit` globally on `/api` and tighter on `/api/auth`
- `express-mongo-sanitize` to strip NoSQL injection operators
- Strict CORS allowlist
- bcrypt cost 12 for password hashing
- JWT secret enforced at startup (no insecure fallback)
- Admin uploads gated by `requireAuth` + `requireRole('admin')`
- Multer file size, count, and MIME-type whitelist
- Centralized error handler — stack traces only in non-production

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Run frontend and backend concurrently |
| `npm run dev:frontend` | Frontend only |
| `npm run dev:backend` | Backend only |
| `npm run build` | Production build of frontend |
| `npm run lint` | ESLint across the monorepo |
| `npm run format` | Prettier write |

## Documentation

- [requirements.md](requirements.md) — product + monetization requirements
- [SYSTEM_DESIGN.md](SYSTEM_DESIGN.md) — architecture and flows
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) — REST API reference
