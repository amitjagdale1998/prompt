import fs from 'node:fs/promises';
import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import Prompt from '../models/Prompt.js';
import Media from '../models/Media.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
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
