# Prompt Lab Web App

Full-stack monorepo for the Prompt Lab platform: a Vite + React + Tailwind v4 + Ant Design v6 frontend backed by a hardened Express 5 + MongoDB API.

> 💡 **New to Prompt Lab?** Start with [QUICKSTART.md](QUICKSTART.md) for a 5-minute setup!

---

## 📚 Documentation

Choose your guide based on your role:

| Document | For | Reading Time |
|----------|-----|--------------|
| **[QUICKSTART.md](QUICKSTART.md)** | Everyone - Get started fast | ⚡ 5 min |
| **[USER_GUIDE.md](USER_GUIDE.md)** | Users - All features & pages | 📖 10 min |
| **[ADMIN_GUIDE.md](ADMIN_GUIDE.md)** | Admins - Management & uploads | 🛠️ 15 min |
| **[SITEMAP.md](SITEMAP.md)** | Developers - All pages & flows | 🗺️ 5 min |
| **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** | Developers - API endpoints | 📡 10 min |
| **[SYSTEM_DESIGN.md](SYSTEM_DESIGN.md)** | Architects - System overview | 🏗️ 15 min |

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

## Documentation & Guides

### 📖 User & Admin Documentation
- **[USER_GUIDE.md](USER_GUIDE.md)** — Complete user guide with all features and page links
- **[ADMIN_GUIDE.md](ADMIN_GUIDE.md)** — Administrator guide for prompt & media management
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** — REST API reference for developers

### 🏗️ Technical Documentation
- **[SYSTEM_DESIGN.md](SYSTEM_DESIGN.md)** — Architecture, flows, and system overview
- **[requirements.md](requirements.md)** — Product requirements and features

---

## 🌐 Quick Navigation - All Website Pages

### Public Pages (No Login)
| Page | URL | Purpose |
|------|-----|---------|
| Home | `http://localhost:4173/` | Landing page |
| Prompt Gallery | `http://localhost:4173/prompts` | Browse all prompts |
| Prompt Guide | `http://localhost:4173/prompt-guide` | Learn prompt writing |
| Video Guide | `http://localhost:4173/video-guide` | Watch tutorials |

### Authentication Pages
| Page | URL | Purpose |
|------|-----|---------|
| User Login | `http://localhost:4173/login` | User login |
| User Register | `http://localhost:4173/register` | Create user account |
| Verify Account | `http://localhost:4173/verify` | Verify email |
| Admin Login | `http://localhost:4173/admin/login` | Admin login |
| Admin Register | `http://localhost:4173/admin/register` | Create admin account |

### Protected Pages (Login Required)
| Page | URL | Role | Purpose |
|------|-----|------|---------|
| User Dashboard | `http://localhost:4173/user` | User | Manage your prompts |
| Admin Dashboard | `http://localhost:4173/admin` | Admin | Manage all prompts & users |

**👉 See [USER_GUIDE.md](USER_GUIDE.md) for detailed page descriptions and features**

---

## 🎯 Key Features

### 👤 For Users
- ✅ Browse public prompt gallery
- ✅ Create account with email verification
- ✅ Upload custom prompts with descriptions
- ✅ View your uploaded prompts
- ✅ Track prompt copy counts
- ✅ Access learning guides and videos
- ✅ Dark/Light theme toggle

### 🛠️ For Administrators
- ✅ Manage all prompts (create, edit, delete)
- ✅ Upload and organize media (images, videos)
- ✅ View user management dashboard
- ✅ Access analytics and statistics
- ✅ Moderate community prompts
- ✅ Bulk upload capabilities
- ✅ Export data and reports

**👉 See [ADMIN_GUIDE.md](ADMIN_GUIDE.md) for complete admin features**
