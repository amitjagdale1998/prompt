import mongoose from 'mongoose';
import { connectDB } from '../db.js';
import Prompt from '../models/Prompt.js';
import Media from '../models/Media.js';

const img = (seed) => `https://picsum.photos/seed/${seed}/1024/640`;

const prompts = [
  {
    title: 'React component refactor to hooks and TypeScript',
    category: 'Coding',
    description:
      'You are a senior React engineer. Refactor the following class component into a functional component using React hooks and TypeScript. Preserve all behavior, extract reusable logic into custom hooks where appropriate, add proper prop and state types, and explain each change in short bullet points.\n\nCode:\n<paste code here>',
    tags: ['react', 'typescript', 'refactor', 'hooks'],
    copyCount: 312,
    images: ['react-refactor-1', 'react-refactor-2'],
  },
  {
    title: 'Debug a failing Node.js Express API',
    category: 'Coding',
    description:
      'Act as a backend debugging expert. I will share an Express route, the request payload, and the error message. Identify the root cause, list the top 3 likely issues ranked by probability, suggest the minimal fix, and provide the corrected code with inline comments.\n\nRoute:\n<paste code>\nPayload:\n<paste payload>\nError:\n<paste error>',
    tags: ['node', 'express', 'debugging', 'api'],
    copyCount: 268,
    images: ['node-debug-1'],
  },
  {
    title: 'Generate SQL from natural language',
    category: 'Coding',
    description:
      'You are a senior data engineer. Given this database schema and a natural language question, produce an efficient PostgreSQL query. Use CTEs for clarity, qualify all columns with table aliases, and explain the query plan briefly.\n\nSchema:\n<paste schema>\nQuestion:\n<paste question>',
    tags: ['sql', 'postgres', 'data'],
    copyCount: 221,
    images: ['sql-1'],
  },
  {
    title: 'REST API design for a resource',
    category: 'Coding',
    description:
      'Design a RESTful API for the following resource. Provide route table (method, path, purpose), request/response JSON schemas, status codes, pagination strategy, error envelope, and authentication notes.\n\nResource: <name>\nFields: <list>\nConstraints: <list>',
    tags: ['api', 'rest', 'design'],
    copyCount: 197,
    images: ['rest-api-1'],
  },
  {
    title: 'Coding interview prep — system design round',
    category: 'Interview',
    description:
      'You are a FAANG interviewer. Conduct a 45-minute system design interview for the following prompt. Ask clarifying questions first, then evaluate my answer across requirements, capacity estimation, high-level design, data model, APIs, scaling, and tradeoffs. Score 1-5 per dimension and give specific improvements.\n\nPrompt: Design <system>',
    tags: ['interview', 'system-design', 'faang'],
    copyCount: 412,
    images: ['interview-1'],
  },
  {
    title: 'Behavioral interview answer using STAR',
    category: 'Interview',
    description:
      'Help me craft a STAR-format answer for this behavioral question. Ask me for the Situation, Task, Action, and Result one at a time, then rewrite the final answer in a confident, concise voice under 90 seconds when spoken.\n\nQuestion: <paste question>',
    tags: ['interview', 'behavioral', 'star'],
    copyCount: 308,
    images: ['interview-2'],
  },
  {
    title: 'Midjourney photoreal product mockup',
    category: 'Image Generation',
    description:
      'Photorealistic product mockup of <product>, studio lighting, soft shadow on matte concrete surface, 35mm lens, f/2.8, hyper-detailed, color-graded for ecommerce, 4k, --ar 4:5 --style raw --v 6',
    tags: ['midjourney', 'product', 'photoreal', 'ecommerce'],
    copyCount: 540,
    images: ['mj-product-1', 'mj-product-2'],
  },
  {
    title: 'DALL·E illustrated landing page hero',
    category: 'Image Generation',
    description:
      'Flat vector illustration of <subject>, geometric shapes, soft pastel palette (#FFD6A5 #FDFFB6 #CAFFBF #9BF6FF), centered composition with copy space on the right, modern SaaS landing page style, no text in the image.',
    tags: ['dalle', 'illustration', 'saas', 'hero'],
    copyCount: 287,
    images: ['dalle-hero-1'],
  },
  {
    title: 'Stable Diffusion character concept',
    category: 'Image Generation',
    description:
      'masterpiece, best quality, full-body concept art of <character description>, dynamic pose, cinematic rim light, painterly brushstrokes, ArtStation trending, by Greg Rutkowski and Ilya Kuvshinov, 8k, --negative low quality, blurry, deformed hands, extra fingers',
    tags: ['stable-diffusion', 'character', 'concept-art'],
    copyCount: 234,
    images: ['sd-character-1'],
  },
  {
    title: 'Rewrite technical docs for non-technical readers',
    category: 'Document Editing',
    description:
      'You are a technical writer. Rewrite the following content for a non-technical audience at an 8th-grade reading level. Keep all factual accuracy. Replace jargon with plain language and add a 2-sentence summary at the top.\n\nContent:\n<paste content>',
    tags: ['writing', 'documentation', 'plain-language'],
    copyCount: 176,
    images: ['docs-rewrite-1'],
  },
  {
    title: 'Summarize a long document into action items',
    category: 'Document Editing',
    description:
      'Summarize the following document in three sections: (1) Executive summary in 3 sentences, (2) Key insights as 5 bullets, (3) Action items as a checklist with owner and due-date placeholders.\n\nDocument:\n<paste document>',
    tags: ['summary', 'productivity', 'meeting-notes'],
    copyCount: 198,
    images: ['summary-1'],
  },
  {
    title: 'Resume bullet rewriter — impact + metrics',
    category: 'Productivity',
    description:
      'Rewrite each of my resume bullets using the formula: strong action verb + what I did + measurable impact (%, $, time). Keep each bullet under 20 words. Ask me for missing metrics before rewriting.\n\nBullets:\n<paste bullets>',
    tags: ['resume', 'career', 'productivity'],
    copyCount: 365,
    images: ['resume-1'],
  },
  {
    title: 'Cold outreach email that gets replies',
    category: 'Marketing',
    description:
      'Write a 90-word cold outreach email to <persona> at <company>. Hook in line 1 with a specific observation about their product. State the problem we solve in one sentence. Offer one concrete next step. No buzzwords, no "I hope this finds you well", no attachments.\n\nContext:\n<paste context>',
    tags: ['email', 'sales', 'outreach', 'b2b'],
    copyCount: 421,
    images: ['email-1'],
  },
  {
    title: 'SEO blog outline with search intent',
    category: 'Marketing',
    description:
      'Create an SEO blog outline for the target keyword "<keyword>". Identify the search intent, list 3 SERP competitors and what they cover, then propose an H1, 6 H2 sections with H3s, 5 FAQ questions, a meta title (≤60 chars) and meta description (≤155 chars).',
    tags: ['seo', 'blog', 'content-marketing'],
    copyCount: 289,
    images: ['seo-blog-1'],
  },
  {
    title: 'Audio cleanup prompt for AI mastering',
    category: 'Audio Editing',
    description:
      'Process the attached voice recording: remove background noise and room reverb, normalize loudness to -16 LUFS for podcasts, apply de-esser on harsh sibilance around 6-8 kHz, and output a cleaned WAV plus a transcript with speaker labels and timestamps.',
    tags: ['audio', 'podcast', 'transcription'],
    copyCount: 142,
    images: ['audio-1'],
  },
  {
    title: 'Marathi business email — formal tone',
    category: 'Marathi',
    description:
      'Ek formal Marathi madhe vyavsayik email lihā. Visay: <visay>. Pratham namaskar, mag samasya/vinanti, mag pudhachi pāyrī, ani shevti aabhar āni svākshari. Pratisad spasht āni 120 shabdāmadhe asāvā.',
    tags: ['marathi', 'email', 'business', 'india'],
    copyCount: 96,
    images: ['marathi-email-1'],
  },
  {
    title: 'Hindi interview answer — Tell me about yourself',
    category: 'Hindi',
    description:
      'Mere liye "Apne baare me bataiye" ka 60-second Hindi answer likho. Structure: vartamaan bhumika, do mukhya uplabdhiyaan numbers ke saath, aur is role ke liye kyun fit hoon. Aatmavishwaasi par vinamra tone.\n\nMera background: <paste>',
    tags: ['hindi', 'interview', 'career', 'india'],
    copyCount: 118,
    images: ['hindi-interview-1'],
  },
  {
    title: 'AI prompt generator — role + goal + tone',
    category: 'Prompt Engineering',
    description:
      'Generate an optimized AI prompt for the inputs below. Output a single prompt block using this structure: Role, Context, Task, Constraints, Output format, Examples. Keep under 200 words.\n\nRole: <role>\nGoal: <goal>\nTone: <tone>\nAudience: <audience>',
    tags: ['prompt-engineering', 'meta', 'template'],
    copyCount: 503,
    images: ['prompt-gen-1', 'prompt-gen-2'],
  },
  {
    title: 'Daily standup summary from messy notes',
    category: 'Productivity',
    description:
      'Convert my messy notes into a clean daily standup update with three sections: Yesterday, Today, Blockers. Use one short bullet per item. Flag risks with a "⚠" prefix. Keep under 80 words.\n\nNotes:\n<paste>',
    tags: ['standup', 'agile', 'productivity'],
    copyCount: 174,
    images: ['standup-1'],
  },
  {
    title: 'Astrology — daily horoscope writing',
    category: 'Lifestyle',
    description:
      'Write a 120-word daily horoscope for <zodiac sign> on <date>. Cover love, career, health, and a lucky number. Keep tone hopeful and grounded, avoid medical or financial advice.',
    tags: ['astrology', 'horoscope', 'lifestyle'],
    copyCount: 86,
    images: ['astro-1'],
  },
  {
    title: '90s Vintage Aesthetic (Scrapbook/Flash Vibe)',
    category: 'Image Editing',
    description:
      "Edit the uploaded photo. Add a medium-intensity flash photography effect. Apply Kodak Portra film color simulation with a warm, nostalgic hue. Maintain a shallow depth of field. Strictly preserve the original subject's facial structure, hair, and outfit from the reference image.",
    tags: ['vintage', 'kodak-portra', 'flash', 'photo-editing'],
    copyCount: 120,
    images: ['vintage-90s-1', 'vintage-90s-2'],
  },
  {
    title: 'Cinematic Golden Hour (Soft & Professional)',
    category: 'Image Editing',
    description:
      "Soften harsh midday shadows on the face, rebuild detail in shaded areas, and apply a warm, directional golden-hour glow from the right side. Add a soft rim light along the subject's hair. Keep skin tones completely natural and ensure the identity/face from the original photo matches 100%.",
    tags: ['golden-hour', 'cinematic', 'portrait', 'lighting'],
    copyCount: 132,
    images: ['golden-hour-1', 'golden-hour-2'],
  },
  {
    title: 'Cyberpunk/Neon Night (Moody & Urban)',
    category: 'Image Editing',
    description:
      "Reimagine the background of this photo as a futuristic city street at night with glowing neon signs and soft rain reflections on the ground. Add a cyan and magenta color grading. The subject in the foreground should remain sharp, untouched, and perfectly preserve their original identity.",
    tags: ['cyberpunk', 'neon', 'background-replacement', 'urban'],
    copyCount: 118,
    images: ['cyberpunk-neon-1', 'cyberpunk-neon-2'],
  },
  {
    title: 'Minimalist Studio Portrait (Clean & Editorial)',
    category: 'Image Editing',
    description:
      "Remove the entire background and replace it with a solid, neutral beige studio backdrop. Adjust the lighting to soft, professional umbrella lighting to gently illuminate the subject. Crop to a clean editorial headshot. Strictly keep the original facial features and expression.",
    tags: ['studio', 'editorial', 'portrait', 'background-removal'],
    copyCount: 126,
    images: ['minimalist-studio-1', 'minimalist-studio-2'],
  },
];

async function seed() {
  try {
    await connectDB();
    console.log('Connected. Seeding prompts...');

    let promptsCreated = 0;
    let promptsUpdated = 0;
    let mediaCreated = 0;

    for (const item of prompts) {
      const { images = [], ...promptData } = item;
      const existing = await Prompt.findOne({ title: promptData.title });

      let prompt;
      if (existing) {
        Object.assign(existing, promptData, { status: 'published' });
        prompt = await existing.save();
        promptsUpdated += 1;
      } else {
        prompt = await Prompt.create({ ...promptData, status: 'published' });
        promptsCreated += 1;
      }

      await Media.deleteMany({ promptId: prompt._id });
      for (const seedKey of images) {
        await Media.create({
          promptId: prompt._id,
          type: 'current-image',
          url: img(seedKey),
          description: `Reference image for "${prompt.title}"`,
        });
        mediaCreated += 1;
      }
    }

    console.log(
      `Done. Prompts created: ${promptsCreated}, updated: ${promptsUpdated}, media: ${mediaCreated}`
    );
  } catch (err) {
    console.error('Seed failed:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
