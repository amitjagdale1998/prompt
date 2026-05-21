import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import adminRoutes from './routes/admin.js';
import authRoutes from './routes/auth.js';
import promptRoutes from './routes/prompts.js';
import userRoutes from './routes/users.js';
import { connectDB } from './db.js';
import path from 'path';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.json({ message: 'Prompt Lab backend is running' });
});

app.use('/uploads', express.static(path.resolve('uploads')));
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/prompts', promptRoutes);
app.use('/api/users', userRoutes);

async function start() {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, () => {
      console.log(`Backend listening on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Failed to start server due to DB connection error');
    process.exit(1);
  }
}

start();
