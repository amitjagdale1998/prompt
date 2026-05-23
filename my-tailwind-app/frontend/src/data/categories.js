export const CATEGORIES = [
  { value: 'all', label: '🎯 All Prompts' },
  { value: 'code', label: '💻 Code Editing' },
  { value: 'image', label: '🎨 Image Editing' },
  { value: 'video', label: '🎬 Video Editing' },
  { value: 'document', label: '📄 Document Writing' },
  { value: 'audio', label: '🎵 Audio Processing' },
  { value: 'marketing', label: '📢 Marketing Content' },
  { value: 'design', label: '🎭 Design & Branding' },
  { value: 'analysis', label: '📊 Data Analysis' },
  { value: 'business', label: '💼 Business' },
  { value: 'learning', label: '📚 Educational' },
];

// Admin category options (without 'All')
export const ADMIN_CATEGORIES = CATEGORIES.filter(cat => cat.value !== 'all');
