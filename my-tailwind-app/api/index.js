import serverless from 'serverless-http';
import app from '../backend/src/app.js';
import { connectDB } from '../backend/src/db.js';
import { env } from '../backend/src/config/env.js';

let initialized = false;

export const handler = async (req, res) => {
  if (!initialized) {
    initialized = true;
    await connectDB();
  }

  const handlerFn = serverless(app, {
    binary: ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'video/mp4'],
  });

  return handlerFn(req, res);
};
