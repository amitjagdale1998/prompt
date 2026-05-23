# Prompt Lab - Site Map & Navigation

Complete visual guide to all pages and navigation flows in Prompt Lab.

---

## 📍 Site Structure

```
Prompt Lab (http://localhost:4173)
│
├─ PUBLIC PAGES (No Auth Required)
│  ├─ Home (/)
│  │  └─ Links to: Gallery, Guides, Login, Register
│  │
│  ├─ Prompt Gallery (/prompts)
│  │  ├─ Browse all public prompts
│  │  ├─ Filter by category
│  │  └─ Copy prompt text
│  │
│  ├─ Prompt Guide (/prompt-guide)
│  │  └─ Learn prompt writing basics
│  │
│  └─ Video Guide (/video-guide)
│     └─ Watch tutorial videos
│
├─ USER AUTHENTICATION PAGES
│  ├─ Login (/login)
│  │  ├─ Email & password login
│  │  └─ → User Dashboard if verified
│  │
│  ├─ Register (/register)
│  │  ├─ Create new user account
│  │  └─ → Verify Account page
│  │
│  └─ Verify Account (/verify)
│     ├─ Enter verification token/OTP
│     └─ → Ready to login
│
├─ ADMIN AUTHENTICATION PAGES
│  ├─ Admin Login (/admin/login)
│  │  └─ → Admin Dashboard if verified
│  │
│  └─ Admin Register (/admin/register)
│     ├─ Create admin account (requires code)
│     └─ → Verify Account page
│
└─ PROTECTED PAGES (Auth Required)
   ├─ User Dashboard (/user)
   │  ├─ View my prompts
   │  ├─ Upload new prompts
   │  ├─ View statistics
   │  └─ Manage profile
   │
   └─ Admin Dashboard (/admin)
      ├─ Manage all prompts
      ├─ Upload media (images, videos)
      ├─ User management
      ├─ View analytics
      └─ Moderation tools
```

---

## 🔗 Complete Page Links Reference

### HOME & PUBLIC SECTION

| Page | URL | Status | Features |
|------|-----|--------|----------|
| **Home** | `http://localhost:4173/` | Public | Platform overview, featured prompts, CTAs |
| **Prompt Gallery** | `http://localhost:4173/prompts` | Public | Browse, search, filter, copy prompts |
| **Prompt Guide** | `http://localhost:4173/prompt-guide` | Public | Tutorial on writing prompts |
| **Video Guide** | `http://localhost:4173/video-guide` | Public | Video tutorials and demos |

### AUTH SECTION - USER

| Page | URL | Action | Next Step |
|------|-----|--------|-----------|
| **Login** | `http://localhost:4173/login` | Sign in with email | → User Dashboard |
| **Register** | `http://localhost:4173/register` | Create account | → Verify Account |
| **Verify** | `http://localhost:4173/verify` | Enter OTP/token | → Can Login |

### AUTH SECTION - ADMIN

| Page | URL | Action | Requirements |
|------|-----|--------|--------------|
| **Admin Login** | `http://localhost:4173/admin/login` | Admin sign in | Admin user created |
| **Admin Register** | `http://localhost:4173/admin/register` | Create admin | Valid admin code |

### PROTECTED SECTION

| Page | URL | Role | Main Features |
|------|-----|------|----------------|
| **User Dashboard** | `http://localhost:4173/user` | User | View/manage prompts, profile |
| **Admin Dashboard** | `http://localhost:4173/admin` | Admin | Full platform management |

---

## 🎯 User Journey Flows

### New Visitor Flow
```
Home (/home)
  ↓
Browse Prompts (/prompts)
  ↓
Read Guides (/prompt-guide, /video-guide)
  ↓
Register (/register)
  ↓
Verify Email (/verify)
  ↓
Login (/login)
  ↓
User Dashboard (/user)
  ↓
Upload Prompts
```

### Returning User Flow
```
Home (/home)
  ↓
Login (/login)
  ↓
User Dashboard (/user)
  ↓
View My Prompts
  ↓
Upload New Prompt
```

### Admin Flow
```
Home (/home)
  ↓
Admin Login (/admin/login)
  ↓
Admin Dashboard (/admin)
  ├─ Manage Prompts
  ├─ Upload Media
  ├─ Manage Users
  └─ View Analytics
```

### First-Time Admin Setup
```
Admin Register (/admin/register)
  ↓ (with admin code)
Verify Account (/verify)
  ↓
Admin Login (/admin/login)
  ↓
Admin Dashboard (/admin)
  ↓
Upload Initial Prompts
```

---

## 🔄 Navigation Features

### Header Navigation Menu
```
┌─────────────────────────────────────────────┐
│ Prompt Lab Logo  | Home | Gallery | Profile │
└─────────────────────────────────────────────┘
```

**Menu Items** (Sidebar):
- 🏠 Home (/)
- 📚 Prompt Gallery (/prompts)
- 👤 User Dashboard (/user)
- 🛠️ Admin Panel (/admin)
- 📖 Prompt Guide (/prompt-guide)
- 🎥 Video Guide (/video-guide)

### Context-Based Navigation
- **Not Logged In**: Show Login/Register links
- **User Logged In**: Show User Dashboard, Logout
- **Admin Logged In**: Show Admin Dashboard, Logout

---

## 🏗️ Page Hierarchy

### Level 1: Public Gateway
```
┌─────────────────────────────────────────────┐
│                   HOME                      │
│         (Platform Introduction)             │
└──────────────────┬──────────────────────────┘
```

