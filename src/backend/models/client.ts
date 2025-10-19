import mongoose, { Schema } from 'mongoose';

const ClientSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  purchaseHistory: [{
    productName: String,
    productReference: String,
    quantity: Number,
    unitPrice: Number,
    total: Number,
    purchaseDate: { type: Date, default: Date.now },
    invoiceNumber: String
  }],
  expectedProducts: [{
    productName: String,
    reference: String,
    expectedQuantity: Number,
    unit: String,
    expectedPrice: Number,
    notes: String,
    expectedDate: Date
  }],
  totalSpent: { type: Number, default: 0 },
  lastPurchaseDate: Date
}, {
  timestamps: true
});

ClientSchema.index({ name: 1 });

const Client = mongoose.model('Client', ClientSchema);