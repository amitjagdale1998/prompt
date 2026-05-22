import { env } from './config/env.js';
import app from './app.js';
import { connectDB } from './db.js';

const shutdown = (signal) => {
  console.log(`Received ${signal}. Shutting down gracefully...`);
  process.exit(0);
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
});

async function start() {
  try {
    await connectDB();
    app.listen(env.PORT, () => {
      console.log(`Backend listening on http://localhost:${env.PORT} (${env.NODE_ENV})`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
