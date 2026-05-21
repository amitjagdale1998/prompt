import mongoose from '../db.js';

const { Schema } = mongoose;

const PromptSchema = new Schema({
  title: { type: String, required: true },
  category: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'draft' },
  copyCount: { type: Number, default: 0 }
}, {
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  },
  toObject: {
    virtuals: true
  }
});

const Prompt = mongoose.models.Prompt || mongoose.model('Prompt', PromptSchema);
export default Prompt;