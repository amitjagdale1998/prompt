import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import Testimonial from '../models/Testimonial.js';
import SiteStat from '../models/SiteStat.js';
import Category from '../models/Category.js';

const router = Router();

// Public endpoints
router.get('/testimonials', asyncHandler(async (_req, res) => {
  const items = await Testimonial.find({ active: true }).sort({ order: 1, createdAt: -1 }).limit(20);
  res.json(items);
}));

router.get('/stats', asyncHandler(async (_req, res) => {
  const items = await SiteStat.find().sort({ order: 1 }).lean();
  const result = {};
  for (const it of items) result[it.key] = { label: it.label, value: it.value };
  res.json(result);
}));

router.get('/categories', asyncHandler(async (_req, res) => {
  const items = await Category.find({ active: true }).sort({ order: 1 }).lean();
  const out = items.map(i => ({ value: i.value, label: i.label }));
  res.json(out);
}));

export default router;
