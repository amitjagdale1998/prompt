import mongoose from '../db.js';

const { Schema } = mongoose;

const MediaSchema = new Schema({
  promptId: { type: Schema.Types.ObjectId, ref: 'Prompt' },
  type: { type: String, enum: ['current-image', 'ai-image', 'video', 'prompt-pdf'], default: 'current-image' },
  url: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const Media = mongoose.models.Media || mongoose.model('Media', MediaSchema);
export default Media;