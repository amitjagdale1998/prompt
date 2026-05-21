# Prompt Lab API Documentation

## Base URL

- Local development: `http://localhost:5000/api`

---

## Auth APIs

### POST /api/auth/register
Create a new user account.

Request body:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "secret123"
}
```

Response:
```json
{
  "success": true,
  "message": "Account created. Verify your email using the token sent to your inbox.",
  "verificationToken": "abc123xyz",
  "user": {
    "id": "...",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "user",
    "isVerified": false
  }
}
```

### POST /api/auth/login
Authenticate an existing user.

Request body:
```json
{
  "email": "jane@example.com",
  "password": "secret123"
}
```

Response:
```json
{
  "success": true,
  "token": "jwt.token.here",
  "user": {
    "id": "...",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "user",
    "isVerified": true
  }
}
```

### POST /api/auth/verify
Verify a new user account by token.

Request body:
```json
{
  "token": "abc123xyz"
}
```

Response:
```json
{
  "success": true,
  "message": "Email verified successfully. You can now login.",
  "user": {
    "id": "...",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "user",
    "isVerified": true
  }
}
```

### POST /api/auth/logout
Invalidate the current client session (frontend can clear stored token).

Response:
```json
{
  "success": true,
  "message": "Logged out successfully."
}
```

---

## Admin APIs

### GET /api/admin

Returns the admin dashboard summary.

Response:
```json
{
  "dashboard": {
    "prompts": 42,
    "mediaAssets": 18,
    "tags": 12
  }
}
```

### POST /api/admin/upload-files

Upload prompt text, multiple images, and an optional prompt PDF. Images are stored as prompt media, and PDF text is extracted into prompt content when prompt text is not supplied.

Form fields:
- `title` (optional)
- `category` (optional)
- `description` (optional)
- `promptText` (optional if PDF is uploaded)
- `images` (multiple image files)
- `promptPdf` (single PDF file)

Response:
```json
{
  "success": true,
  "message": "Upload completed successfully.",
  "prompt": {
    "id": "...",
    "title": "Prompt title",
    "category": "Image Editing",
    "description": "Prompt text or PDF text extract"
  },
  "media": [
    {
      "id": "...",
      "promptId": "...",
      "type": "current-image",
      "url": "/uploads/image1.png"
    },
    {
      "id": "...",
      "promptId": "...",
      "type": "prompt-pdf",
      "url": "/uploads/prompts.pdf"
    }
  ]
}
```

---

## Prompt APIs

### GET /api/prompts

Return all prompt definitions.

Response:
```json
[
  {
    "id": 1,
    "title": "AI Document Rewrite",
    "category": "Document Editing",
    "description": "Convert technical documentation into clearer, user-friendly writing."
  },
  {
    "id": 2,
    "title": "Audio Cleanup Prompt",
    "category": "Audio Editing",
    "description": "Enhance voice clarity and remove background noise for podcasts and clips."
  }
]
```

### GET /api/prompts/:id

Return a single prompt by ID.

Response:
```json
{
  "id": 1,
  "title": "AI Document Rewrite",
  "category": "Document Editing",
  "description": "Convert technical documentation into clearer, user-friendly writing."
}
```

### POST /api/prompts/upload-text

Upload new prompt text for the prompt library. Requires authentication in the `Authorization: Bearer <token>` header.

Request body:
```json
{
  "promptText": "Rewrite this user guide for a non-technical audience.",
  "category": "Document Editing",
  "description": "A prompt for rewriting technical documentation into plain language."
}
```

Response:
```json
{
  "success": true,
  "message": "Prompt text uploaded successfully.",
  "prompt": {
    "id": 3,
    "title": "Rewrite this user guide for a non-technical audience.",
    "category": "Document Editing",
    "description": "A prompt for rewriting technical documentation into plain language.",
    "createdByName": "Jane Doe"
  }
}
```

### POST /api/prompts/upload-current-image

Upload the current source image for a prompt.

Request body:
```json
{
  "promptId": 2,
  "imageUrl": "https://example.com/source-image.png",
  "description": "Current image for the prompt flow."
}
```

Response:
```json
{
  "success": true,
  "message": "Current image uploaded successfully.",
  "media": {
    "id": 1,
    "promptId": 2,
    "imageUrl": "https://example.com/source-image.png",
    "description": "Current image for the prompt flow.",
    "type": "current-image",
    "createdAt": "2026-05-21T10:00:00.000Z"
  }
}
```

### POST /api/prompts/upload-ai-image

Store the AI-generated result image after prompt modification.

Request body:
```json
{
  "promptId": 2,
  "aiImageUrl": "https://example.com/ai-result-image.png",
  "notes": "Generated image after applying prompt changes."
}
```

Response:
```json
{
  "success": true,
  "message": "AI result image stored successfully.",
  "result": {
    "id": 1,
    "promptId": 2,
    "aiImageUrl": "https://example.com/ai-result-image.png",
    "notes": "Generated image after applying prompt changes.",
    "createdAt": "2026-05-21T10:00:00.000Z"
  }
}
```

### GET /api/prompts/media/:promptId

Return media uploads for a prompt.

Response:
```json
{
  "promptId": 2,
  "mediaItems": [
    {
      "id": 1,
      "promptId": 2,
      "imageUrl": "https://example.com/source-image.png",
      "description": "Current image for the prompt flow.",
      "type": "current-image",
      "createdAt": "2026-05-21T10:00:00.000Z"
    }
  ]
}
```

### POST /api/prompts/coding-review

Submit a code snippet and prompt goal for review.

Request body:
```json
{
  "codeSnippet": "const sum = arr.reduce((a, b) => a + b, 0);",
  "promptGoal": "Explain how this function computes the total.",
  "language": "javascript"
}
```

Response:
```json
{
  "success": true,
  "review": {
    "id": 1,
    "codeSnippet": "const sum = arr.reduce((a, b) => a + b, 0);",
    "promptGoal": "Explain how this function computes the total.",
    "language": "javascript",
    "analysis": "The prompt is clear and ready to use. Consider adding explicit examples and desired output format.",
    "quality": "high",
    "createdAt": "2026-05-21T10:00:00.000Z"
  }
}
```

### GET /api/prompts/coding-resources

Return coding prompt resources and guides.

Response:
```json
{
  "resources": [
    {
      "id": 1,
      "title": "AI coding prompt format",
      "url": "https://example.com/resources/coding-prompt"
    },
    {
      "id": 2,
      "title": "Debugging prompt templates",
      "url": "https://example.com/resources/debug-prompt"
    }
  ]
}
```

### GET /api/prompts/videos

Return the video library for prompt training and tutorials.

Response:
```json
[
  {
    "id": 1,
    "title": "Prompt Setup for AI Audio Editing",
    "description": "Learn how to write prompts that improve audio quality and transcription accuracy.",
    "url": "https://example.com/videos/audio-prompt-tutorial"
  },
  {
    "id": 2,
    "title": "Document Prompt Best Practices",
    "description": "A guide for creating effective prompt templates for documents and SEO content.",
    "url": "https://example.com/videos/document-prompt-guide"
  }
]
```

### GET /api/prompts/videos/:id

Return a single video entry by ID.

Response:
```json
{
  "id": 1,
  "title": "Prompt Setup for AI Audio Editing",
  "description": "Learn how to write prompts that improve audio quality and transcription accuracy.",
  "url": "https://example.com/videos/audio-prompt-tutorial"
}
```

---

## User APIs

### GET /api/users

Return the list of users.

Response:
```json
[
  { "id": 1, "name": "Jane Doe", "role": "user", "status": "active" },
  { "id": 2, "name": "Mark Smith", "role": "admin", "status": "active" }
]
```

### GET /api/users/:id

Return a single user by ID.

Response:
```json
{
  "id": 1,
  "name": "Jane Doe",
  "role": "user",
  "status": "active"
}
```
