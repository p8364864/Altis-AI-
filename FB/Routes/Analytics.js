// const express = require('express');
// const router = express.Router();
// const Invoice = require('../models/Invoice');
// const Expense = require('../models/Expense');
// const Bill = require('../models/Bill');
// const mongoose = require('mongoose');

// // 🌟 FIX 1: Import requireAuth taaki logged-in user ki session identity directly mil sake
// const { requireAuth } = require('../middleware/authMiddleware'); 

// // ─── 1. TOTAL REVENUE ROUTE ──────────────────────────────────────────────────
// router.get('/total-revenue', requireAuth, async (req, res) => {
//   try {
//     const userId = new mongoose.Types.ObjectId(req.user.id);

//     // Calculate Grand Total Revenue
//     const totalRevenueData = await Invoice.aggregate([
//       { $match: { user: userId, status: 'Paid' } }, // 🌟 User Specific Filter
//       { $group: { _id: null, total: { $sum: '$amount' } } }
//     ]);
//     const totalRevenue = totalRevenueData[0]?.total || 0;

//     // Growth Logic (Current Month vs Previous Month)
//     const now = new Date();
//     const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//     const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

//     // Current Month Total
//     const currentMonthData = await Invoice.aggregate([
//       { $match: { user: userId, status: 'Paid', createdAt: { $gte: startOfCurrentMonth } } },
//       { $group: { _id: null, total: { $sum: '$amount' } } }
//     ]);

//     // Previous Month Total
//     const previousMonthData = await Invoice.aggregate([
//       { $match: { user: userId, status: 'Paid', createdAt: { $gte: startOfPreviousMonth, $lt: startOfCurrentMonth } } },
//       { $group: { _id: null, total: { $sum: '$amount' } } }
//     ]);

//     const currentTotal = currentMonthData[0]?.total || 0;
//     const previousTotal = previousMonthData[0]?.total || 0;

//     let revenueGrowth = 0;
//     if (previousTotal > 0) {
//       revenueGrowth = ((currentTotal - previousTotal) / previousTotal) * 100;
//     } else if (currentTotal > 0) {
//       revenueGrowth = 100;
//     }

//     res.json({
//       success: true,
//       totalRevenue,
//       revenueGrowth: parseFloat(revenueGrowth.toFixed(1))
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // ─── 2. TOTAL EXPENSES ROUTE ─────────────────────────────────────────────────
// router.get('/total-expenses', requireAuth, async (req, res) => {
//   try {
//     const userId = new mongoose.Types.ObjectId(req.user.id);

//     const totalExpensesData = await Expense.aggregate([
//       { $match: { user: userId, status: 'Paid' } }, // 🌟 User Specific Filter
//       { $group: { _id: null, total: { $sum: '$amount' } } }
//     ]);
//     const totalExpenses = totalExpensesData[0]?.total || 0;

//     const now = new Date();
//     const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//     const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

//     const currentMonthData = await Expense.aggregate([
//       { $match: { user: userId, status: 'Paid', createdAt: { $gte: startOfCurrentMonth } } },
//       { $group: { _id: null, total: { $sum: '$amount' } } }
//     ]);

//     const previousMonthData = await Expense.aggregate([
//       { $match: { user: userId, status: 'Paid', createdAt: { $gte: startOfPreviousMonth, $lt: startOfCurrentMonth } } },
//       { $group: { _id: null, total: { $sum: '$amount' } } }
//     ]);

//     const currentTotal = currentMonthData[0]?.total || 0;
//     const previousTotal = previousMonthData[0]?.total || 0;

//     let expenseGrowth = 0;
//     if (previousTotal > 0) {
//       expenseGrowth = ((currentTotal - previousTotal) / previousTotal) * 100;
//     } else if (currentTotal > 0) {
//       expenseGrowth = 100;
//     }

