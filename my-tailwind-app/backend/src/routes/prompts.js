import { Router } from 'express';
import Prompt from '../models/Prompt.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

const videoLibrary = [
  {
    id: 1,
    title: 'Prompt Setup for AI Audio Editing',
    description: 'Learn how to write prompts that improve audio quality and transcription accuracy.',
    url: 'https://example.com/videos/audio-prompt-tutorial'
  },
  {
    id: 2,
    title: 'Document Prompt Best Practices',
    description: 'A guide for creating effective prompt templates for documents and SEO content.',
    url: 'https://example.com/videos/document-prompt-guide'
  }
];

router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    const filter = q
      ? {
          $or: [
            { title: { $regex: q, $options: 'i' } },
            { category: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } },
            { tags: { $regex: q, $options: 'i' } }
          ]
        }
      : {};

    let prompts = await Prompt.find(filter).sort({ copyCount: -1, createdAt: -1 });
    if (!prompts.length) {
      prompts = await Prompt.insertMany([
        {
          title: 'AI Document Rewrite',
          category: 'Document Editing',
          description: 'Convert technical documentation into clearer, user-friendly writing.',
          status: 'published',
          copyCount: 132
        },
        {
          title: 'Audio Cleanup Prompt',
          category: 'Audio Editing',
          description: 'Enhance voice clarity and remove background noise for podcasts and clips.',
          status: 'published',
          copyCount: 98
        },
        {
          title: 'Image Prompt Generator',
          category: 'Image Generation',
          description: 'Generate a structured prompt for modern product mockups or landing page visuals.',
          status: 'published',
          copyCount: 85
        }
      ]);
    }
    res.json(prompts);
  } catch (error) {
    console.error('Error fetching prompts:', error);
    res.status(500).json({ error: 'Unable to fetch prompts' });
  }
});

router.post('/upload-text', authMiddleware, async (req, res) => {
  const { promptText, category, description } = req.body;
  if (!promptText || !category) {
    return res.status(400).json({ error: 'promptText and category are required' });
  }

  try {
    const newPrompt = new Prompt({
      title: promptText.slice(0, 100),
      category,
      description: description || promptText,
      status: 'published',
      createdBy: req.user._id,
      createdByName: req.user.name || req.user.email
    });
    await newPrompt.save();
    res.json({ success: true, message: 'Prompt text uploaded successfully.', prompt: newPrompt });
  } catch (error) {
    console.error('Error saving prompt:', error);
    res.status(500).json({ error: 'Unable to save prompt' });
  }
});

router.post('/:id/copy', async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);
    if (!prompt) {
      return res.status(404).json({ error: 'Prompt not found' });
    }
    prompt.copyCount += 1;
    await prompt.save();
    res.json({ success: true, prompt });
  } catch (error) {
    console.error('Error updating copy count:', error);
    res.status(500).json({ error: 'Unable to update prompt copy count' });
  }
});

router.get('/videos', (req, res) => {
  res.json(videoLibrary);
});

router.get('/videos/:id', (req, res) => {
  const video = videoLibrary.find((item) => item.id === Number(req.params.id));
  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }
  res.json(video);
});

router.get('/:id', async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);
    if (!prompt) {
      return res.status(404).json({ error: 'Prompt not found' });
    }
    res.json(prompt);
  } catch (error) {
    console.error('Error fetching prompt by id:', error);
    res.status(500).json({ error: 'Unable to fetch prompt' });
  }
});

export default router;
