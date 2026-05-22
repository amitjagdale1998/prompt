import fs from 'node:fs/promises';
import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import { z } from 'zod';
import Prompt from '../models/Prompt.js';
import Media from '../models/Media.js';
import User from '../models/User.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { HttpError } from '../middleware/errorHandler.js';
import { env } from '../config/env.js';

const router = Router();

const uploadRoot = path.resolve(env.UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadRoot),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safe}`);
  },
});

const allowedMime = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'application/pdf',
]);

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024, files: 11 },
  fileFilter: (_req, file, cb) => {
    if (!allowedMime.has(file.mimetype)) {
      return cb(new Error(`Unsupported file type: ${file.mimetype}`));
    }
    cb(null, true);
  },
});

const promptUpdateSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  category: z.string().min(2).max(80).optional(),
  description: z.string().min(3).max(5000).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  tags: z.array(z.string().min(1).max(40)).max(20).optional(),
  copyCount: z.number().int().nonnegative().optional(),
});

const userUpdateSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  role: z.enum(['user', 'admin']).optional(),
  status: z.enum(['active', 'suspended']).optional(),
  isVerified: z.boolean().optional(),
});

router.use(requireAuth, requireRole('admin'));

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const [prompts, mediaAssets] = await Promise.all([
      Prompt.countDocuments(),
      Media.countDocuments(),
    ]);
    res.json({ dashboard: { prompts, mediaAssets, tags: 12 } });
  })
);

router.get(
  '/prompts',
  asyncHandler(async (req, res) => {
    const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
    const filter = q
      ? {
          $or: [
            { title: { $regex: q, $options: 'i' } },
            { category: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } },
            { tags: { $regex: q, $options: 'i' } },
          ],
        }
      : {};

    const prompts = await Prompt.find(filter).sort({ createdAt: -1 }).limit(500);
    res.json(prompts);
  })
);

router.patch(
  '/prompts/:id',
  asyncHandler(async (req, res) => {
    const payload = promptUpdateSchema.parse(req.body || {});
    const updated = await Prompt.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
    if (!updated) throw new HttpError(404, 'Prompt not found');
    res.json({ success: true, prompt: updated });
  })
);

router.delete(
  '/prompts/:id',
  asyncHandler(async (req, res) => {
    const prompt = await Prompt.findById(req.params.id);
    if (!prompt) throw new HttpError(404, 'Prompt not found');

    await Promise.all([Prompt.deleteOne({ _id: req.params.id }), Media.deleteMany({ promptId: req.params.id })]);
    res.json({ success: true, message: 'Prompt and related media deleted' });
  })
);

router.get(
  '/media',
  asyncHandler(async (req, res) => {
    const promptId = typeof req.query.promptId === 'string' ? req.query.promptId : undefined;
    const type = typeof req.query.type === 'string' ? req.query.type : undefined;
    const filter = {
      ...(promptId ? { promptId } : {}),
      ...(type ? { type } : {}),
    };
    const media = await Media.find(filter).sort({ createdAt: -1 }).limit(500);
    res.json(media);
  })
);

router.delete(
  '/media/:id',
  asyncHandler(async (req, res) => {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) throw new HttpError(404, 'Media not found');
    res.json({ success: true, message: 'Media deleted' });
  })
);

router.get(
  '/users',
  asyncHandler(async (_req, res) => {
    const users = await User.find().sort({ createdAt: -1 }).limit(500);
    res.json(users);
  })
);

router.patch(
  '/users/:id',
  asyncHandler(async (req, res) => {
    if (req.user.id === req.params.id && req.body?.role && req.body.role !== 'admin') {
      throw new HttpError(400, 'You cannot remove your own admin role');
    }

    const payload = userUpdateSchema.parse(req.body || {});
    const updated = await User.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
    if (!updated) throw new HttpError(404, 'User not found');
    res.json({ success: true, user: updated });
  })
);

router.delete(
  '/users/:id',
  asyncHandler(async (req, res) => {
    if (req.user.id === req.params.id) {
      throw new HttpError(400, 'You cannot delete your own account from admin panel');
    }

    const existing = await User.findById(req.params.id);
    if (!existing) throw new HttpError(404, 'User not found');

    await User.deleteOne({ _id: req.params.id });
    res.json({ success: true, message: 'User deleted' });
  })
);

router.post(
  '/upload-files',
  upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'promptPdf', maxCount: 1 },
  ]),
  asyncHandler(async (req, res) => {
    const { title, category, description, promptText } = req.body;
    const files = req.files || {};
    let createdPrompt = null;
    const mediaItems = [];

    const saveMedia = async (file, type, promptId = null) => {
      const url = `/uploads/${path.basename(file.path)}`;
      const media = await Media.create({
        promptId,
        type,
        url,
        description: description || '',
      });
      mediaItems.push(media);
    };

    if (promptText || files.promptPdf?.length) {
      let promptDescription = description || promptText || '';
      let promptTitle = title || promptText?.slice(0, 100);

      if (!promptTitle && files.promptPdf?.length) {
        const pdfBuffer = await fs.readFile(files.promptPdf[0].path);
        const parsed = await pdfParse(pdfBuffer);
        const text = parsed.text.trim();
        if (text) {
          promptDescription = promptDescription || text;
          promptTitle = text.split('\n').find(Boolean)?.slice(0, 100) || text.slice(0, 100);
        }
      }

      if (promptTitle) {
        createdPrompt = await Prompt.create({
          title: promptTitle,
          category: category || 'General',
          description: promptDescription,
          status: 'published',
          createdBy: req.user._id,
          createdByName: req.user.name || req.user.email,
        });
      }
    }

    for (const file of files.images || []) {
      await saveMedia(file, 'current-image', createdPrompt?._id);
    }
    if (files.promptPdf?.length) {
      await saveMedia(files.promptPdf[0], 'prompt-pdf', createdPrompt?._id);
    }

    res.status(201).json({
      success: true,
      message: 'Upload completed successfully.',
      prompt: createdPrompt,
      media: mediaItems,
    });
  })
);

export default router;
