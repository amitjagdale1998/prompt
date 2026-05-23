import mongoose from '../db.js';

const { Schema } = mongoose;

const CategorySchema = new Schema({
  value: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
export default Category;
