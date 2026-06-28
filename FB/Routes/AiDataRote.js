// FB/Routes/AiDataRote.js
const express = require('express');
const router = express.Router();
const Bill = require('../Models/Bills');
const Expense = require('../Models/Expenses');
const Inventory = require('../Models/Inventory');
const Invoice = require('../Models/Invoice');

// Internal endpoint for your Python AI node to query data
router.post('/api/internal/ai-query', async (req, res) => {
  try {
    const { collection, status, userId } = req.body;
    
    // Fallback to query all records if no user ID is specified yet during local testing
    const query = {}; 
    if (userId && userId !== "YOUR_TEST_USER_ID") {
      query.user = userId;
    }
    if (status) query.status = status;

    let records = [];
    switch (collection) {
      case 'invoices': 
        records = await Invoice.find(query).lean(); 
        break;
      case 'expenses': 
        records = await Expense.find(query).lean(); 
        break;
      case 'bills':    
        records = await Bill.find(query).lean(); 
        break;
      case 'inventory': 
        records = await Inventory.find(query).lean(); 
        break;
      default:
        return res.status(400).json({ error: "Invalid collection type" });
    }

    return res.json({ success: true, data: records });
  } catch (error) {
    console.error("Database query failed inside Node:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;