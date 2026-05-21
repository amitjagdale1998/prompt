import fs from 'fs';
import path from 'path';
import { Router } from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import Prompt from '../models/Prompt.js';
import Media from '../models/Media.js';

const router = Router();
const upload = multer({ dest: path.resolve('uploads') });

router.get('/', async (req, res) => {
  try {
    const [prompts, mediaAssets] = await Promise.all([
      Prompt.countDocuments(),
      Media.countDocuments()
    ]);
    res.json({
      dashboard: {
        prompts,
        mediaAssets,
        tags: 12
      }
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({ error: 'Unable to load admin dashboard' });
  }
});

router.post('/upload-files', upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'promptPdf', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, category, description, promptText } = req.body;
    const files = req.files || {};
    let createdPrompt = null;
    const mediaItems = [];

    const addMedia = async (file, type, promptId = null) => {
      const url = `/uploads/${path.basename(file.path)}`;
      const media = new Media({
        promptId,
        type,
        url,
        description: description || '',
      });
      await media.save();
      mediaItems.push(media);
    };

    if (promptText || files.promptPdf?.length) {
      let promptDescription = description || promptText || '';
      let promptTitle = title || promptText?.slice(0, 100);

      if (!promptTitle && files.promptPdf?.length) {
        const pdfFile = files.promptPdf[0];
        const pdfBuffer = fs.readFileSync(pdfFile.path);
        const parsed = await pdfParse(pdfBuffer);
        const text = parsed.text.trim();
        if (text) {
          promptDescription = promptDescription || text;
          promptTitle = promptTitle || text.split('\n').find(Boolean)?.slice(0, 100) || text.slice(0, 100);
        }
      }

      if (promptTitle) {
        createdPrompt = new Prompt({
          title: promptTitle,
          category: category || 'General',
          description: promptDescription,
          status: 'published'
        });
        await createdPrompt.save();
      }
    }

    if (files.images?.length) {
      for (const file of files.images) {
        await addMedia(file, 'current-image', createdPrompt?.id);
      }
    }

    if (files.promptPdf?.length) {
      const pdfFile = files.promptPdf[0];
      await addMedia(pdfFile, 'prompt-pdf', createdPrompt?.id);
    }

    res.json({
      success: true,
      message: 'Upload completed successfully.',
      prompt: createdPrompt,
      media: mediaItems
    });
  } catch (error) {
    console.error('Admin file upload error:', error);
    res.status(500).json({ error: 'Unable to upload files' });
  }
});

export default router;
