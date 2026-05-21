import mongoose from 'mongoose';

export async function connectDB(uri) {
  const mongoUri = uri || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/promptlab';
  try {
    await mongoose.connect(mongoUri, {
      // useNewUrlParser and useUnifiedTopology are default in mongoose v6+
    });
    console.log('MongoDB connected to', mongoUri);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

export default mongoose;