// AI Tools with official logos from Simple Icons
const aiTools = {
  // LLM & Chat Models
  llmProviders: [
    { name: 'ChatGPT', site: 'https://chat.openai.com', logo: 'https://cdn.simpleicons.org/openai', color: '#000000' },
    { name: 'OpenAI', site: 'https://openai.com', logo: 'https://cdn.simpleicons.org/openai', color: '#000000' },
    { name: 'Google Gemini', site: 'https://gemini.google.com', logo: 'https://cdn.simpleicons.org/googlegemini/4285F4', color: '#4285F4' },
    { name: 'Claude', site: 'https://claude.ai', logo: 'https://cdn.simpleicons.org/claude', color: '#000000' },
    { name: 'Anthropic', site: 'https://www.anthropic.com', logo: 'https://cdn.simpleicons.org/anthropic', color: '#000000' },
    { name: 'Perplexity', site: 'https://www.perplexity.ai', logo: 'https://cdn.simpleicons.org/perplexity', color: '#000000' },
    { name: 'Mistral AI', site: 'https://mistral.ai', logo: 'https://cdn.simpleicons.org/mistralai', color: '#000000' },
    { name: 'Meta Llama', site: 'https://www.meta.com/ai/', logo: 'https://cdn.simpleicons.org/meta', color: '#0A66C2' },
    { name: 'X.AI Grok', site: 'https://x.ai', logo: 'https://cdn.simpleicons.org/xai', color: '#000000' },
    { name: 'DeepSeek', site: 'https://deepseek.com', logo: 'https://cdn.simpleicons.org/deepseek/4D6BFE', color: '#4D6BFE' },
    { name: 'Cohere', site: 'https://cohere.com', logo: 'https://cdn.simpleicons.org/cohere', color: '#000000' },
    { name: 'Ollama', site: 'https://ollama.ai', logo: 'https://cdn.simpleicons.org/ollama', color: '#000000' },
  ],

  // Coding & Developer Tools
  codingTools: [
    { name: 'GitHub Copilot', site: 'https://github.com/features/copilot', logo: 'https://cdn.simpleicons.org/githubcopilot', color: '#000000' },
    { name: 'Tabnine', site: 'https://www.tabnine.com', logo: 'https://cdn.simpleicons.org/tabnine', color: '#000000' },
    { name: 'Cursor', site: 'https://cursor.com', logo: 'https://cdn.simpleicons.org/cursor', color: '#09D3AC' },
    { name: 'Windsurf', site: 'https://codeium.com/windsurf', logo: 'https://cdn.simpleicons.org/windsurf', color: '#000000' },
    { name: 'Black Box AI', site: 'https://www.blackbox.ai', logo: 'https://cdn.simpleicons.org/blackboxai', color: '#000000' },
    { name: 'Replit', site: 'https://replit.com', logo: 'https://cdn.simpleicons.org/replit', color: '#F26207' },
    { name: 'LangChain', site: 'https://langchain.com', logo: 'https://cdn.simpleicons.org/langchain', color: '#1C3C3C' },
    { name: 'Sourcegraph', site: 'https://sourcegraph.com', logo: 'https://cdn.simpleicons.org/sourcegraph', color: '#00B4F2' },
  ],

  // Image & Design
  imageTools: [
    { name: 'Midjourney', site: 'https://www.midjourney.com', logo: 'https://cdn.simpleicons.org/midjourney', color: '#000000' },
    { name: 'Leonardo.Ai', site: 'https://leonardo.ai', logo: 'https://cdn.simpleicons.org/leonardoai', color: '#000000' },
    { name: 'Runway', site: 'https://www.runwayml.com', logo: 'https://cdn.simpleicons.org/runway', color: '#000000' },
    { name: 'Stability AI', site: 'https://stability.ai', logo: 'https://cdn.simpleicons.org/stabilityai', color: '#000000' },
    { name: 'Figma', site: 'https://figma.com', logo: 'https://cdn.simpleicons.org/figma', color: '#F24E1E' },
    { name: 'Adobe Creative Suite', site: 'https://adobe.com', logo: 'https://cdn.simpleicons.org/adobe', color: '#FF0000' },
    { name: 'Photoshop', site: 'https://www.adobe.com/products/photoshop', logo: 'https://cdn.simpleicons.org/photoshop', color: '#31A8FF' },
    { name: 'Canva', site: 'https://canva.com', logo: 'https://cdn.simpleicons.org/canva', color: '#00C4CC' },
  ],

  // Specialized AI
  specializedAI: [
    { name: 'Hugging Face', site: 'https://huggingface.co', logo: 'https://cdn.simpleicons.org/huggingface', color: '#FFD21E' },
    { name: 'Replicate', site: 'https://replicate.com', logo: 'https://cdn.simpleicons.org/replicate', color: '#000000' },
    { name: 'ElevenLabs', site: 'https://elevenlabs.io', logo: 'https://cdn.simpleicons.org/elevenlabs', color: '#000000' },
    { name: 'Pinecone', site: 'https://pinecone.io', logo: 'https://cdn.simpleicons.org/pinecone', color: '#1D63ED' },
    { name: 'Character AI', site: 'https://character.ai', logo: 'https://cdn.simpleicons.org/characterai', color: '#000000' },
  ],

  // Chat & Community Platforms
  chatPlatforms: [
    { name: 'Poe', site: 'https://poe.com', logo: 'https://cdn.simpleicons.org/poe', color: '#000000' },
    { name: 'Quora', site: 'https://quora.com', logo: 'https://cdn.simpleicons.org/quora', color: '#B92B27' },
    { name: 'You.com', site: 'https://you.com', logo: 'https://cdn.simpleicons.org/you', color: '#FF6B35' },
    { name: 'Discord', site: 'https://discord.com', logo: 'https://cdn.simpleicons.org/discord', color: '#5865F2' },
    { name: 'Slack', site: 'https://slack.com', logo: 'https://cdn.simpleicons.org/slack', color: '#E01E5A' },
    { name: 'Telegram', site: 'https://telegram.org', logo: 'https://cdn.simpleicons.org/telegram', color: '#0088cc' },
  ],

  // Hosting & Deployment
  hosting: [
    { name: 'Vercel', site: 'https://vercel.com', logo: 'https://cdn.simpleicons.org/vercel', color: '#000000' },
    { name: 'Netlify', site: 'https://netlify.com', logo: 'https://cdn.simpleicons.org/netlify', color: '#00C7B7' },
    { name: 'Railway', site: 'https://railway.app', logo: 'https://cdn.simpleicons.org/railway', color: '#0B0D0E' },
    { name: 'Render', site: 'https://render.com', logo: 'https://cdn.simpleicons.org/render', color: '#46E3B7' },
    { name: 'Supabase', site: 'https://supabase.com', logo: 'https://cdn.simpleicons.org/supabase', color: '#3ECF8E' },
    { name: 'Firebase', site: 'https://firebase.google.com', logo: 'https://cdn.simpleicons.org/firebase', color: '#FFCA28' },
    { name: 'Docker', site: 'https://docker.com', logo: 'https://cdn.simpleicons.org/docker', color: '#2496ED' },
  ],

  // Cloud Providers
  cloudProviders: [
    { name: 'AWS', site: 'https://aws.amazon.com', logo: 'https://cdn.simpleicons.org/amazonaws', color: '#FF9900' },
    { name: 'Google Cloud', site: 'https://cloud.google.com', logo: 'https://cdn.simpleicons.org/google/4285F4', color: '#4285F4' },
    { name: 'Microsoft Azure', site: 'https://azure.microsoft.com', logo: 'https://cdn.simpleicons.org/microsoft', color: '#0078D4' },
    { name: 'DigitalOcean', site: 'https://digitalocean.com', logo: 'https://cdn.simpleicons.org/digitalocean', color: '#0080FF' },
    { name: 'Cloudflare', site: 'https://cloudflare.com', logo: 'https://cdn.simpleicons.org/cloudflare', color: '#F38020' },
  ],

  // Tech Stack
  techStack: [
    { name: 'React', site: 'https://react.dev', logo: 'https://cdn.simpleicons.org/react/61DAFB', color: '#61DAFB' },
    { name: 'Node.js', site: 'https://nodejs.org', logo: 'https://cdn.simpleicons.org/nodejs', color: '#339933' },
    { name: 'TypeScript', site: 'https://typescriptlang.org', logo: 'https://cdn.simpleicons.org/typescript', color: '#3178C6' },
    { name: 'Python', site: 'https://python.org', logo: 'https://cdn.simpleicons.org/python', color: '#3776AB' },
    { name: 'JavaScript', site: 'https://www.javascript.com', logo: 'https://cdn.simpleicons.org/javascript', color: '#F7DF1E' },
    { name: 'Tailwind CSS', site: 'https://tailwindcss.com', logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4', color: '#06B6D4' },
    { name: 'Next.js', site: 'https://nextjs.org', logo: 'https://cdn.simpleicons.org/nextdotjs', color: '#000000' },
    { name: 'MongoDB', site: 'https://mongodb.com', logo: 'https://cdn.simpleicons.org/mongodb', color: '#13AA52' },
  ],

  // Social Media
  social: [
    { name: 'GitHub', site: 'https://github.com', logo: 'https://cdn.simpleicons.org/github/181717', color: '#181717' },
    { name: 'Twitter/X', site: 'https://x.com', logo: 'https://cdn.simpleicons.org/x', color: '#000000' },
    { name: 'LinkedIn', site: 'https://linkedin.com', logo: 'https://cdn.simpleicons.org/linkedin', color: '#0A66C2' },
    { name: 'YouTube', site: 'https://youtube.com', logo: 'https://cdn.simpleicons.org/youtube', color: '#FF0000' },
    { name: 'Instagram', site: 'https://instagram.com', logo: 'https://cdn.simpleicons.org/instagram', color: '#E4405F' },
    { name: 'Discord', site: 'https://discord.com', logo: 'https://cdn.simpleicons.org/discord', color: '#5865F2' },
    { name: 'Reddit', site: 'https://reddit.com', logo: 'https://cdn.simpleicons.org/reddit', color: '#FF4500' },
  ],

  // Browsers
  browsers: [
    { name: 'Chrome', site: 'https://google.com/chrome', logo: 'https://cdn.simpleicons.org/chrome', color: '#4285F4' },
    { name: 'Firefox', site: 'https://mozilla.org/firefox', logo: 'https://cdn.simpleicons.org/firefox', color: '#FF7139' },
    { name: 'Safari', site: 'https://apple.com/safari', logo: 'https://cdn.simpleicons.org/safari', color: '#000000' },
    { name: 'Brave', site: 'https://brave.com', logo: 'https://cdn.simpleicons.org/brave', color: '#FB542B' },
  ],
};

// Flat list for backwards compatibility
const aiToolsList = [
  ...aiTools.llmProviders,
  ...aiTools.codingTools,
  ...aiTools.imageTools,
  ...aiTools.specializedAI,
  ...aiTools.chatPlatforms,
];

export { aiTools };
export default aiToolsList;