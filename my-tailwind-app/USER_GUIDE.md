# Prompt Lab - User Guide

Welcome to **Prompt Lab**, a comprehensive platform for discovering, sharing, and managing AI prompts. This guide covers all features available to users and administrators.

---

## 🌐 Website Overview

Prompt Lab is a full-stack web application designed to:
- ✨ Discover curated AI prompts for various use cases
- 📤 Upload and share your own prompts with the community
- 👥 Manage user accounts with email verification
- 🎬 Access video guides and learning resources
- 🛠️ Provide admin tools for prompt management and moderation

**Live Environment**: `http://localhost:4173` (Frontend)  
**API Server**: `http://localhost:5000/api` (Backend)

---

## 📍 Navigation & Page Links

### Public Pages (No Login Required)

| Page | Route | Purpose |
|------|-------|---------|
| **Home** | `http://localhost:4173/` | Landing page with overview of Prompt Lab features |
| **Prompt Gallery** | `http://localhost:4173/prompts` | Browse all available prompts by category |
| **Prompt Guide** | `http://localhost:4173/prompt-guide` | Learn how to write effective prompts |
| **Video Guide** | `http://localhost:4173/video-guide` | Watch tutorial videos for prompt usage |

### Authentication Pages

| Page | Route | Purpose |
|------|-------|---------|
| **User Login** | `http://localhost:4173/login` | Login to your user account |
| **User Register** | `http://localhost:4173/register` | Create a new user account |
| **Verify Account** | `http://localhost:4173/verify` | Verify your email after registration |
| **Admin Login** | `http://localhost:4173/admin/login` | Login to admin panel |
| **Admin Register** | `http://localhost:4173/admin/register` | Create an admin account (requires code) |

### Protected Pages (Login Required)

| Page | Route | Required Role | Purpose |
|------|-------|---|---------|
| **User Dashboard** | `http://localhost:4173/user` | User/Admin | View uploaded prompts, profile settings |
| **Admin Dashboard** | `http://localhost:4173/admin` | Admin Only | Upload prompts, manage media, view analytics |

---

## 👤 User Account Management

