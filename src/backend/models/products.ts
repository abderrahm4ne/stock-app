import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  reference: { type: String, required: true, unique: true },
  description: String,
  unit: { type: String, required: true, default: 'DZD' },
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 0 },
  minStock: { type: Number, default: 0 },
  category: String
}, {
  timestamps: true
});

ProductSchema.index({ reference: 1 });

const Product = mongoose.model('Product', ProductSchema);