import mongoose from '../db.js';

const { Schema } = mongoose;

const SiteStatSchema = new Schema({
  key: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const SiteStat = mongoose.models.SiteStat || mongoose.model('SiteStat', SiteStatSchema);
export default SiteStat;
