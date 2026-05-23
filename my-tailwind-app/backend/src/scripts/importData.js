import fs from 'node:fs/promises';
import mongoose from '../db.js';
import { connectDB } from '../db.js';
import Prompt from '../models/Prompt.js';

async function importFromJson() {
  try {
    const raw = await fs.readFile(new URL('../data.json', import.meta.url), 'utf8');
    const items = JSON.parse(raw);

    if (!Array.isArray(items)) {
      throw new Error('data.json must contain an array of prompt objects.');
    }

    await connectDB();

    let created = 0;
    let updated = 0;

    for (const item of items) {
      if (!item?.title) continue;

      const doc = {
        title: item.title,
        category: item.category || 'image',
        description: item.description || '',
        promptText: item.promptText || '',
        tags: Array.isArray(item.tags) ? item.tags : [],
        difficulty: item.difficulty || 'beginner',
        useCases: Array.isArray(item.useCases) ? item.useCases : [],
        aiTools: Array.isArray(item.aiTools) ? item.aiTools : [],
        copyCount: Number.isFinite(item.copyCount) ? item.copyCount : 0,
        rating: Number.isFinite(item.rating) ? item.rating : 0,
        ratingCount: Number.isFinite(item.ratingCount) ? item.ratingCount : 0,
        status: 'published',
        media: {
          beforeImage: item.imageUrl || '',
          description: item.description || '',
        },
      };

      const existing = await Prompt.findOne({ title: doc.title });
      if (existing) {
        Object.assign(existing, doc);
        await existing.save();
        updated += 1;
      } else {
        await Prompt.create(doc);
        created += 1;
      }
    }

    console.log(`Import complete. Created: ${created}, Updated: ${updated}, Total source: ${items.length}`);
  } catch (err) {
    console.error('Import failed:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

importFromJson();
