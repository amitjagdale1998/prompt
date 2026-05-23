import mongoose from '../db.js';

const { Schema } = mongoose;

const PromptSchema = new Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  category: { type: String, trim: true, index: true },
  description: { type: String, trim: true },
  promptText: { type: String, trim: true },
  tags: [{ type: String, trim: true, lowercase: true }],
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft', index: true },
  copyCount: { type: Number, default: 0, min: 0 },
  
  // Media references for before/after showcase
  media: {
    beforeImage: { type: String, trim: true }, // URL to before image
    afterImage: { type: String, trim: true },  // URL to after image
    videoUrl: { type: String, trim: true },    // URL to demo video
    audioUrl: { type: String, trim: true },    // URL to demo audio
    description: { type: String, trim: true }  // How the prompt was used
  },
  
  // Additional metadata
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  useCases: [{ type: String, trim: true }],
  aiTools: [{ type: String, trim: true }], // Which AI tools work best
  rating: { type: Number, min: 0, max: 5, default: 0 },
  ratingCount: { type: Number, default: 0 },
  
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

// Index for better performance on large datasets
PromptSchema.index({ category: 1, status: 1 });
PromptSchema.index({ tags: 1 });
PromptSchema.index({ copyCount: -1 });
PromptSchema.index({ createdAt: -1 });

const Prompt = mongoose.models.Prompt || mongoose.model('Prompt', PromptSchema);
export default Prompt;