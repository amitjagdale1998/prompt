import { Router } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import { z } from 'zod';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { validate } from '../middleware/validate.js';
import { HttpError } from '../middleware/errorHandler.js';
import { signToken } from '../utils/jwt.js';
import { env, isProd } from '../config/env.js';

const router = Router();

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(128),
  role: z.enum(['user', 'admin']).optional(),
  adminCode: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const verifySchema = z.object({
  token: z.string().min(4),
});

const generateOtp = () => crypto.randomInt(100000, 1000000).toString();

const toPublicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  isVerified: user.isVerified,
});

router.post(
  '/register',
  validate(registerSchema),
  asyncHandler(async (req, res) => {
    const { name, email, password, role, adminCode } = req.body;

    const existing = await User.findOne({ email });
    if (existing) throw new HttpError(409, 'Email already registered. Please login instead.');

    const normalizedRole = role === 'admin' ? 'admin' : 'user';
    if (normalizedRole === 'admin' && adminCode !== env.ADMIN_REGISTRATION_CODE) {
      throw new HttpError(403, 'Valid admin registration code is required for admin accounts.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = generateOtp();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: normalizedRole,
      verificationToken,
      isVerified: false,
    });

    res.status(201).json({
      success: true,
      message: 'Account created. Verify your account with the OTP sent to your email.',
      verificationToken: isProd ? undefined : verificationToken,
      user: toPublicUser(user),
    });
  })
);

router.post(
  '/login',
  validate(loginSchema),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password +verificationToken');
    if (!user) throw new HttpError(401, 'Invalid email or password.');

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new HttpError(401, 'Invalid email or password.');

    if (!user.isVerified) {
      return res.status(403).json({
        error: 'Email verification required before login.',
        requiresVerification: true,
        verificationToken: isProd ? undefined : user.verificationToken,
      });
    }

    res.json({ success: true, token: signToken(user), user: toPublicUser(user) });
  })
);

router.post(
  '/verify',
  validate(verifySchema),
  asyncHandler(async (req, res) => {
    const user = await User.findOne({ verificationToken: req.body.token }).select('+verificationToken');
    if (!user) throw new HttpError(404, 'Invalid verification token.');

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.json({
      success: true,
      message: 'Email verified successfully. You can now login.',
      user: toPublicUser(user),
    });
  })
);

router.post('/logout', (_req, res) => {
  res.json({ success: true, message: 'Logged out successfully.' });
});

router.get(
  '/me',
  requireAuth,
  asyncHandler(async (req, res) => {
    res.json({ user: toPublicUser(req.user) });
  })
);

export default router;
