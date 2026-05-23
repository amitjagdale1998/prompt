# Admin Guide - Prompt Gallery Management

How to add, manage, and curate prompts with before/after images in the enhanced gallery.

---

## 📋 New Prompt Fields

The updated Prompt model now includes:

### Core Fields
- **Title** (required): Prompt name (max 200 chars)
- **Category** (required): Select from 10 categories
- **Description**: What the prompt does
- **Prompt Text**: The actual prompt content
- **Difficulty**: beginner / intermediate / advanced

### Media & Examples
- **Before Image**: Shows original state
- **After Image**: Shows result/transformation
- **Video URL**: Optional demo video
- **Media Description**: Explain the transformation

### Metadata
- **Use Cases**: 3-5 primary use cases
- **AI Tools**: Compatible tools (ChatGPT, Claude, etc.)
- **Tags**: 5-10 searchable tags
- **Rating**: 0-5 stars (auto-calculated from reviews)

---

## 🎨 Category Guide

### 1. Code Editing (💻)
**Purpose**: Prompt for code improvement, refactoring, debugging

**Before Image**: Messy code screenshot
**After Image**: Clean code screenshot

**Example**:
```
Title: Professional Code Refactoring
Before: Tangled nested loops, poor variable names
After: Refactored with helper functions, clear naming
```

**Use Cases**:
- Code review
- Performance optimization
- Debugging
- Best practices
- Documentation

**Tags**: code, refactoring, optimization, debugging, javascript

---

### 2. Image Editing (🎨)
**Purpose**: Prompts for image enhancement, generation, editing

**Before Image**: Raw/original photo
**After Image**: Enhanced/edited version

**Example**:
```
Title: Professional Portrait Enhancement
Before: Raw portrait with uneven lighting
After: Professionally retouched portrait
```

**Use Cases**:
- Professional photos
- Social media content
- Product images
- Headshots
- Marketing materials

**Tags**: image, portrait, enhancement, professional, editing

---

### 3. Document Writing (📄)
**Purpose**: Prompts for documentation, copywriting, content

**Before Image**: Raw text/notes
**After Image**: Formatted document

**Example**:
```
Title: Technical Documentation Generator
Before: Scattered technical notes
After: Organized, formatted documentation
```

**Use Cases**:
- API documentation
- User guides
- Blog posts
- Technical writing
- Content creation

**Tags**: documentation, writing, technical, seo, content

---

### 4. Audio Processing (🎵)
**Purpose**: Audio enhancement, cleanup, generation

**Before Image**: Noisy waveform
**After Image**: Clean waveform

**Example**:
```
Title: Audio Noise Removal & Enhancement
Before: Waveform with noise spikes
After: Clean, enhanced waveform
```

**Use Cases**:
- Podcast production
- Voiceover cleanup
- Audio restoration
- Music production
- Sound design

**Tags**: audio, noise, enhancement, podcast, professional

---

### 5. Marketing Content (📢)
**Purpose**: Sales copy, email, social media content

**Before Image**: Generic text
**After Image**: Engaging copy

**Example**:
```
Title: SEO-Optimized Product Description
Before: Basic product description
After: Sales-focused, SEO-rich description
```

**Use Cases**:
- Product descriptions
- Email campaigns
- Social media posts
- Sales pages
- Advertising copy

**Tags**: marketing, sales, seo, copywriting, ecommerce

---

### 6. Design & Branding (🎭)
**Purpose**: Design prompts, color palettes, branding

**Before Image**: Color examples
**After Image**: Cohesive palette

**Example**:
```
Title: Brand Identity Color Palette
Before: Random color assortment
After: Cohesive brand color palette
```

**Use Cases**:
- Brand guidelines
- Color selection
- Logo concepts
- Design consistency
- Visual identity

**Tags**: design, branding, colors, palette, identity

---

### 7. Data Analysis (📊)
**Purpose**: Data insights, trend analysis, reporting

**Before Image**: Raw data/table
**After Image**: Analysis/insights

**Example**:
```
Title: Sales Data Trend Analysis
Before: Spreadsheet of raw numbers
After: Trend analysis with insights
```

**Use Cases**:
- Business intelligence
- Data reporting
- Trend identification
- Pattern analysis
- Strategic insights

**Tags**: analysis, data, insights, reporting, business

---

### 8. Business (💼)
**Purpose**: Business workflows, emails, proposals

**Before Image**: Template/outline
**After Image**: Final document

**Example**:
```
Title: Email Campaign Copy Writer
Before: Generic email template
After: Persuasive, conversion-focused email
```

**Use Cases**:
- Email marketing
- Business proposals
- Client communications
- Meeting notes
- Contract templates

**Tags**: business, email, professional, communication, workflow

---

### 9. Educational (📚)
**Purpose**: Learning, tutorials, explanations

**Before Image**: Complex concept
**After Image**: Simplified explanation

