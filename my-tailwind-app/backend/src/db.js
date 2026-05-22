import mongoose from 'mongoose';
import { env } from './config/env.js';

mongoose.set('strictQuery', true);

export async function connectDB(uri = env.MONGODB_URI) {
  await mongoose.connect(uri, { autoIndex: env.NODE_ENV !== 'production' });
  console.log(`MongoDB connected: ${uri}`);
  return mongoose.connection;
}

export default mongoose;
