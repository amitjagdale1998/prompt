import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();
const jwtSecret = process.env.JWT_SECRET || 'promptlab-secret';

const createToken = (user) =>
  jwt.sign({ userId: user._id, email: user.email, role: user.role }, jwtSecret, {
    expiresIn: '7d'
  });

router.post('/register', async (req, res) => {
  const { name, email, password, role, adminCode } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered. Please login instead.' });
    }

    const normalizedRole = role === 'admin' ? 'admin' : 'user';
    if (normalizedRole === 'admin') {
      const expectedAdminCode = process.env.ADMIN_REGISTRATION_CODE || 'admin-secret';
      if (!adminCode || adminCode !== expectedAdminCode) {
        return res.status(403).json({ error: 'Valid admin registration code is required for admin accounts.' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: normalizedRole,
      verificationToken,
      isVerified: false
    });

    await user.save();

    res.json({
      success: true,
      message: 'Account created. Verify your account with the OTP sent to your email.',
      verificationToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Unable to create account.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        error: 'Email verification required before login.',
        requiresVerification: true,
        verificationToken: user.verificationToken
      });
    }

    const token = createToken(user);
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Unable to login.' });
  }
});

router.post('/verify', async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: 'Verification token is required.' });
  }

  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ error: 'Invalid verification token.' });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.json({
      success: true,
      message: 'Email verified successfully. You can now login.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Unable to verify email.' });
  }
});

router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully.' });
});

router.get('/me', authMiddleware, async (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      isVerified: req.user.isVerified
    }
  });
});

export default router;