### Registration Flow
1. **Go to**: [Register Page](http://localhost:4173/register)
2. **Enter**:
   - Full Name (2-100 characters)
   - Email Address
   - Password (minimum 8 characters)
3. **Click**: Register Button
4. **Receive**: Verification token
5. **Go to**: [Verify Account Page](http://localhost:4173/verify)
6. **Enter**: Verification token (in development, any OTP works)
7. **Success**: Account verified and ready to use

### Admin Registration
1. **Go to**: [Admin Register Page](http://localhost:4173/admin/register)
2. **Enter**: Name, Email, Password
3. **Enter**: Admin Registration Code (available from system administrator)
4. **Click**: Register Button
5. **Follow**: Same verification flow as users

---

## 🔐 Authentication & Security

- **JWT Tokens**: All authenticated requests use JWT bearer tokens
- **Token Expiration**: Default 7 days (configurable)
- **Password Security**: Passwords hashed with bcryptjs (12 salt rounds)
- **Email Verification**: Required before first login
- **Rate Limiting**: API endpoints rate-limited to prevent abuse
- **CORS Protected**: Backend secured with CORS policy

**Token Usage**:
```
Authorization: Bearer <your_jwt_token>
```

---

## 📚 Prompt Gallery

### Browse Prompts
1. **Go to**: [Prompt Gallery](http://localhost:4173/prompts)
2. **Features**:
   - View all public prompts
   - Filter by category
   - Search prompts by keywords
   - View prompt details and creator info

### Prompt Information
Each prompt displays:
- **Title**: Prompt name
- **Description**: What the prompt does
- **Category**: Type of prompt (e.g., Photo Editing, Document Rewriting, etc.)
- **Creator**: User who uploaded the prompt
- **Copy Count**: How many times the prompt was copied
- **Usage**: Instructions for using the prompt with AI tools

### Copy & Use
1. Click **Copy Prompt** button
2. Paste into your favorite AI tool (ChatGPT, Claude, Midjourney, etc.)
3. View count is automatically tracked

---

## 📤 Uploading Prompts (User)

### Access Upload Feature
1. **Login**: Go to [User Login](http://localhost:4173/login)
2. **Navigate**: Click "User Dashboard" in sidebar
3. **Click**: "Upload New Prompt" button

### Upload Prompt Details
1. **Prompt Title** (required): Name of your prompt
2. **Category** (required): Select from:
   - Photo Editing
   - Document Rewriting
   - Audio Cleanup
   - Code Review
   - General AI
   - Custom

3. **Description** (required): Explain what the prompt does
4. **Prompt Text** (required): The actual prompt content

### After Upload
- Prompt appears in public gallery
- You can view it in your User Dashboard
- Copy count is tracked
- Appears in admin moderation queue

---

## 🎯 User Dashboard

### Features
- **View My Prompts**: List of all prompts you've uploaded
- **Prompt Analytics**: See copy counts and usage stats
- **Edit Profile**: Update your name and account info
- **Logout**: Sign out of your account

### Prompt Management
- View all your uploaded prompts
- See engagement metrics (copy count)
- Delete your own prompts
- Update prompt details

---

## 👨‍💼 Admin Dashboard

### Admin Capabilities
- 📋 Manage all prompts (view, edit, delete)
- 🖼️ Upload and manage media files
- 📊 View analytics and statistics
- 👥 Manage user accounts
- 🔧 Configure system settings

### Access Admin Panel
1. **Login**: Go to [Admin Login](http://localhost:4173/admin/login)
2. **Navigate**: Click "Admin Panel" in sidebar
3. **Secured**: Only accessible with admin JWT token

---

## 📸 Media Management (Admin)

### Upload Prompts with Media
The Admin Dashboard supports uploading:
- **Prompt Images**: Thumbnail or example images
- **AI Result Images**: Sample outputs from AI tools
- **Video Previews**: Demo videos of prompt usage

### Supported Formats
- **Images**: JPG, PNG, WebP, GIF (max 5MB)
- **Videos**: MP4, WebM (max 50MB)
- **Storage**: Local file uploads in `backend/uploads/`

### Upload Process (Admin)
1. **Go to**: Admin Dashboard
2. **Click**: "Upload Media" section
3. **Select**: Media file from computer
4. **Associate**: Link to prompt if needed
5. **Save**: Media stored and available for prompts

---

## 🎓 Learning Resources

### Prompt Guide
**Route**: [Prompt Guide](http://localhost:4173/prompt-guide)

Learn the fundamentals:
- ✍️ How to write effective prompts
- 🎯 Best practices for AI tools
- 📝 Prompt structure and formatting
- 🔍 Tips for better results

### Video Guide
**Route**: [Video Guide](http://localhost:4173/video-guide)

Watch tutorials on:
- 🎬 Getting started with Prompt Lab
- 🛠️ Using prompts with different AI tools
- 📊 Tracking prompt performance
- 💡 Advanced prompt techniques

---

## 🏠 Home Page Features

**Route**: [Home](http://localhost:4173/)

The landing page includes:
- Platform overview
- Key features showcase
- Quick access to popular prompts
- Links to learning resources
- Call-to-action buttons for registration

---

## 🌙 Dark Mode & Theme

- **Toggle**: Click the Sun/Moon icon in the header
- **Persistent**: Theme preference saved in local storage
- **Pages**: Works across all pages
- **Accessibility**: High contrast for dark and light modes

---

## 🔗 API Endpoints for Developers

### Public Endpoints

**Get All Prompts**
```
GET http://localhost:5000/api/prompts
```

**Get Single Prompt**
```
GET http://localhost:5000/api/prompts/:id
```

### Authentication Endpoints

**Register User**
```
POST http://localhost:5000/api/auth/register
Body: { name, email, password }
```

**Login**
```
POST http://localhost:5000/api/auth/login
Body: { email, password }
```

**Verify Email**
```
POST http://localhost:5000/api/auth/verify
Body: { token }
```

### Protected Endpoints (Requires JWT Token)

**Upload Prompt**
```
POST http://localhost:5000/api/prompts/upload-text
Headers: Authorization: Bearer <jwt_token>
Body: { title, category, description, promptText }
```

**Get User Prompts**
```
GET http://localhost:5000/api/users/me
Headers: Authorization: Bearer <jwt_token>
```

**Admin: List All Users**
```
GET http://localhost:5000/api/admin/users
Headers: Authorization: Bearer <admin_jwt_token>
```

**Admin: Delete Prompt**
```
DELETE http://localhost:5000/api/admin/prompts/:id
Headers: Authorization: Bearer <admin_jwt_token>
```

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference.

---

## 🚀 Getting Started

### For New Users

1. **Browse**: [Prompt Gallery](http://localhost:4173/prompts) (no login needed)
2. **Learn**: [Prompt Guide](http://localhost:4173/prompt-guide)
3. **Watch**: [Video Guide](http://localhost:4173/video-guide)
4. **Register**: [Create Account](http://localhost:4173/register)
5. **Verify**: Complete email verification
6. **Upload**: Share your own prompts
7. **Explore**: Discover community prompts

### For Administrators

1. **Create**: Admin account with registration code
2. **Login**: [Admin Login](http://localhost:4173/admin/login)
3. **Manage**: Access [Admin Dashboard](http://localhost:4173/admin)
4. **Upload**: Add prompts and media
5. **Moderate**: Review user submissions
6. **Analyze**: View usage statistics

---

## 🛠️ Troubleshooting

### Can't Login?
- Verify your email address first via the verify page
- Check that NODE_ENV is set to `development`
- Ensure backend server is running on port 5000

### Can't Upload Prompts?
- Make sure you're logged in
- Check that user role is set correctly
- Verify JWT token is valid

### Admin Access Denied?
- Confirm you registered with valid admin code
- Check your user role in the database
- Ensure authentication token hasn't expired

### Media Upload Not Working?
- Check file size limits (5MB for images, 50MB for videos)
- Verify file format is supported
- Ensure `/backend/uploads/` directory exists and is writable

---

## 📞 Support & Contact

For issues or feature requests:
- 📧 Email admin for technical support
- 🐛 Report bugs with detailed error messages
- 💡 Suggest features in the feedback section

---

## 📋 Summary Table

| Feature | Users | Admins | Public |
|---------|-------|--------|--------|
| Browse Prompts | ✅ | ✅ | ✅ |
| Upload Prompts | ✅ | ✅ | ❌ |
| Manage Own Prompts | ✅ | ✅ | ❌ |
| Manage All Prompts | ❌ | ✅ | ❌ |
| Upload Media | ❌ | ✅ | ❌ |
| View Analytics | ✅ | ✅ | ❌ |
| Manage Users | ❌ | ✅ | ❌ |
| Delete Prompts | ✅ (own) | ✅ (all) | ❌ |

---

**Last Updated**: May 2026  
**Version**: 0.2.0  
**Platform**: Prompt Lab Web App
