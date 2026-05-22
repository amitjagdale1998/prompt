# Website Requirements

## Product vision

Build an AI Prompt Hub for developers and Indian users that helps both technical and non-technical audiences discover, test, save, and apply high-quality prompts for tools like ChatGPT, Gemini, Claude, and Midjourney.

## Business goals

- Build a free prompt library to attract SEO and social traffic.
- Convert engaged users into paying customers through premium prompt packs and subscriptions.
- Monetize additional traffic with affiliate links and ads.
- Create a sustainable content engine (library + blog + newsletter + social).

## Target audience

- Primary: Developers looking for coding, debugging, SQL, API, and interview prompts.
- Secondary: Indian users looking for job, business, productivity, and local-language prompts.
- Opportunity segment: Marathi/Hindi prompt seekers with lower market competition.

## Monetization requirements

### 1) Free traffic monetization

- Integrate ad placements for high-traffic pages (gallery, guides, blog).
- Support AdSense/Media.net style ad slots with easy admin toggle.
- Track impressions, clicks, and RPM in admin analytics.

### 2) Premium prompt packs

- Create sellable digital prompt packs by category.
- Add pack landing pages with previews and benefits.
- Support checkout through Gumroad/Lemon Squeezy links in phase 1.
- Keep internal data model ready for direct checkout in future.

### 3) Subscription model

- Monthly plans (example: INR 199 and INR 499).
- Premium features: daily premium prompts, saved collections, advanced prompt generator, members-only directory access.
- Gate premium routes and API endpoints with subscription checks.

### 4) Affiliate marketing

- Add affiliate blocks for recommended AI tools.
- Store affiliate links per tool/category in admin panel.
- Add click tracking and conversion source tracking (UTM + referral metadata).

## Functional requirements

### Core product

- Prompt gallery with search, categories, tags, rating, and copy button.
- Prompt detail pages with examples, expected output, and tool compatibility.
- Favorites/bookmarks for logged-in users.
- Prompt quality signals: ratings, usage count, and recency.

### Prompt generator

- Input fields: role, goal, tone, output format, constraints.
- Generate optimized prompt templates.
- Save generated prompts to user history.

### Admin capabilities

- Manage prompts, categories, tags, media, and SEO metadata.
- Manage premium packs and affiliate links.
- Moderate user-submitted prompts.
- View analytics dashboard for traffic and monetization KPIs.

### Content and growth

- Blog/article module for SEO landing pages.
- Newsletter signup and email capture.
- Daily prompt publishing workflow.
- Social sharing hooks for Instagram, LinkedIn, and YouTube Shorts snippets.

## SEO and distribution requirements

- SEO-friendly route architecture for categories, tags, and tool-specific pages.
- Structured metadata support (title, description, OG tags, schema data).
- Internal linking between prompt pages, guides, and blog posts.
- Keyword focus on high intent terms: coding prompts, interview prompts, productivity prompts, and Indian-language prompt queries.

## Technical requirements

### Current stack (supported)

- Frontend: React + Vite + Tailwind + Ant Design + React Router.
- Backend: Node.js + Express + MongoDB/Mongoose.
- Architecture: separate frontend and backend packages.

### Recommended evolution

- Evaluate migration path to Next.js for better SSR and SEO performance.
- Keep backend APIs modular so frontend framework can be swapped without breaking services.
- Add event tracking layer (prompt views, copies, favorites, affiliate clicks, premium CTA clicks).

## Data model expansion

- Prompt: category, tags, language, tool support, difficulty, rating, usage_count, is_premium.
- User: favorites, saved prompts, plan_tier, subscription_status.
- PromptPack: title, category, preview, price, external_checkout_url, status.
- AffiliateTool: name, category, url, commission_type, active.
- EventLog: event_type, user_id, prompt_id, source, device, timestamp.

## 90-day execution roadmap

### Phase 1 (Weeks 1-3)

- Launch improved free prompt gallery with search, copy, tags, and ratings.
- Add SEO metadata and category pages.
- Add affiliate blocks on relevant pages.

### Phase 2 (Weeks 4-6)

- Launch premium prompt packs with external checkout.
- Add user favorites and saved collections.
- Start daily social content pipeline (1 prompt/day).

### Phase 3 (Weeks 7-10)

- Launch subscription plans with members-only prompts.
- Release prompt generator v1.
- Add email capture and newsletter flow.

### Phase 4 (Weeks 11-13)

- Optimize conversion funnels from free to paid.
- Expand Marathi/Hindi/India-specific prompt collections.
- Improve retention with weekly member content drops.

## Success metrics (KPIs)

- Traffic: organic sessions, returning users, page/session.
- Product engagement: prompt copy rate, favorite rate, generator usage.
- Revenue: ad RPM, affiliate CTR/conversions, premium pack sales, MRR.
- Retention: weekly active users, churn rate, email open and click rates.

## Risks and constraints

- Main risk is traffic acquisition, not development complexity.
- Ads are low-yield at low traffic; do not depend on ads in early stage.
- SEO content quality and distribution consistency are mandatory for growth.
- Prioritize build-measure-iterate cycles every 2 weeks.
