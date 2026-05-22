import User from '../models/User.js';
import { verifyToken } from '../utils/jwt.js';
import { HttpError } from './errorHandler.js';
import { asyncHandler } from './asyncHandler.js';

export const requireAuth = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (!token) throw new HttpError(401, 'Authorization token required');

  let payload;
  try {
    payload = verifyToken(token);
  } catch {
    throw new HttpError(401, 'Invalid or expired token');
  }

  const user = await User.findById(payload.sub);
  if (!user || user.status !== 'active') throw new HttpError(401, 'Invalid token');

  req.user = user;
  next();
});

export const requireRole = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new HttpError(403, 'Insufficient permissions'));
  }
  next();
};

export default requireAuth;

