import { Router } from 'express';
import { z } from 'zod';
import Prompt from '../models/Prompt.js';
import Media from '../models/Media.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { validate } from '../middleware/validate.js';
import { HttpError } from '../middleware/errorHandler.js';

const router = Router();

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const uploadTextSchema = z.object({
  promptText: z.string().min(5).max(5000),
  category: z.string().min(2).max(80),
  description: z.string().max(5000).optional(),
});

const videoLibrary = [
  {
    id: 1,
    title: 'Prompt Setup for AI Audio Editing',
    description: 'Learn how to write prompts that improve audio quality and transcription accuracy.',
    url: 'https://example.com/videos/audio-prompt-tutorial',
  },
  {
    id: 2,
    title: 'Document Prompt Best Practices',
    description: 'A guide for creating effective prompt templates for documents and SEO content.',
    url: 'https://example.com/videos/document-prompt-guide',
  },
];

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
    const filter = { status: 'published' };
    if (q) {
      const re = new RegExp(escapeRegex(q), 'i');
      filter.$or = [{ title: re }, { category: re }, { description: re }, { tags: re }];
    }
    const prompts = await Prompt.find(filter).sort({ copyCount: -1, createdAt: -1 }).limit(200);
    res.json(prompts);
  })
);

router.post(
  '/upload-text',
  requireAuth,
  validate(uploadTextSchema),
  asyncHandler(async (req, res) => {
    const { promptText, category, description } = req.body;
    const prompt = await Prompt.create({
      title: promptText.slice(0, 100),
      category,
      description: description || promptText,
      status: 'published',
      createdBy: req.user._id,
      createdByName: req.user.name || req.user.email,
    });
    res.status(201).json({ success: true, message: 'Prompt text uploaded successfully.', prompt });
  })
);

router.post(
  '/:id/copy',
  asyncHandler(async (req, res) => {
    const prompt = await Prompt.findByIdAndUpdate(
      req.params.id,
      { $inc: { copyCount: 1 } },
      { new: true }
    );
    if (!prompt) throw new HttpError(404, 'Prompt not found');
    res.json({ success: true, prompt });
  })
);

router.get('/videos', (_req, res) => res.json(videoLibrary));

router.get('/videos/:id', (req, res, next) => {
  const video = videoLibrary.find((item) => item.id === Number(req.params.id));
  if (!video) return next(new HttpError(404, 'Video not found'));
  res.json(video);
});

router.get(
  '/media/:promptId',
  asyncHandler(async (req, res) => {
    const items = await Media.find({ promptId: req.params.promptId }).sort({ createdAt: -1 });
    res.json({ promptId: req.params.promptId, mediaItems: items });
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const prompt = await Prompt.findById(req.params.id);
    if (!prompt) throw new HttpError(404, 'Prompt not found');
    res.json(prompt);
  })
);

export default router;
