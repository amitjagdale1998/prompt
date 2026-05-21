import mongoose from '../db.js';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true, sparse: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;