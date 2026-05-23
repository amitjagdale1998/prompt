# Prompt Lab - Admin Guide

Complete guide for administrators managing the Prompt Lab platform. This covers prompt management, media uploads, user administration, and analytics.

---

## 🔐 Admin Access & Roles

### Admin Registration
To create an admin account, you need:
1. Valid admin registration code (set in `ADMIN_REGISTRATION_CODE` env variable)
2. Access to [Admin Register Page](http://localhost:4173/admin/register)

**Steps**:
1. Go to [http://localhost:4173/admin/register](http://localhost:4173/admin/register)
2. Enter Name, Email, Password
3. Enter Admin Registration Code
4. Click Register
5. Verify your email
6. Login at [http://localhost:4173/admin/login](http://localhost:4173/admin/login)

### Default Credentials (Development)
- **Admin Code**: `admincode123` (from .env)
- **Test Email**: admin@example.com
- **Test Password**: admin123456

---

## 📊 Admin Dashboard

**Route**: [http://localhost:4173/admin](http://localhost:4173/admin)

The admin dashboard provides centralized control over:
- Prompt management
- Media uploads and organization
- User account administration
- Analytics and statistics
- Platform configuration

---

## 📋 Prompt Management

### View All Prompts

**Dashboard Section**: "All Prompts"

Access all prompts on the platform:
```
GET http://localhost:5000/api/admin/prompts
Authorization: Bearer <admin_jwt_token>
```

**Display Information**:
- Prompt title and description
- Creator information
- Category
- Copy count / engagement metrics
- Upload date
- Status (approved/pending/flagged)

### Create Prompt (Admin)

**Route**: Admin Dashboard → "Create Prompt"

**Fields**:
- **Title** (required): Prompt name
- **Description** (required): What the prompt does
- **Category** (required): Classification
- **Prompt Text** (required): The actual prompt content
- **Tags** (optional): SEO and filtering tags
- **Featured** (optional): Mark as featured/highlighted

**Endpoint**:
```
POST http://localhost:5000/api/admin/prompts
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

{
  "title": "Product Description Generator",
  "description": "Generate SEO-friendly product descriptions",
  "category": "E-Commerce",
  "promptText": "You are a product description writer...",
  "tags": ["e-commerce", "seo", "marketing"]
}
```

### Edit Prompt

**Route**: Admin Dashboard → "Prompts" → Click Prompt → "Edit"

**Updateable Fields**:
- Title
- Description
- Category
- Prompt Text
- Tags
- Featured status

**Endpoint**:
```
PUT http://localhost:5000/api/admin/prompts/:id
Authorization: Bearer <admin_jwt_token>
```

### Delete Prompt

**Route**: Admin Dashboard → "Prompts" → Click Prompt → "Delete"

**Confirmation**: System will ask for confirmation

**Endpoint**:
```
DELETE http://localhost:5000/api/admin/prompts/:id
Authorization: Bearer <admin_jwt_token>
```

---

## 🖼️ Media Management

### Supported Media Types

| Type | Formats | Max Size | Purpose |
|------|---------|----------|---------|
| **Images** | JPG, PNG, WebP, GIF | 5 MB | Prompt thumbnails, AI outputs |
| **Videos** | MP4, WebM | 50 MB | Tutorial videos, prompt demos |
| **Documents** | PDF, TXT | 10 MB | Prompt guides, instructions |

### Upload Media

**Route**: Admin Dashboard → "Media Upload"

**Steps**:
1. Click "Upload Media" button
2. Select file from computer
3. Choose media type
4. (Optional) Associate with prompt
5. Add tags for organization
6. Click "Upload"

**Endpoint**:
```
POST http://localhost:5000/api/admin/media/upload
Authorization: Bearer <admin_jwt_token>
Content-Type: multipart/form-data

Form Data:
- file: <binary_file>
- type: "image" | "video" | "document"
- promptId: <optional_prompt_id>
- tags: ["tag1", "tag2"]
```

### Organize Media

**Dashboard Section**: "Media Library"

**Features**:
- Browse all uploaded media
- Sort by type, date, size
- Search by filename or tags
- Preview images and videos
- Delete unused media

### Link Media to Prompts

1. **Upload** media to the platform
2. **Go to**: Prompt editing page
3. **Add**: Media section
4. **Select**: Media from library
5. **Save**: Prompt with attached media

**Result**: Media displays with prompt in gallery

---

## 👥 User Administration

### View All Users

**Route**: Admin Dashboard → "Users"

**Display**:
- User name and email
- Account creation date
- Verification status
- Role (user/admin)
- Prompt count
- Last login

**Endpoint**:
```
GET http://localhost:5000/api/admin/users
Authorization: Bearer <admin_jwt_token>
```

### User Details

**Route**: Admin Dashboard → "Users" → Click User

**Information**:
- Account profile
- Email verification status
- Uploaded prompts
- Copy count statistics
- Account activity log

### Manage User Role

**Route**: Admin Dashboard → User Details → "Change Role"

**Options**:
- User (regular user)
- Admin (elevated privileges)
- Moderator (future role)
- Banned (restrict access)

**Endpoint**:
```
PUT http://localhost:5000/api/admin/users/:id/role
Authorization: Bearer <admin_jwt_token>
Body: { role: "admin" | "user" | "banned" }
```

### Delete User Account

**Route**: Admin Dashboard → User Details → "Delete Account"

**Warning**: This action is irreversible

**Effect**:
- Deletes user account
- Optionally transfer/delete prompts
- Delete associated media

---

## 📊 Analytics & Statistics

### Dashboard Overview

**Section**: "Analytics"

**Key Metrics**:
- **Total Users**: Active user count
- **Total Prompts**: Prompts on platform
- **Total Copies**: All-time copy count
- **New Users This Month**: Registration trend
- **Most Popular Prompts**: Top 10 by copy count

### Prompt Analytics

**Route**: Admin Dashboard → "Prompt Stats"

**Metrics per Prompt**:
- View count
- Copy count
- Download count
- Rating/feedback
- Creator information
- Engagement trend

**Visualization**:
- Line charts for trends
- Bar charts for comparisons
- Pie charts for categories

### User Analytics

**Route**: Admin Dashboard → "User Stats"

**Metrics**:
- Total registered users
- Active users (last 30 days)
- Prompts per user (average)
- Upload frequency
- Account verification rate

### Export Data

**Route**: Admin Dashboard → "Reports" → "Export"

**Formats**:
- CSV (Excel compatible)
- JSON (API format)
- PDF (formatted report)

**Data Included**:
- User list with contact info
- Prompt catalog
- Analytics summary
- Activity logs

---

## 🏷️ Prompt Categories

### Available Categories

| Category | Use Case | Examples |
|----------|----------|----------|
| **Photo Editing** | Image manipulation prompts | "Enhance portrait lighting", "Remove background" |
| **Document Writing** | Text generation prompts | "Rewrite email", "Create proposal" |
| **Audio Processing** | Audio manipulation prompts | "Improve voice clarity", "Add music" |
| **Code Generation** | Programming prompts | "Write Python function", "Fix bug" |
| **Content Creation** | Marketing/writing prompts | "Write blog post", "Create social media" |
| **Analysis** | Data analysis prompts | "Analyze data trends", "Summarize text" |
| **Translation** | Language translation prompts | "Translate to Spanish", "Localize content" |

### Add Custom Category

**Development Task**: Modify frontend category list

**File**: `frontend/src/data/aiTools.js`

```javascript
const promptCategories = [
  "Photo Editing",
  "Document Writing",
  "Audio Processing",
  "Code Generation",
  "Content Creation",
  "Analysis",
  "Translation",
  "Your Custom Category" // Add here
];
```

---

## 🔍 Prompt Moderation

### Review Queue

**Route**: Admin Dashboard → "Moderation Queue"

**Status Types**:
- ✅ **Approved**: Published to gallery
- ⏳ **Pending**: Awaiting review
- ⚠️ **Flagged**: Marked for issues
- ❌ **Rejected**: Not published

### Flag Prompt

**Reasons**:
- Inappropriate content
- Copyright violation
- Spam or misleading
- Low quality
- Duplicate

**Action**: Mark as flagged with reason

**Endpoint**:
```
PUT http://localhost:5000/api/admin/prompts/:id/flag
Authorization: Bearer <admin_jwt_token>
Body: { reason: "spam" | "copyright" | "inappropriate" | "low-quality" | "duplicate" }
```

### Approve/Reject

1. **Review** prompt content
2. **Check** for quality and compliance
3. **Approve**: Publish to gallery
4. **Reject**: Remove from platform (notify creator)

---

## ⚙️ Platform Settings

### Environment Configuration

**File**: `backend/.env`

**Admin-related Settings**:
```
NODE_ENV=production          # Set to production when live
PORT=5000                    # API server port
ADMIN_REGISTRATION_CODE=***  # Change this regularly!
JWT_EXPIRES_IN=7d           # Token expiration
CORS_ORIGIN=*               # Allowed domains
RATE_LIMIT_MAX=1000         # Requests per window
```

### Security Configuration

**JWT Secret**:
- Regenerate regularly
- Store securely
- Never commit to version control

**CORS Settings**:
- Whitelist production domains
- Restrict to needed origins
- Prevent unauthorized access

**Rate Limiting**:
- Adjust based on traffic
- Protect from bot attacks
- Maintain user experience

---

## 🚨 Common Admin Tasks

### Bulk Upload Prompts

**Method 1: Via Dashboard**
1. Go to Admin Dashboard
2. Click "Bulk Upload"
3. Upload CSV file with columns:
   - title
   - description
   - category
   - promptText
   - tags

**Method 2: Via API**
```
POST http://localhost:5000/api/admin/prompts/bulk
Authorization: Bearer <admin_jwt_token>
Body: [ { title, description, ... }, ... ]
```

### Reset User Password

**Route**: Admin Dashboard → Users → Select User → "Reset Password"

**Options**:
- Send reset link to email
- Set temporary password
- Require change on next login

### Backup Database

**Backup Prompts**:
```bash
mongoexport --db promptlab --collection prompts --out prompts-backup.json
```

**Backup Users**:
```bash
mongoexport --db promptlab --collection users --out users-backup.json
```

### Monitor Server Health

**Checks**:
- Backend API responsiveness
- Database connection status
- File upload storage
- Error rate monitoring
- User activity logs

---

## 🔗 API Endpoints Reference

### Admin Prompts API

```
GET    /api/admin/prompts              # List all prompts
POST   /api/admin/prompts              # Create prompt
GET    /api/admin/prompts/:id          # Get prompt details
PUT    /api/admin/prompts/:id          # Update prompt
DELETE /api/admin/prompts/:id          # Delete prompt
PUT    /api/admin/prompts/:id/flag     # Flag prompt
```

### Admin Users API

```
GET    /api/admin/users                # List all users
GET    /api/admin/users/:id            # Get user details
PUT    /api/admin/users/:id/role       # Change user role
DELETE /api/admin/users/:id            # Delete user
```

### Admin Media API

```
POST   /api/admin/media/upload         # Upload media
GET    /api/admin/media                # List media
DELETE /api/admin/media/:id            # Delete media
```

---

## 📝 Audit Logging

### Access Logs

Tracked information:
- Admin login/logout
- Prompt create/edit/delete
- User role changes
- Media uploads
- Configuration changes

**Log Location**: `backend/logs/`

**Review Logs**:
```bash
# Recent admin actions
grep "admin" logs/activity.log

# User modifications
grep "DELETE /api/admin/users" logs/activity.log
```

---

## 🔒 Security Best Practices

✅ **Do's**:
- Change admin registration code regularly
- Use strong JWT_SECRET (min 32 characters)
- Rotate admin accounts periodically
- Review audit logs weekly
- Backup database regularly
- Update dependencies monthly
- Use HTTPS in production

❌ **Don'ts**:
- Share admin credentials
- Commit .env files to git
- Use predictable passwords
- Enable CORS for all origins
- Disable rate limiting
- Keep old backups unencrypted
- Expose internal API errors

---

## 📞 Admin Support

### Troubleshooting

**Can't Login to Admin Panel?**
- Verify your role is "admin"
- Check token expiration
- Clear browser cache/cookies

**Prompts Not Appearing?**
- Check prompt status (approved?)
- Verify category is valid
- Ensure createdBy is set

**Media Upload Failing?**
- Check file size limits
- Verify file format
- Ensure directory permissions
- Check disk space

### System Requirements

- **Node.js**: 24.0.0 or higher
- **MongoDB**: 6.0 or higher
- **Storage**: Minimum 50GB for media
- **RAM**: Minimum 2GB
- **Bandwidth**: Adequate for file uploads

---

**Last Updated**: May 2026  
**Version**: 0.2.0  
**Role**: Administrator  
