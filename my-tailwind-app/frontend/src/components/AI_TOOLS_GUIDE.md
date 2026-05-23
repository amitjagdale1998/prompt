# AI Tools & Logos Usage Guide

This guide explains how to use the official AI tools logos and the AI Tools showcase component throughout the Prompt Lab application.

---

## 📊 Data Structure

### Location
- **File**: `frontend/src/data/aiTools.js`
- **Component**: `frontend/src/components/AIToolsShowcase.jsx`

### Categories Available

The data is organized in categories:

```javascript
aiTools.llmProviders        // LLM & Chat Models (OpenAI, Claude, Gemini, etc.)
aiTools.codingTools         // Coding tools (Copilot, Tabnine, Cursor, etc.)
aiTools.imageTools          // Image & Design tools (Midjourney, Leonardo, Figma, etc.)
aiTools.specializedAI       // Specialized AI (Hugging Face, ElevenLabs, etc.)
aiTools.chatPlatforms       // Chat platforms (Discord, Slack, Telegram, etc.)
aiTools.hosting             // Hosting platforms (Vercel, Netlify, Railway, etc.)
aiTools.cloudProviders      // Cloud providers (AWS, Google Cloud, Azure, etc.)
aiTools.techStack           // Tech stack (React, Node.js, Python, etc.)
aiTools.social              // Social media (Twitter, LinkedIn, GitHub, etc.)
aiTools.browsers            // Web browsers (Chrome, Firefox, Safari, etc.)
```

### Tool Object Structure

```javascript
{
  name: 'Tool Name',
  site: 'https://tool.com',
  logo: 'https://cdn.simpleicons.org/toolname',
  color: '#HexColor'
}
```

---

## 🎨 Display Components

### 1. **AIToolsShowcase** - Grid Display
Display tools in a responsive grid layout.

**Usage:**
```jsx
import AIToolsShowcase from '../components/AIToolsShowcase';

// Show LLM providers (default)
<AIToolsShowcase />

// Show specific category
<AIToolsShowcase category="codingTools" />

// Show all tools
<AIToolsShowcase category="all" />

// Show first 12 tools
<AIToolsShowcase category="techStack" limit={12} />

// Custom columns layout
<AIToolsShowcase 
  category="imageTools" 
  columns={{ xs: 2, sm: 3, md: 4, lg: 5 }}
/>
```

**Props:**
- `category` (string): Category key from aiTools object
- `limit` (number): Max tools to display
- `columns` (object): Responsive column counts

**Example Placement:**
- Home page features section
- Prompt guide showing supported tools
- Gallery page featuring AI partners
- Admin panel for tool management

---

### 2. **AIToolsCategoryGrid** - All Categories
Display all tool categories with titles.

**Usage:**
```jsx
import { AIToolsCategoryGrid } from '../components/AIToolsShowcase';

<AIToolsCategoryGrid />
```

**Best For:**
- Dedicated tools/integrations page
- Admin dashboard overview
- Comprehensive feature tour

---

### 3. **AIToolsInline** - Inline Display
Show tools in a row with inline layout.

**Usage:**
```jsx
import { AIToolsInline } from '../components/AIToolsShowcase';

// Show LLM providers inline
<AIToolsInline category="llmProviders" />

// With label
<AIToolsInline category="codingTools" showLabel={true} />
```

**Best For:**
- Sidebar information
- Card descriptions
- Quick reference sections

---

### 4. **AIToolsScroller** - Horizontal Scroll
Mobile-friendly horizontal scrolling layout.

**Usage:**
```jsx
import { AIToolsScroller } from '../components/AIToolsShowcase';

<AIToolsScroller category="llmProviders" />
```

**Best For:**
- Mobile view
- Limited horizontal space
- Feature highlights

---

## 💡 Implementation Examples

### Example 1: Home Page AI Partners Section

**File**: `frontend/src/pages/Home.jsx`