### Level 2: Public Exploration
```
┌──────────────────────────────────────────────┐
│  PROMPTS   │  GUIDES   │  LOGIN   │  REGISTER │
│  (Gallery) │  (Learn)  │  (Auth)  │  (Auth)   │
└──────────────────────────────────────────────┘
```

### Level 3: Protected Content (Users)
```
┌────────────────────────────────────────┐
│      USER DASHBOARD                    │
│  ├─ My Prompts                         │
│  ├─ Upload Prompt                      │
│  ├─ Statistics                         │
│  └─ Profile                            │
└────────────────────────────────────────┘
```

### Level 3: Protected Content (Admins)
```
┌──────────────────────────────────────────────────┐
│           ADMIN DASHBOARD                        │
│  ├─ All Prompts (Edit/Delete)                    │
│  ├─ Media Upload                                 │
│  ├─ User Management                             │
│  ├─ Analytics                                    │
│  ├─ Moderation                                   │
│  └─ Settings                                     │
└──────────────────────────────────────────────────┘
```

---

## 🔐 Access Control Matrix

| Page | Public | User | Admin | Notes |
|------|--------|------|-------|-------|
| Home | ✅ | ✅ | ✅ | Always accessible |
| Prompt Gallery | ✅ | ✅ | ✅ | View only for non-logged |
| Prompt Guide | ✅ | ✅ | ✅ | Educational content |
| Video Guide | ✅ | ✅ | ✅ | Educational content |
| User Login | ✅ | ❌ | ✅ | Redirect if already auth |
| User Register | ✅ | ❌ | ❌ | Redirect if already auth |
| Verify Account | ✅ | ✅ | ✅ | For new accounts |
| Admin Login | ✅ | ❌ | ❌ | Admin only |
| Admin Register | ✅ | ❌ | ❌ | Admin code required |
| User Dashboard | ❌ | ✅ | ✅ | Requires auth |
| Admin Dashboard | ❌ | ❌ | ✅ | Admin role required |

---

## 📱 Responsive Design

All pages are responsive and work on:
- **Desktop** (1920px+): Full sidebar + header
- **Tablet** (768px-1919px): Collapsible sidebar
- **Mobile** (320px-767px): Hamburger menu, single column

### Mobile Navigation
```
[≡] Prompt Lab          [👤]
────────────────────────────
│ Content (full width)  │
│                       │
└───────────────────────┘
```

---

## 🎨 Theme Support

All pages support:
- **Light Mode**: Bright background with dark text
- **Dark Mode**: Dark background with light text
- **Toggle**: Sun/Moon icon in header

**Persistent**: Theme preference saved in local storage

---

## 🔗 Deep Links & Bookmarking

All pages support direct URL bookmarking:
```
http://localhost:4173/prompts              # Gallery
http://localhost:4173/user                 # Dashboard (requires auth)
http://localhost:4173/admin                # Admin (requires admin)
http://localhost:4173/login                # Login form
http://localhost:4173/verify               # Verify email
```

---

## 🌐 API Endpoints Served

### Frontend Routes (Vite)
```
GET  /                      → Home page
GET  /prompts              → Prompt Gallery
GET  /prompt-guide         → Prompt writing guide
GET  /video-guide          → Video tutorials
GET  /user                 → User Dashboard (protected)
GET  /admin                → Admin Dashboard (protected)
GET  /login                → Login form
GET  /register             → Registration form
GET  /verify               → Email verification form
GET  /admin/login          → Admin login form
GET  /admin/register       → Admin registration form
```

### Backend Routes (Express)
```
POST   /api/auth/register          → User registration
POST   /api/auth/login             → User login
POST   /api/auth/verify            → Email verification

GET    /api/prompts                → Get all prompts (public)
POST   /api/prompts/upload-text    → Upload prompt (auth required)
POST   /api/prompts/:id/copy       → Track copy (optional auth)

GET    /api/users/me               → Get logged-in user (auth required)

GET    /api/admin/prompts          → List all prompts (admin required)
POST   /api/admin/prompts          → Create prompt (admin required)
PUT    /api/admin/prompts/:id      → Update prompt (admin required)
DELETE /api/admin/prompts/:id      → Delete prompt (admin required)

GET    /api/admin/users            → List all users (admin required)
PUT    /api/admin/users/:id        → Modify user (admin required)

POST   /api/admin/media/upload     → Upload media (admin required)
```

---

## 📊 Page Metrics

| Page | Load Type | Purpose | Audience |
|------|-----------|---------|----------|
| Home | Static | Discovery & onboarding | Everyone |
| Gallery | Dynamic | Browse & copy | Everyone |
| Guides | Static | Education | Everyone |
| Dashboard | Protected | Personal management | Logged-in users |
| Admin | Protected | Platform management | Admins only |

---

## 🎯 Quick Links Summary

**🏠 START HERE**: [Home](http://localhost:4173/)

**📚 LEARN MORE**:
- [User Guide](./USER_GUIDE.md) - Complete user documentation
- [Admin Guide](./ADMIN_GUIDE.md) - Administrator documentation
- [API Docs](./API_DOCUMENTATION.md) - REST API reference
- [System Design](./SYSTEM_DESIGN.md) - Architecture overview

**🚀 GET STARTED**:
1. [Browse Prompts](http://localhost:4173/prompts)
2. [Register Account](http://localhost:4173/register)
3. [Upload a Prompt](http://localhost:4173/user)

**⚙️ ADMIN ACCESS**:
1. [Admin Login](http://localhost:4173/admin/login)
2. [Admin Panel](http://localhost:4173/admin)
3. [Manage Prompts & Media](http://localhost:4173/admin)

---

**Last Updated**: May 2026  
**Version**: 0.2.0  
**Status**: ✅ Complete
