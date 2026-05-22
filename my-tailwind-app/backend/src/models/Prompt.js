import mongoose from '../db.js';

const { Schema } = mongoose;

const PromptSchema = new Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  category: { type: String, trim: true, index: true },
  description: { type: String, trim: true },
  tags: [{ type: String, trim: true, lowercase: true }],
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft', index: true },
  copyCount: { type: Number, default: 0, min: 0 },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdByName: { type: String, trim: true },
}, {
  timestamps: true,
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