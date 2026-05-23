import mongoose from '../db.js';

const { Schema } = mongoose;

const TestimonialSchema = new Schema({
  quote: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  role: { type: String, trim: true },
  avatarUrl: { type: String, trim: true },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
export default Testimonial;
