import mongoose, { Schema } from "mongoose";

const FactorSchema = new Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  type: { type: String, enum: ['sale', 'purchase'], required: true },
  date: { type: Date, default: Date.now },
  items: [{
    name: { type: String, required: true },
    reference: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    total: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  status: { type: String, enum: ['draft', 'sent', 'paid'], default: 'draft' },
  notes: String
}, {
  timestamps: true
});

FactorSchema.index({ invoiceNumber: 1 });

FactorSchema.post('save', async function(doc, next) {
  if (!doc.isNew) return next();

  const Product = mongoose.model('Product');
  const Client = mongoose.model('Client');

  for (const item of doc.items) {
    const product = await Product.findOne({ reference: item.reference });
    if (product) {
      if (doc.type === 'sale') {
        product.quantity = Math.max(0, product.quantity - item.quantity);
      } else if (doc.type === 'purchase') {
        product.quantity += item.quantity;
      }
      await product.save();
    }
  }

  const client = await Client.findById(doc.client);
  if (client) {
    const now = new Date();
    client.purchaseHistory.push(
      ...doc.items.map(item => ({
        productName: item.name,
        productReference: item.reference,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.total,
        purchaseDate: now,
        invoiceNumber: doc.invoiceNumber
      }))
    );
    client.totalSpent += doc.total;
    client.lastPurchaseDate = now;
    await client.save();
  }

  next();
});


FactorSchema.pre('save', function(next) {
  this.items.forEach(item => {
    item.total = item.quantity * item.unitPrice;
  });
  this.total = this.items.reduce((sum, i) => sum + i.total, 0);
  next();
});

const Factor = mongoose.model('Factor', FactorSchema);