//     res.json({
//       success: true,
//       totalExpenses,
//       expenseGrowth: parseFloat(expenseGrowth.toFixed(1))
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // ─── 3. NET PROFIT ROUTE ─────────────────────────────────────────────────────
// router.get('/net-profit', requireAuth, async (req, res) => {
//   try {
//     const userId = new mongoose.Types.ObjectId(req.user.id);

//     const totalRevenueData = await Invoice.aggregate([
//       { $match: { user: userId, status: 'Paid' } },
//       { $group: { _id: null, total: { $sum: '$amount' } } }
//     ]);
//     const totalRevenue = totalRevenueData[0]?.total || 0;

//     const totalExpensesData = await Expense.aggregate([
//       { $match: { user: userId, status: 'Paid' } },
//       { $group: { _id: null, total: { $sum: '$amount' } } }
//     ]);
//     const totalExpenses = totalExpensesData[0]?.total || 0;

//     const lifetimeNetProfit = totalRevenue - totalExpenses;

//     const now = new Date();
//     const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//     const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

//     const currentRev = await Invoice.aggregate([
//       { $match: { user: userId, status: 'Paid', createdAt: { $gte: startOfCurrentMonth } } },
//       { $group: { _id: null, total: { $sum: '$amount' } } }
//     ]);
//     const currentExp = await Expense.aggregate([
//       { $match: { user: userId, status: 'Paid', createdAt: { $gte: startOfCurrentMonth } } },
//       { $group: { _id: null, total: { $sum: '$amount' } } }
//     ]);
//     const currentMonthProfit = (currentRev[0]?.total || 0) - (currentExp[0]?.total || 0);

//     const prevRev = await Invoice.aggregate([
//       { $match: { user: userId, status: 'Paid', createdAt: { $gte: startOfPreviousMonth, $lt: startOfCurrentMonth } } },
//       { $group: { _id: null, total: { $sum: '$amount' } } }
//     ]);
//     const prevExp = await Expense.aggregate([
//       { $match: { user: userId, status: 'Paid', createdAt: { $gte: startOfPreviousMonth, $lt: startOfCurrentMonth } } },
//       { $group: { _id: null, total: { $sum: '$amount' } } }
//     ]);
//     const prevMonthProfit = (prevRev[0]?.total || 0) - (prevExp[0]?.total || 0);

//     let profitGrowth = 0;
//     if (prevMonthProfit > 0) {
//       profitGrowth = ((currentMonthProfit - prevMonthProfit) / prevMonthProfit) * 100;
//     } else if (currentMonthProfit > 0) {
//       profitGrowth = 100;
//     }

//     res.json({
//       success: true,
//       netProfit: lifetimeNetProfit,
//       profitGrowth: parseFloat(profitGrowth.toFixed(1))
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // ─── 4. ACCOUNTS RECEIVABLE ROUTE ────────────────────────────────────────────
// router.get('/accounts-receivable', requireAuth, async (req, res) => {
//   try {
//     const userId = new mongoose.Types.ObjectId(req.user.id);

//     const receivableData = await Invoice.aggregate([
//       { $match: { user: userId, status: { $in: ['Pending', 'Overdue'] } } },
//       { $group: { _id: null, total: { $sum: '$amount' } } }
//     ]);
//     const totalReceivable = receivableData[0]?.total || 0;

//     const overdueCount = await Invoice.countDocuments({ user: userId, status: 'Overdue' });

//     res.json({
//       success: true,
//       totalReceivable,
//       overdueCount
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // ─── 5. ACCOUNTS PAYABLE ROUTE ────────────────────────────────────────────────
// router.get('/accounts-payable', requireAuth, async (req, res) => {
//   try {
//     const userId = new mongoose.Types.ObjectId(req.user.id);

//     const payableData = await Bill.aggregate([
//       { $match: { user: userId, status: { $in: ['Pending', 'Overdue'] } } },
//       { $group: { _id: null, total: { $sum: '$amount' } } }
//     ]);
//     const totalPayable = payableData[0]?.total || 0;

