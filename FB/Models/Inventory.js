const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true,
    unique: false // Can have duplicates if from different users
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  unitPrice: {
    type: Number,
    required: true
  },
  totalValue: {
    type: Number,
    default: 0 // quantity * unitPrice
  },
  status: {
    type: String,
    enum: ['In Stock', 'Low Stock', 'Out of Stock'],
    default: 'In Stock'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update totalValue and status before saving
InventorySchema.pre('save', async function() {
  this.totalValue = this.quantity * this.unitPrice;
  
  // Auto-update status based on quantity
  if (this.quantity === 0) {
    this.status = 'Out of Stock';
  } else if (this.quantity <= 10) {
    this.status = 'Low Stock';
  } else {
    this.status = 'In Stock';
  }
  
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('Inventory', InventorySchema);
