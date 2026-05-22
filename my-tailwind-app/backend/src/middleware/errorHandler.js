import { ZodError } from 'zod';
import { isProd } from '../config/env.js';

export class HttpError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export const notFoundHandler = (req, res, _next) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
};

export const errorHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
    });
  }

  if (err?.name === 'ValidationError') {
    return res.status(400).json({ error: 'Validation failed', details: err.errors });
  }

  if (err?.code === 11000) {
    return res.status(409).json({ error: 'Resource already exists', details: err.keyValue });
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message, details: err.details });
  }

  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(isProd ? {} : { stack: err.stack }),
  });
};
