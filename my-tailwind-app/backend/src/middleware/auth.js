import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const jwtSecret = process.env.JWT_SECRET || 'promptlab-secret';

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '').trim();

  if (!token) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    const user = await User.findById(payload.userId);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