```jsx
import AIToolsShowcase from '../components/AIToolsShowcase';

export default function Home() {
  return (
    <div>
      {/* ... existing content ... */}
      
      {/* AI Partners Section */}
      <section className="py-12 px-6 bg-slate-50 dark:bg-slate-800">
        <h2 className="text-3xl font-bold mb-8">
          Works with all major AI platforms
        </h2>
        <AIToolsShowcase category="llmProviders" limit={12} />
      </section>
    </div>
  );
}
```

### Example 2: Prompt Gallery - Tool Integration

**File**: `frontend/src/pages/PromptGallery.jsx`

```jsx
import { AIToolsInline } from '../components/AIToolsShowcase';

export default function PromptGallery() {
  return (
    <div>
      {/* ... existing gallery code ... */}
      
      {/* Below each prompt */}
      <Card>
        <h3>Product Description Generator</h3>
        <p>Generate SEO-friendly product descriptions</p>
        
        <div className="mt-4">
          <AIToolsInline 
            category="llmProviders" 
            showLabel={true}
          />
        </div>
      </Card>
    </div>
  );
}
```

### Example 3: Admin Dashboard - Tech Stack

**File**: `frontend/src/pages/AdminDashboard.jsx`

```jsx
import { AIToolsCategoryGrid } from '../components/AIToolsShowcase';

export default function AdminDashboard() {
  return (
    <div>
      {/* ... existing admin content ... */}
      
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">
          Our Technology Stack
        </h2>
        <AIToolsCategoryGrid />
      </section>
    </div>
  );
}
```

### Example 4: Prompt Guide - Tool Compatibility

**File**: `frontend/src/pages/PromptGuide.jsx`

```jsx
import { AIToolsScroller } from '../components/AIToolsShowcase';

export default function PromptGuide() {
  return (
    <div>
      <h1>How to Write Effective Prompts</h1>
      
      <section>
        <h2>Compatible AI Tools</h2>
        <p>
          These prompts work great with all major AI platforms:
        </p>
        <AIToolsScroller category="llmProviders" />
      </section>
    </div>
  );
}
```

### Example 5: User Card - Custom Inline

```jsx
import { aiTools } from '../data/aiTools';

export default function UserPromptCard({ prompt }) {
  return (
    <Card>
      <h3>{prompt.title}</h3>
      <p>{prompt.description}</p>
      
      <div className="flex gap-2 mt-4">
        {aiTools.llmProviders.slice(0, 5).map((tool, i) => (
          <a 
            key={i} 
            href={tool.site} 
            target="_blank"
            title={tool.name}
          >
            <img 
              src={tool.logo} 
              alt={tool.name}
              width="32"
              height="32"
            />
          </a>
        ))}
      </div>
    </Card>
  );
}
```

---

## 🎯 Using Individual Logos

### Direct Img Tag

```html
<img 
  src="https://cdn.simpleicons.org/openai" 
  alt="OpenAI"
  width="40"
  height="40"
/>
```

### With Color

```html
<img 
  src="https://cdn.simpleicons.org/deepseek/4D6BFE" 
  alt="DeepSeek"
  width="40"
  height="40"
/>
```

### From Data Object

```jsx
import { aiTools } from '../data/aiTools';

const chatGPT = aiTools.llmProviders[0]; // ChatGPT

<img 
  src={chatGPT.logo} 
  alt={chatGPT.name}
  width="40"
/>
```

---

## 🎨 Logo URLs Reference

### LLM Providers
```
https://cdn.simpleicons.org/openai
https://cdn.simpleicons.org/googlegemini/4285F4
https://cdn.simpleicons.org/claude
https://cdn.simpleicons.org/anthropic
https://cdn.simpleicons.org/perplexity
https://cdn.simpleicons.org/deepseek/4D6BFE
```

### Coding Tools
```
https://cdn.simpleicons.org/githubcopilot
https://cdn.simpleicons.org/tabnine
https://cdn.simpleicons.org/cursor
https://cdn.simpleicons.org/windsurf
https://cdn.simpleicons.org/replit
```

### Image & Design
```
https://cdn.simpleicons.org/midjourney
https://cdn.simpleicons.org/leonardoai
https://cdn.simpleicons.org/runway
https://cdn.simpleicons.org/figma
https://cdn.simpleicons.org/canva
```