//     res.json({
//       success: true,
//       totalPayable
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // ─── 6. MAIN OVERVIEW MATRIX ROUTE ───────────────────────────────────────────
// router.get('/overview', requireAuth, async (req, res) => {
//   try {
//     const userId = new mongoose.Types.ObjectId(req.user.id);

//     const revData = await Invoice.aggregate([
//       { $match: { user: userId, status: 'Paid' } },
//       { $group: { _id: null, total: { $sum: '$amount' } } }
//     ]);

//     const expData = await Expense.aggregate([
//       { $match: { user: userId, status: 'Paid' } },
//       { $group: { _id: null, total: { $sum: '$amount' } } }
//     ]);

//     const recData = await Invoice.aggregate([
//       { $match: { user: userId, status: { $in: ['Pending', 'Overdue'] } } },
//       { $group: { _id: null, total: { $sum: '$amount' } } }
//     ]);

//     const payData = await Expense.aggregate([
//       { $match: { user: userId, status: { $in: ['Pending', 'Overdue'] } } },
//       { $group: { _id: null, total: { $sum: '$amount' } } }
//     ]);

//     const totalRevenue = revData[0]?.total || 0;
//     const totalExpenses = expData[0]?.total || 0;
//     const totalReceivable = recData[0]?.total || 0;
//     const totalPayable = payData[0]?.total || 0;
//     const netProfit = totalRevenue - totalExpenses;

//     res.json({
//       success: true,
//       totalRevenue,
//       totalExpenses,
//       netProfit,
//       totalReceivable,
//       totalPayable
//     });

//   } catch (error) {
//     console.error("Analytics Dashboard Error:", error);
//     res.status(500).json({ success: false, message: "Server configuration failure." });
//   }
// });

// module.exports = router;























const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const Expense = require('../models/Expense');
const Bill = require('../models/Bill');
const mongoose = require('mongoose');

// 🌟 Import requireAuth so logged-in user session identity is parsed automatically
const { requireAuth } = require('../middleware/authMiddleware'); 