**Example**:
```
Title: Technical Concept Simplifier
Before: Complex technical documentation
After: Simple, beginner-friendly explanation
```

**Use Cases**:
- Tutorials
- Explanations
- Learning materials
- Training content
- Study guides

**Tags**: education, learning, tutorial, explanation, beginner

---

## 📸 Image Guidelines

### Before Image Requirements
- **Size**: 300x200px or larger
- **Format**: JPG, PNG, or WebP
- **Content**: Show original/starting state
- **Quality**: Clear and recognizable
- **Purpose**: Demonstrate need for prompt

**Examples**:
```
✓ Raw code with issues
✓ Unedited photo
✓ Rough notes
✓ Noisy audio waveform
✓ Generic template
```

### After Image Requirements
- **Size**: 300x200px or larger
- **Format**: JPG, PNG, or WebP
- **Content**: Show result/transformation
- **Quality**: Professional, polished
- **Purpose**: Show what's possible

**Examples**:
```
✓ Refactored clean code
✓ Enhanced professional photo
✓ Formatted document
✓ Clean audio waveform
✓ Sales-focused copy
```

### Image Upload Process

1. **Go to**: Admin Dashboard
2. **Find**: "Upload Media" section
3. **Select**: Image file
4. **Choose**: Image type (before/after)
5. **Associate**: Link to prompt
6. **Save**: Image is stored and available

---

## 🎬 Video Showcase

### Video Requirements
- **Format**: MP4, WebM
- **Duration**: 15-60 seconds
- **Purpose**: Quick demo of prompt result
- **Quality**: 1080p or better
- **File size**: Max 50MB

### Video Content Ideas
```
✓ Before/after transformation
✓ Step-by-step guide
✓ Common use cases
✓ Expert tips & tricks
✓ Troubleshooting demo
```

### Video Upload
1. **Prepare**: MP4 video file
2. **Go to**: Admin Dashboard → Media
3. **Upload**: Select video file
4. **Tag**: Mark as demo video
5. **Link**: Associate with prompt
6. **Publish**: Make available

---

## 🏷️ Tag Guidelines

### Tag Rules
- **Lowercase**: Use lowercase only
- **Specific**: Be descriptive
- **Searchable**: Think like users
- **Limit**: Use 5-10 tags per prompt
- **Variety**: Mix specific and general

### Good Tags
```
✓ "code-refactoring"
✓ "portrait-photography"
✓ "seo-optimization"
✓ "email-marketing"
✓ "api-documentation"
```

### Bad Tags
```
✗ "Good" (too vague)
✗ "UPPERCASE" (inconsistent)
✗ "this is a prompt" (too long)
✗ "123" (not descriptive)
✗ "prompt prompt prompt" (repetitive)
```

---

## 🎯 Use Cases

### How to Add Use Cases

Each prompt should have 3-5 primary use cases that describe when/how to use it.

**Format**:
```
Use Cases:
1. Professional photo retouching
2. Social media content creation
3. E-commerce product images
```

**Examples by Category**:

**Code Editing**:
- Code review and feedback
- Performance optimization
- Bug fixing and debugging
- Best practices enforcement

**Image Editing**:
- Professional photography
- Social media graphics
- Product photography
- Marketing materials

**Document Writing**:
- API documentation
- User guides and manuals
- Blog posts and articles
- Technical writing

---

## 🛠️ AI Tool Association

### Supported Tools
The system includes 90+ AI tools pre-configured:

```
LLM Providers:
- ChatGPT, Claude, Gemini, DeepSeek, etc.

Image Tools:
- Midjourney, Leonardo.AI, Runway, etc.

Coding Tools:
- GitHub Copilot, Cursor, Tabnine, etc.

And 70+ more tools...
```

### How to Associate

When creating/editing a prompt:

1. **Select**: Applicable AI tools
2. **Prioritize**: Best tools first
3. **Verify**: Each tool actually works with prompt
4. **Save**: Tool icons appear on prompt card

### Example
```
Prompt: "Professional Code Refactoring"

Best Tools:
1. GitHub Copilot (priority)
2. Cursor (alternative)
3. ChatGPT (if copilot not available)
4. Claude (as backup)
```

---

## 📝 Prompt Creation Workflow

### Step 1: Basic Info
```
Title: Professional Code Refactoring
Category: Code Editing
Difficulty: Intermediate
```

### Step 2: Description
```
Description: "Refactor messy code into clean, 
maintainable, and well-documented functions 
with best practices."
```

### Step 3: Prompt Text
```
Prompt Text: "You are an expert code reviewer. 
Please refactor the following code to be more 
readable, maintainable, and efficient. Include 
comments and docstrings. [CODE HERE]"
```

### Step 4: Media
```
Before Image: Upload messy code screenshot
After Image: Upload clean code screenshot
Media Description: "Transformed chaotic code 
into structured, well-organized functions."
Video: (optional) Demo video URL
```