### Tech Stack
```
https://cdn.simpleicons.org/react/61DAFB
https://cdn.simpleicons.org/nodejs
https://cdn.simpleicons.org/tailwindcss/06B6D4
https://cdn.simpleicons.org/mongodb
https://cdn.simpleicons.org/python
```

---

## 🎭 Styling & Theming

### Dark Mode Support
All logos are automatically visible in both light and dark modes due to their design.

### Custom Styling Example

```jsx
<div className="tool-icon-wrapper hover:scale-110 transition-transform">
  <img 
    src={tool.logo} 
    alt={tool.name}
    className="w-10 h-10"
  />
</div>
```

### Tailwind Classes
```jsx
// Hover effect
<img className="hover:shadow-lg hover:scale-110 transition-all" />

// Dark mode aware
<img className="dark:filter dark:invert" />

// Responsive sizing
<img className="w-8 sm:w-10 md:w-12" />
```

---

## 📱 Responsive Breakpoints

The `AIToolsShowcase` component responds to:

```javascript
{
  xs: 2,      // Mobile: 2 columns
  sm: 3,      // Small tablet: 3 columns
  md: 4,      // Medium tablet: 4 columns
  lg: 6       // Desktop: 6 columns
}
```

Customize for your layout:

```jsx
<AIToolsShowcase 
  category="llmProviders"
  columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
/>
```

---

## ⚡ Performance Tips

1. **Lazy Loading**: Images use `loading="lazy"` attribute
2. **Caching**: SVGs are cached by browser automatically
3. **Optimization**: Use `limit` prop to show fewer tools
4. **Mobile**: Use `AIToolsScroller` for limited space

---

## 🔧 Adding New Tools

To add a new tool:

1. **Update** `frontend/src/data/aiTools.js`:

```javascript
aiTools.llmProviders.push({
  name: 'New Tool',
  site: 'https://newtool.com',
  logo: 'https://cdn.simpleicons.org/newtool',
  color: '#123456'
});
```

2. **Find logo URL**: Visit https://simpleicons.org and search for the tool
3. **Add to appropriate category**
4. **Test** the component to ensure it displays correctly

---

## 📖 Display Locations

### Current & Recommended

| Page | Component | Category | Status |
|------|-----------|----------|--------|
| Home | Grid | llmProviders | 📋 Ready to implement |
| Gallery | Inline | codingTools | 📋 Ready to implement |
| Prompt Guide | Scroller | All | 📋 Ready to implement |
| User Dashboard | Inline | llmProviders | 📋 Ready to implement |
| Admin Dashboard | CategoryGrid | All | 📋 Ready to implement |
| Tech Stack | Grid | techStack | 📋 Ready to implement |

---

## 🎨 Brand Colors Reference

```javascript
// Primary AI Tools
OpenAI: #000000
Google Gemini: #4285F4
Claude: #000000
DeepSeek: #4D6BFE

// Tech Stack
React: #61DAFB
Tailwind: #06B6D4
Node.js: #339933
Python: #3776AB

// Platforms
Discord: #5865F2
GitHub: #181717
Slack: #E01E5A
```

---

## 🚀 Quick Implementation Checklist

- [ ] Import component in page
- [ ] Choose category or create custom list
- [ ] Add to JSX
- [ ] Test on mobile (xs breakpoint)
- [ ] Test on tablet (sm, md breakpoints)
- [ ] Test on desktop (lg breakpoint)
- [ ] Test dark mode toggle
- [ ] Check hover effects
- [ ] Verify links open correctly
- [ ] Test image loading

---

## 📚 Resources

- **Simple Icons**: https://simpleicons.org
- **Icon Search**: Search by name on Simple Icons
- **CDN Format**: `https://cdn.simpleicons.org/{icon-name}`
- **Colored Format**: `https://cdn.simpleicons.org/{icon-name}/{hex-color}`

---

**Last Updated**: May 2026  
**Component Version**: 1.0.0  
**Total Tools**: 90+  
**Categories**: 10