// ─── 1. TOTAL REVENUE ROUTE ──────────────────────────────────────────────────
router.get('/total-revenue', requireAuth, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const totalRevenueData = await Invoice.aggregate([
      { $match: { user: userId, status: 'Paid' } }, 
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalRevenue = totalRevenueData[0]?.total || 0;

    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const currentMonthData = await Invoice.aggregate([
      { $match: { user: userId, status: 'Paid', createdAt: { $gte: startOfCurrentMonth } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const previousMonthData = await Invoice.aggregate([
      { $match: { user: userId, status: 'Paid', createdAt: { $gte: startOfPreviousMonth, $lt: startOfCurrentMonth } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const currentTotal = currentMonthData[0]?.total || 0;
    const previousTotal = previousMonthData[0]?.total || 0;

    let revenueGrowth = 0;
    if (previousTotal > 0) {
      revenueGrowth = ((currentTotal - previousTotal) / previousTotal) * 100;
    } else if (currentTotal > 0) {
      revenueGrowth = 100;
    }

    res.json({
      success: true,
      totalRevenue,
      revenueGrowth: parseFloat(revenueGrowth.toFixed(1))
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─── 2. TOTAL EXPENSES ROUTE ─────────────────────────────────────────────────
router.get('/total-expenses', requireAuth, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const totalExpensesData = await Expense.aggregate([
      { $match: { user: userId, status: 'Paid' } }, 
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalExpenses = totalExpensesData[0]?.total || 0;

    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const currentMonthData = await Expense.aggregate([
      { $match: { user: userId, status: 'Paid', createdAt: { $gte: startOfCurrentMonth } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const previousMonthData = await Expense.aggregate([
      { $match: { user: userId, status: 'Paid', createdAt: { $gte: startOfPreviousMonth, $lt: startOfCurrentMonth } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const currentTotal = currentMonthData[0]?.total || 0;
    const previousTotal = previousMonthData[0]?.total || 0;

    let expenseGrowth = 0;
    if (previousTotal > 0) {
      expenseGrowth = ((currentTotal - previousTotal) / previousTotal) * 100;
    } else if (currentTotal > 0) {
      expenseGrowth = 100;
    }

    res.json({
      success: true,
      totalExpenses,
      expenseGrowth: parseFloat(expenseGrowth.toFixed(1))
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─── 3. NET PROFIT ROUTE ─────────────────────────────────────────────────────
router.get('/net-profit', requireAuth, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const totalRevenueData = await Invoice.aggregate([
      { $match: { user: userId, status: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalRevenue = totalRevenueData[0]?.total || 0;

    const totalExpensesData = await Expense.aggregate([
      { $match: { user: userId, status: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalExpenses = totalExpensesData[0]?.total || 0;

    const lifetimeNetProfit = totalRevenue - totalExpenses;

    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const currentRev = await Invoice.aggregate([
      { $match: { user: userId, status: 'Paid', createdAt: { $gte: startOfCurrentMonth } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const currentExp = await Expense.aggregate([
      { $match: { user: userId, status: 'Paid', createdAt: { $gte: startOfCurrentMonth } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const currentMonthProfit = (currentRev[0]?.total || 0) - (currentExp[0]?.total || 0);

    const prevRev = await Invoice.aggregate([
      { $match: { user: userId, status: 'Paid', createdAt: { $gte: startOfPreviousMonth, $lt: startOfCurrentMonth } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const prevExp = await Expense.aggregate([
      { $match: { user: userId, status: 'Paid', createdAt: { $gte: startOfPreviousMonth, $lt: startOfCurrentMonth } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const prevMonthProfit = (prevRev[0]?.total || 0) - (prevExp[0]?.total || 0);

    let profitGrowth = 0;
    if (prevMonthProfit > 0) {
      profitGrowth = ((currentMonthProfit - prevMonthProfit) / prevMonthProfit) * 100;
    } else if (currentMonthProfit > 0) {
      profitGrowth = 100;
    }

    res.json({
      success: true,
      netProfit: lifetimeNetProfit,
      profitGrowth: parseFloat(profitGrowth.toFixed(1))
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─── 4. ACCOUNTS RECEIVABLE ROUTE ────────────────────────────────────────────
router.get('/accounts-receivable', requireAuth, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const receivableData = await Invoice.aggregate([
      { $match: { user: userId, status: { $in: ['Pending', 'Overdue'] } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalReceivable = receivableData[0]?.total || 0;

    const overdueCount = await Invoice.countDocuments({ user: userId, status: 'Overdue' });

    res.json({
      success: true,
      totalReceivable,
      overdueCount
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─── 5. ACCOUNTS PAYABLE ROUTE ────────────────────────────────────────────────
router.get('/accounts-payable', requireAuth, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const payableData = await Bill.aggregate([
      { $match: { user: userId, status: { $in: ['Pending', 'Overdue'] } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalPayable = payableData[0]?.total || 0;

    res.json({
      success: true,
      totalPayable
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─── 6. MAIN OVERVIEW MATRIX ROUTE ───────────────────────────────────────────
router.get('/overview', requireAuth, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const revData = await Invoice.aggregate([
      { $match: { user: userId, status: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const expData = await Expense.aggregate([
      { $match: { user: userId, status: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const recData = await Invoice.aggregate([
      { $match: { user: userId, status: { $in: ['Pending', 'Overdue'] } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const payData = await Expense.aggregate([
      { $match: { user: userId, status: { $in: ['Pending', 'Overdue'] } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const totalRevenue = revData[0]?.total || 0;
    const totalExpenses = expData[0]?.total || 0;
    const totalReceivable = recData[0]?.total || 0;
    const totalPayable = payData[0]?.total || 0;
    const netProfit = totalRevenue - totalExpenses;

    res.json({
      success: true,
      totalRevenue,
      totalExpenses,
      netProfit,
      totalReceivable,
      totalPayable
    });

  } catch (error) {
    console.error("Analytics Dashboard Error:", error);
    res.status(500).json({ success: false, message: "Server configuration failure." });
  }
});


// ─── 🌟 NEW: 7. REPORTS ADVANCED ANALYTICS ENDPOINT ──────────────────────────
// Custom endpoint that builds time-series dataset arrays and survival metrics
router.get('/reports', requireAuth, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    // 1. Gather rolling timeline arrays for Invoices (past 6 months)
    const monthlyInvoices = await Invoice.aggregate([
      { $match: { user: userId, status: 'Paid' } },
      {
        $group: {
          _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
          totalRevenue: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // 2. Gather rolling timeline arrays for Expenses (past 6 months)
    const monthlyExpenses = await Expense.aggregate([
      { $match: { user: userId, status: 'Paid' } },
      {
        $group: {
          _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
          totalExpenses: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // Map month indices to string format names
    const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Combine tracking items into a singular timeline matrix
    const datasetMap = {};

    monthlyInvoices.forEach(item => {
      const label = `${monthNames[item._id.month]} ${item._id.year}`;
      if (!datasetMap[label]) datasetMap[label] = { name: label, revenue: 0, expenses: 0 };
      datasetMap[label].revenue = item.totalRevenue;
    });

    monthlyExpenses.forEach(item => {
      const label = `${monthNames[item._id.month]} ${item._id.year}`;
      if (!datasetMap[label]) datasetMap[label] = { name: label, revenue: 0, expenses: 0 };
      datasetMap[label].expenses = item.totalExpenses;
    });

    // Convert map to array format for Recharts structure
    const historicalTrends = Object.values(datasetMap);

    // If array is empty, populate fallback nodes to protect layout charting mapping loops
    if (historicalTrends.length === 0) {
      historicalTrends.push(
        { name: "Current Month", revenue: 0, expenses: 0 }
      );
    }

    // 3. Compute Speedometer Runway Status Matrix Metrics
    // Calculate current available reserves from life-time values
    const revTotal = await Invoice.aggregate([
      { $match: { user: userId, status: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const expTotal = await Expense.aggregate([
      { $match: { user: userId, status: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const currentCashBalance = (revTotal[0]?.total || 0) - (expTotal[0]?.total || 0);

    // Calculate average burn rate from recent months data
    const last3MonthsExpenses = monthlyExpenses.slice(-3);
    const sumRecentExpenses = last3MonthsExpenses.reduce((sum, item) => sum + item.totalExpenses, 0);
    const averageMonthlyBurnRate = sumRecentExpenses > 0 ? (sumRecentExpenses / last3MonthsExpenses.length) : 50000; // 50k template fallback 

    // Runway = Available Balance / Average Burn
    let runwayMonths = 0;
    if (currentCashBalance > 0 && averageMonthlyBurnRate > 0) {
      runwayMonths = parseFloat((currentCashBalance / averageMonthlyBurnRate).toFixed(1));
    } else if (currentCashBalance > 0 && averageMonthlyBurnRate === 0) {
      runwayMonths = 99; // Unlimited runway safety anchor marker
    }

    res.json({
      success: true,
      runwayMonths: runwayMonths > 99 ? 99 : runwayMonths, 
      averageMonthlyBurnRate: Math.round(averageMonthlyBurnRate),
      currentCashBalance: currentCashBalance < 0 ? 0 : currentCashBalance,
      historicalTrends
    });

  } catch (error) {
    console.error("Reports Advanced Analytics Error:", error);
    res.status(500).json({ success: false, message: "Advanced operational parameters calculation mismatch error." });
  }
});

module.exports = router;