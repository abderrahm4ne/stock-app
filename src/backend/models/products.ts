import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reference: { type: String },
  descreption: { type: String },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  
});

const Product = mongoose.model('Product', productSchema);
export default Product;