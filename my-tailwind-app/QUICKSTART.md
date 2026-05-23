# Prompt Lab - Quick Start Guide

Get up and running with Prompt Lab in 5 minutes!

---

## ⚡ 30-Second Setup

```bash
# 1. Install dependencies
npm install

# 2. Start both servers
npm run dev
```

**That's it!** Open [http://localhost:4173](http://localhost:4173) in your browser.

---

## 🎯 First 5 Minutes

### Step 1: Explore Home Page (1 min)
Visit [http://localhost:4173/](http://localhost:4173/)

See the platform overview and featured content.

### Step 2: Browse Prompts (1 min)
Go to [Prompt Gallery](http://localhost:4173/prompts)

Scroll through available prompts without logging in.

### Step 3: Read Guides (1 min)
Check out:
- [Prompt Writing Guide](http://localhost:4173/prompt-guide)
- [Video Tutorials](http://localhost:4173/video-guide)

### Step 4: Create Account (2 min)
1. Click [Register](http://localhost:4173/register)
2. Enter name, email, password
3. Go to [Verify Account](http://localhost:4173/verify)
4. Enter any OTP (in dev mode, any number works)
5. ✅ You're ready to upload prompts!

---

## 📚 Full Documentation

| Guide | Best For | Read Time |
|-------|----------|-----------|
| **[README.md](./README.md)** | Project overview | 5 min |
| **[USER_GUIDE.md](./USER_GUIDE.md)** | Users: features & workflow | 10 min |
| **[ADMIN_GUIDE.md](./ADMIN_GUIDE.md)** | Admins: management tasks | 15 min |
| **[SITEMAP.md](./SITEMAP.md)** | All pages & navigation | 5 min |
| **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** | API endpoints & examples | 10 min |
| **[SYSTEM_DESIGN.md](./SYSTEM_DESIGN.md)** | Architecture & flows | 15 min |

---

## 🎨 Key Pages at a Glance

### Public Pages (No Login)
```
Home                  → http://localhost:4173/
Prompt Gallery        → http://localhost:4173/prompts
Prompt Guide          → http://localhost:4173/prompt-guide
Video Guide           → http://localhost:4173/video-guide
```

### User Pages (After Login)
```
Login                 → http://localhost:4173/login
Register              → http://localhost:4173/register
User Dashboard        → http://localhost:4173/user
Upload Prompts        → Available in User Dashboard
```

### Admin Pages (Admin Login)
```
Admin Login           → http://localhost:4173/admin/login
Admin Register        → http://localhost:4173/admin/register (requires code)
Admin Dashboard       → http://localhost:4173/admin
Manage All Prompts    → Available in Admin Dashboard
Upload Media          → Available in Admin Dashboard
```

---

## 🔧 Environment Setup

### Backend .env
The file `.env` has been created with default development settings:

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/promptlab
JWT_SECRET=your_super_secret_jwt_key_min_16_chars_long_12345678
JWT_EXPIRES_IN=7d
ADMIN_REGISTRATION_CODE=admincode123
```

**⚠️ Production Setup**:
- Change `JWT_SECRET` to a secure random value
- Change `ADMIN_REGISTRATION_CODE`
- Update `CORS_ORIGIN` to your domain
- Set `NODE_ENV=production`

---

## 🚀 Common Tasks

### 1️⃣ Upload Your First Prompt
1. Register at [http://localhost:4173/register](http://localhost:4173/register)
2. Verify your email
3. Login at [http://localhost:4173/login](http://localhost:4173/login)
4. Go to [User Dashboard](http://localhost:4173/user)
5. Click "Upload New Prompt"
6. Fill in title, category, description, and prompt text
7. Submit! 🎉

### 2️⃣ Access Admin Panel
1. Create admin account at [http://localhost:4173/admin/register](http://localhost:4173/admin/register)
   - Use admin code: `admincode123`
2. Verify your email
3. Login at [http://localhost:4173/admin/login](http://localhost:4173/admin/login)
4. Access [Admin Dashboard](http://localhost:4173/admin)
5. Manage prompts, users, and media

### 3️⃣ Upload Media (Images/Videos)
1. Go to [Admin Dashboard](http://localhost:4173/admin)
2. Find "Media Upload" section
3. Select image or video file
4. Optionally link to a prompt
5. Upload! ✅

### 4️⃣ Browse & Copy Prompts
1. No login needed!
2. Visit [Prompt Gallery](http://localhost:4173/prompts)
3. Click on any prompt
4. Click "Copy Prompt" button
5. Paste into your AI tool

---

## 🎯 Features Checklist

### User Features ✅
- [x] Browse public prompts
- [x] Register & verify email
- [x] Login & authentication
- [x] Upload prompts
- [x] View your prompts
- [x] Track copy counts
- [x] Dark/light mode
- [x] Learning guides

### Admin Features ✅
- [x] Manage all prompts
- [x] Upload images & videos
- [x] Manage users
- [x] View analytics
- [x] Moderate content
- [x] Bulk operations
- [x] Export data

### Technical Features ✅
- [x] React 19 + Vite
- [x] Tailwind CSS v4
- [x] Ant Design UI
- [x] Express 5 backend
- [x] MongoDB database
- [x] JWT authentication
- [x] Rate limiting
- [x] Error handling

---

## 🐛 Troubleshooting

### "Invalid Version" Error on npm install?
Clear npm cache and reinstall:
```bash
npm cache clean --force
rm -r node_modules package-lock.json
npm install
```

### Backend won't start?
Check MongoDB is running:
```bash
# Windows
net start MongoDB

# Mac/Linux
brew services start mongodb-community
```

### Can't login to admin?
Make sure:
1. You used admin registration code: `admincode123`
2. You verified your email
3. Your role is "admin" in the database

### OTP verification issues?
In development mode, any OTP works. Just enter any 6-digit number.

### Port 5000 already in use?
Change port in `backend/.env`:
```
PORT=5001
```

---

## 📖 Learning Path

**New to Prompt Lab?** Follow this path:

1. **5 min**: Read [README.md](./README.md)
2. **10 min**: Explore [Home](http://localhost:4173/) & [Gallery](http://localhost:4173/prompts)
3. **5 min**: Read [SITEMAP.md](./SITEMAP.md)
4. **10 min**: Read [USER_GUIDE.md](./USER_GUIDE.md)
5. **5 min**: Create account & upload a prompt
6. **10 min**: Read [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) (if admin)
7. **15 min**: Explore [Admin Dashboard](http://localhost:4173/admin)

**Total Time**: ~1 hour to be fully functional

---

## 🔗 All Links in One Place

### Documentation
- [README](./README.md) - Project overview
- [User Guide](./USER_GUIDE.md) - User documentation
- [Admin Guide](./ADMIN_GUIDE.md) - Admin documentation
- [Sitemap](./SITEMAP.md) - Site navigation
- [API Docs](./API_DOCUMENTATION.md) - REST API reference
- [System Design](./SYSTEM_DESIGN.md) - Architecture overview

### Frontend Pages
- [Home](http://localhost:4173/)
- [Prompt Gallery](http://localhost:4173/prompts)
- [Prompt Guide](http://localhost:4173/prompt-guide)
- [Video Guide](http://localhost:4173/video-guide)
- [User Login](http://localhost:4173/login)
- [User Register](http://localhost:4173/register)
- [User Dashboard](http://localhost:4173/user)
- [Admin Login](http://localhost:4173/admin/login)
- [Admin Register](http://localhost:4173/admin/register)
- [Admin Dashboard](http://localhost:4173/admin)

### Backend API
- [Base URL](http://localhost:5000/api)
- [Auth Routes](./API_DOCUMENTATION.md#auth-apis)
- [Prompt Routes](./API_DOCUMENTATION.md)
- [User Routes](./API_DOCUMENTATION.md)
- [Admin Routes](./ADMIN_GUIDE.md#api-endpoints-reference)

---

## 💡 Tips & Tricks

✅ **Copy Keyboard Shortcut**: Select prompt → Copy button appears  
✅ **Dark Mode**: Click sun/moon icon (top right)  
✅ **Quick Upload**: Use "Upload Prompt" in User Dashboard  
✅ **Admin Tips**: Check [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) for advanced features  
✅ **API Testing**: Use Postman or curl with Bearer token  

---

## 🆘 Need Help?

Check these in order:
1. **Quick issue?** → [Troubleshooting](#-troubleshooting) above
2. **Feature question?** → [USER_GUIDE.md](./USER_GUIDE.md)
3. **Admin question?** → [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)
4. **API question?** → [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
5. **Architecture question?** → [SYSTEM_DESIGN.md](./SYSTEM_DESIGN.md)

---

**Status**: ✅ Ready to use!  
**Version**: 0.2.0  
**Last Updated**: May 2026  

**Happy prompting! 🚀**
