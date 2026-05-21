# Prompt Lab Web App

A modern React + Tailwind + Ant Design frontend with a Node.js + Express backend.

## Project structure

- `frontend/` — Vite + React + Tailwind + Ant Design app
- `backend/` — Express API with router structure for admin, prompts, and users

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start frontend and backend separately:
   ```bash
   npm run dev:frontend
   npm run dev:backend
   ```

## Backend MongoDB

The backend uses MongoDB via Mongoose. Create a `.env` file in `backend/` or set `MONGODB_URI` in your environment.

Example `.env` (see `backend/.env.example`):

```env
MONGODB_URI=mongodb://127.0.0.1:27017/promptlab
PORT=5000
```

To install backend dependencies (from project root) using Windows CMD if needed:

```bash
cd "d:\my  projects\my-tailwind-app"
npm install --workspace backend
```

To preview the static templates without running the React app:

```bash
# from project root
npx serve frontend/templates
```

## Goals

- Technical prompt marketplace for audio editing, document editing, image generation, and AI prompt quality checks.
- Admin dashboard for uploading prompt content, images, videos, and SEO metadata.
- User dashboard for browsing prompt collections and trialing AI prompt workflows.
- Registered users can upload prompts and manage them by account.
- Special focus on photo editing prompts and AI tool version recommendations.

## System design and documentation

For architecture, flow diagrams, auth flow, and AI tool guidance, see `SYSTEM_DESIGN.md`.