### Step 5: Metadata
```
Tags: [code, refactoring, optimization, best-practices, javascript]
Use Cases: [Code review, Performance optimization, Bug fixing]
AI Tools: [GitHub Copilot, Cursor, ChatGPT, Claude]
```

### Step 6: Review & Publish
```
Review: Check all fields
Set Status: Published
Save: Prompt appears in gallery
```

---

## 📊 Bulk Upload

### CSV Format for Bulk Upload

Create a CSV file with these columns:

```csv
title,category,description,promptText,difficulty,tags,useCase,aiTools,beforeImage,afterImage
"Professional Code Refactoring","code","Refactor code...","You are an expert...","intermediate","code,refactoring,optimization","Code review, Performance optimization","ChatGPT,Cursor","image-url-1","image-url-2"
```

### Upload Process
1. **Prepare**: CSV file with 5+ rows
2. **Go to**: Admin Dashboard
3. **Click**: "Bulk Upload"
4. **Select**: CSV file
5. **Preview**: Verify data
6. **Confirm**: Upload prompts
7. **Status**: See import results

---

## ⭐ Rating Management

### How Ratings Work
- **User Reviews**: Users can rate 1-5 stars
- **Auto-Calculate**: System averages ratings
- **Display**: Shows average and count

### Default Rating
New prompts:
- Start with no rating
- Rating appears after first reviews
- Display format: "⭐ 4.8 (245 reviews)"

### Featured Prompts
Prompts with:
- ⭐ 4.5+ rating
- 100+ reviews
- 1000+ copies

Are marked as "Featured" with special badge.

---

## 🔍 Quality Standards

### High-Quality Prompts Must Have

✅ **Required**:
- [ ] Clear title (5-10 words)
- [ ] Relevant category
- [ ] Detailed description (50+ chars)
- [ ] Difficulty level
- [ ] 5-10 tags
- [ ] 2-5 use cases

✅ **Recommended**:
- [ ] Before/after images
- [ ] Demo video
- [ ] 3+ AI tools
- [ ] Example output
- [ ] Tips & tricks

✅ **Nice to Have**:
- [ ] Variations/alternatives
- [ ] Related prompts
- [ ] Difficulty tips
- [ ] Common mistakes
- [ ] Success stories

---

## 📈 Batch Operations

### Feature Prompt
1. Select prompt
2. Click "Feature"
3. Appears in featured section
4. Gets badge/highlight

### Organize by Stats
1. Sort by copy count (most popular)
2. Sort by rating (highest rated)
3. Sort by date (newest first)
4. Sort by difficulty (easiest first)

### Archive Old Prompts
1. Find outdated prompt
2. Click "Archive"
3. Removed from public gallery
4. Still in admin view
5. Can unarchive later

---

## 🎯 Best Practices

### For Before/After Images
- ✅ Use same aspect ratio for both
- ✅ Use consistent styling
- ✅ Make transformation obvious
- ✅ Use high-quality images
- ✅ Include helpful labels/watermarks

### For Descriptions
- ✅ Be specific and clear
- ✅ Explain what makes it special
- ✅ Mention best use cases
- ✅ Include any limitations
- ✅ Provide tips for best results

### For Tags
- ✅ Use 5-10 tags consistently
- ✅ Include skill level
- ✅ Add industry/domain tags
- ✅ Use searchable keywords
- ✅ Avoid redundant tags

### For Prompts
- ✅ Test in actual AI tools
- ✅ Include example inputs
- ✅ Specify expected outputs
- ✅ Add customization options
- ✅ Keep concise but complete

---

## 🚀 Optimization Tips

### Increase Discoverability
1. **Use specific tags** not generic
2. **Write clear titles** (searchable)
3. **Add keywords** to description
4. **Category match** prompt type
5. **Include ratings** (ask users)

### Improve Quality
1. **Update** outdated prompts
2. **Fix** broken images/links
3. **Add** missing metadata
4. **Remove** low-rated prompts
5. **Promote** high-rated prompts

### Grow Community
1. **Feature** best prompts
2. **Share** on social media
3. **Highlight** user submissions
4. **Create** prompt of the week
5. **Celebrate** milestone copies

---

## 📞 Support & Troubleshooting

### Common Issues

**Images not showing**:
- Check file format (JPG, PNG, WebP)
- Verify image size (at least 300x200)
- Check file permissions
- Verify upload completed

**Prompts not searchable**:
- Check tags are lowercase
- Verify title matches content
- Add keywords to description
- Update category if needed

**Ratings not displaying**:
- Check if prompt has reviews
- Wait for user reviews
- Admin can manually set initial rating
- Verify rating system is enabled

---

**Last Updated**: May 2026  
**Version**: 1.0.0  
**Categories**: 10  
**Max Prompts**: Unlimited  
**Supported Fields**: 15+  

**Start managing**: [Admin Dashboard](http://localhost:4173/admin)
