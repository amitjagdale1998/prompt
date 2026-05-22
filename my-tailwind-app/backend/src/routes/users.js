import { Router } from 'express';
import User from '../models/User.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { HttpError } from '../middleware/errorHandler.js';

const router = Router();

router.use(requireAuth);

router.get(
  '/',
  requireRole('admin'),
  asyncHandler(async (_req, res) => {
    const users = await User.find().sort({ createdAt: -1 }).limit(200);
    res.json(users);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      throw new HttpError(403, 'Insufficient permissions');
    }
    const user = await User.findById(req.params.id);
    if (!user) throw new HttpError(404, 'User not found');
    res.json(user);
  })
);

export default router;
