// const mongoose = require('mongoose');

// const ExpenseSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   billNumber: {
//     type: String,
//     required: true,
//   },
//   vendorName: {
//     type: String,
//     required: true
//   },
//   amount: {
//     type: Number,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['Paid', 'Pending', 'Overdue'],
//     default: 'Pending'
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Expense', ExpenseSchema);

















const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  billNumber: {
    type: String,
    required: true,
  },
  vendorName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  // ─── ADDED GST FIELDS FOR FRONTEND COMPLIANCE ───
  gstRate: {
    type: Number,
    default: 18
  },
  gstType: {
    type: String,
    enum: ['Intra-State', 'Inter-State'],
    default: 'Intra-State'
  },
  status: {
    type: String,
    enum: ['Paid', 'Pending', 'Overdue'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Expense', ExpenseSchema);

