
// const express = require('express');
// const router = express.Router();
// const Invoice = require('../models/Invoice');
// const Expense = require('../models/Expense');
// const { requireAuth } = require('../middleware/authMiddleware'); 

// // ─── INVOICE ROUTES ──────────────────────────────────────────────────────────
// // 1. Add New Invoice
// router.post('/add-invoice', requireAuth, async (req, res) => {
//   try {
//     const { invoiceNumber, clientName, amount, status } = req.body;
//     const newInvoice = new Invoice({
//       user: req.user.id, 
//       invoiceNumber,
//       clientName,
//       amount: Number(amount),
//       status
//     });
//     await newInvoice.save();
//     res.status(201).json({ success: true, message: "Invoice added successfully!", invoice: newInvoice });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // 🌟 FIX 2: Added exact user match segregation logic
// router.get('/Invoices', requireAuth, async (req, res) => {
//   try {
//     const invoices = await Invoice.find({ user: req.user.id }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, invoices });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // ─── EXPENSE ROUTES ──────────────────────────────────────────────────────────
// // 2. Add New Expense/Bill
// router.post('/add-expense', requireAuth, async (req, res) => {
//   try {
//     const { billNumber, vendorName, amount, status } = req.body;
//     const newExpense = new Expense({
//       user: req.user.id,
//       billNumber,
//       vendorName,
//       amount: Number(amount),
//       status
//     });
//     await newExpense.save();
//     res.status(201).json({ success: true, message: "Expense bill added successfully!", expense: newExpense });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // 🌟 FIX 3: Added exact user match segregation logic
// router.get('/Expenses', requireAuth, async (req, res) => {
//   try {
//     const bills = await Expense.find({ user: req.user.id }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, bills });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// module.exports = router;













// const express = require('express');
// const router = express.Router();
// const Invoice = require('../models/Invoice');
// const Expense = require('../models/Expense');
// const { requireAuth } = require('../middleware/authMiddleware'); 

// // ─── INVOICE ROUTES ──────────────────────────────────────────────────────────
// // 1. Add New Invoice
// router.post('/add-invoice', requireAuth, async (req, res) => {
//   try {
//     // Destructured gstRate and gstType from front-end body submission
//     const { invoiceNumber, clientName, amount, status, gstRate, gstType } = req.body;
//     const newInvoice = new Invoice({
//       user: req.user.id, 
//       invoiceNumber,
//       clientName,
//       amount: Number(amount),
//       status,
//       gstRate: gstRate ? Number(gstRate) : 18,
//       gstType: gstType || 'Intra-State'
//     });
//     await newInvoice.save();
//     res.status(201).json({ success: true, message: "Invoice added successfully!", invoice: newInvoice });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // GET Invoices List
// router.get('/Invoices', requireAuth, async (req, res) => {
//   try {
//     const invoices = await Invoice.find({ user: req.user.id }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, invoices });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // ─── EXPENSE ROUTES ──────────────────────────────────────────────────────────
// // 2. Add New Expense/Bill
// router.post('/add-expense', requireAuth, async (req, res) => {
//   try {
//     // Destructured gstRate and gstType from front-end body submission
//     const { billNumber, vendorName, amount, status, gstRate, gstType } = req.body;
//     const newExpense = new Expense({
//       user: req.user.id,
//       billNumber,
//       vendorName,
//       amount: Number(amount),
//       status,
//       gstRate: gstRate ? Number(gstRate) : 18,
//       gstType: gstType || 'Intra-State'
//     });
//     await newExpense.save();
//     res.status(201).json({ success: true, message: "Expense bill added successfully!", expense: newExpense });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // GET Expenses/Bills List
// router.get('/Expenses', requireAuth, async (req, res) => {
//   try {
//     const bills = await Expense.find({ user: req.user.id }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, bills });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// module.exports = router;




















const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const Expense = require('../models/Expense');
const { requireAuth } = require('../middleware/authMiddleware'); 

// ─── INVOICE ROUTES ──────────────────────────────────────────────────────────
// 1. Add New Invoice (UPDATED TO CAPTURE GST)
router.post('/add-invoice', requireAuth, async (req, res) => {
  try {
    const { invoiceNumber, clientName, amount, status, gstRate, gstType } = req.body;
    
    const newInvoice = new Invoice({
      user: req.user.id, 
      invoiceNumber,
      clientName,
      amount: Number(amount),
      status,
      gstRate: gstRate ? Number(gstRate) : 18,
      gstType: gstType || 'Intra-State'
    });
    
    await newInvoice.save();
    res.status(201).json({ success: true, message: "Invoice added successfully!", invoice: newInvoice });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET Invoices List
router.get('/Invoices', requireAuth, async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, invoices });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─── EXPENSE ROUTES ──────────────────────────────────────────────────────────
// 2. Add New Expense/Bill
router.post('/add-expense', requireAuth, async (req, res) => {
  try {
    const { billNumber, vendorName, amount, status, gstRate, gstType } = req.body;
    
    const newExpense = new Expense({
      user: req.user.id,
      billNumber,
      vendorName,
      amount: Number(amount),
      status,
      gstRate: gstRate ? Number(gstRate) : 18,
      gstType: gstType || 'Intra-State'
    });
    
    await newExpense.save();
    res.status(201).json({ success: true, message: "Expense bill added successfully!", expense: newExpense });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET Expenses/Bills List
router.get('/Expenses', requireAuth, async (req, res) => {
  try {
    const bills = await Expense.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, bills });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;