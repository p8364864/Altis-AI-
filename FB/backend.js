

















require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const { requireAuth } = require('./middleware/authMiddleware');
const aiDataRoute = require('./Routes/AiDataRote');
const app = express();
app.use(express.json());
app.use(aiDataRoute);
// Wrapper for async route handlers to catch errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const corsOptions = {
  origin: 'http://localhost:5173', // Frontend URL alignment validation
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Initialize Google OAuth2 Client securely
const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_FALLBACK',
  process.env.GOOGLE_CLIENT_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET_FALLBACK',
  'http://localhost:8000/api/auth/google/callback' 
);

mongoose.connect('mongodb://localhost:27017/altisAI', {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
})
  .then(() => console.log("MongoDB Connection Log: Operational & Connected!"))
  .catch(err => console.error("MongoDB Connection Error:", err.message));

// ─── IMPORT MODELS FROM MODELS FOLDER ───────────────────────────────────
const Invoice = require('./Models/Invoice');
const Expense = require('./Models/Expenses');
const Inventory = require('./Models/Inventory');
const User = require('./Models/User');

/* ==========================================
   GOOGLE IDENTITY FLOW LAYER (FIXED & AUDITED)
   ========================================== */

// 1. Redirect user to Google Identity page
app.get('/api/auth/google', (req, res) => {
  const url = googleClient.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ],
    prompt: 'select_account'
  });
  res.redirect(url);
});

// 2. Callback routing target
app.get('/api/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  const targetFrontend = process.env.FRONTEND_URL || 'http://localhost:5173';

  if (!code) {
    return res.redirect(`${targetFrontend}?error=no_code`);
  }

  try {
    const { tokens } = await googleClient.getToken(code);
    googleClient.setCredentials(tokens);

    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        fullName: name,
        email: email,
        googleId: googleId
      });
      await user.save();
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    // Creating seamless auth cookies
    res.cookie('userSession', user._id.toString(), {
      httpOnly: true, 
      maxAge: 3600000 
    });

    res.redirect(`${targetFrontend}`);

  } catch (error) {
    console.error("Google Authentication Flow Error:", error);
    res.redirect(`${targetFrontend}?error=auth_failed`);
  }
});

/* ==========================================
   FINANCIAL TRANSACTIONS CORE SYSTEMS
   ========================================== */

// 🛠️ FIX 2: Added structural endpoints with USER FILTERING to prevent data leakage
app.get('/api/Transaction/Invoices', requireAuth, async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, invoices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/Transaction/Invoices', requireAuth, async (req, res) => {
  try {
    const { invoiceNumber, clientName, amount, status } = req.body;
    
    // Validate required fields
    if (!invoiceNumber || !clientName || !amount) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields: invoiceNumber, clientName, amount" 
      });
    }

    console.log(`Creating invoice for user ${req.user.id}:`, { invoiceNumber, clientName, amount });
    
    const newInvoice = new Invoice({ 
      user: req.user.id, 
      invoiceNumber, 
      clientName, 
      amount: Number(amount || 0), 
      status: status || 'Pending'
    });
    
    await newInvoice.save();
    console.log(`Invoice created successfully:`, newInvoice._id);
    
    res.status(201).json({ 
      success: true, 
      message: "Invoice state synchronized successfully.",
      invoice: newInvoice 
    });
  } catch (error) {
    console.error("Invoice creation error:", error.message, error.stack);
    res.status(500).json({ 
      success: false, 
      message: error.message || "Failed to create invoice" 
    });
  }
});

app.get('/api/Transaction/Expenses', requireAuth, async (req, res) => {
  try {
    const bills = await Expense.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, bills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/Transaction/Expenses', requireAuth, async (req, res) => {
  try {
    const { billNumber, vendorName, amount, status } = req.body;
    
    // Validate required fields
    if (!billNumber || !vendorName || !amount) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields: billNumber, vendorName, amount" 
      });
    }

    console.log(`Creating expense for user ${req.user.id}:`, { billNumber, vendorName, amount });
    
    const newExpense = new Expense({ 
      user: req.user.id, 
      billNumber, 
      vendorName, 
      amount: Number(amount || 0), 
      status: status || 'Pending'
    });
    
    await newExpense.save();
    console.log(`Expense created successfully:`, newExpense._id);
    
    res.status(201).json({ 
      success: true, 
      message: "Expense state logged successfully.",
      expense: newExpense 
    });
  } catch (error) {
    console.error("Expense creation error:", error.message, error.stack);
    res.status(500).json({ 
      success: false, 
      message: error.message || "Failed to create expense" 
    });
  }
});

// 📊 AGGREGATED METRICS PIPELINE ROUTE
app.get('/api/Transaction/analytics/overview', requireAuth, async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user.id });
    const expenses = await Expense.find({ user: req.user.id });

    let totalRevenue = 0;
    let totalReceivable = 0;
    invoices.forEach(i => {
      if (i.status === 'Paid') totalRevenue += (i.amount || 0);
      else totalReceivable += (i.amount || 0);
    });

    let totalExpenses = 0;
    let totalPayable = 0;
    expenses.forEach(e => {
      if (e.status === 'Paid') totalExpenses += (e.amount || 0);
      else totalPayable += (e.amount || 0);
    });

    res.json({
      success: true,
      totalRevenue,
      totalExpenses,
      netProfit: totalRevenue - totalExpenses,
      totalReceivable,
      totalPayable
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 📊 REPORTS COMPONENT: MONTHLY TRENDS AGGREGATION
app.get('/api/reports/trends', requireAuth, async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user.id, status: 'Paid' });
    const expenses = await Expense.find({ user: req.user.id });

    // Initialize an array for the 12 months
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = months.map(month => ({
      name: month,
      revenue: 0,
      expenses: 0,
      profit: 0
    }));

    // Process Revenue (Paid Invoices)
    invoices.forEach(inv => {
      const date = new Date(inv.createdAt);
      const monthIndex = date.getMonth(); // 0 = Jan, 11 = Dec
      monthlyData[monthIndex].revenue += (inv.amount || 0);
    });

    // Process Expenses (All Bills)
    expenses.forEach(exp => {
      const date = new Date(exp.createdAt);
      const monthIndex = date.getMonth();
      monthlyData[monthIndex].expenses += (exp.amount || 0);
    });

    // Calculate Net Profit per month
    monthlyData.forEach(month => {
      month.profit = month.revenue - month.expenses;
    });

    res.json({ success: true, chartData: monthlyData });
  } catch (error) {
    console.error("Reports Aggregation Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});









/* ==========================================
   TRADITIONAL REGISTER & ACTIVE LOGINS
   ========================================== */
app.post('/api/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();
    
    // Set session cookie after registration
    res.cookie('userSession', newUser._id.toString(), { 
      httpOnly: true, 
      maxAge: 3600000 
    });
    
    res.status(201).json({ 
      message: "Account setup successfully!", 
      user: { email: newUser.email, name: newUser.fullName }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error registration." });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.password) return res.status(400).json({ message: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid email or password" });

    res.cookie('userSession', user._id.toString(), { httpOnly: true, maxAge: 3600000 });
    res.json({ message: "Welcome back!", user: { email: user.email, name: user.fullName } });
  } catch (error) {
    res.status(500).json({ message: "Server login framework crash." });
  }
});

app.get('/api/auth/check-session', async (req, res) => {
  try {
    const userId = req.cookies.userSession;
    if (!userId) return res.status(401).json({ isAuthenticated: false });
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ isAuthenticated: false });
    res.json({ isAuthenticated: true, user: { email: user.email, name: user.fullName } });
  } catch (error) {
    res.status(500).json({ isAuthenticated: false });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('userSession');
  res.json({ message: "Logged out successfully" });
});

/* ==========================================
   TRANSACTION SUBMISSION ROUTES (NEW)
   ========================================== */
app.post('/api/transactions/add-invoice', requireAuth, async (req, res) => {
  try {
    const { invoiceNumber, clientName, amount, status } = req.body;
    
    // Validate required fields
    if (!invoiceNumber || !clientName || !amount) {
      return res.status(400).json({ success: false, error: "Missing required fields: invoiceNumber, clientName, amount" });
    }

    console.log(`[ADD-INVOICE] Creating invoice for user ${req.user.id}:`, { invoiceNumber, clientName, amount });

    const newInvoice = new Invoice({ 
      user: req.user.id,
      invoiceNumber, 
      clientName, 
      amount: Number(amount || 0), 
      status: status || 'Pending'
    });
    await newInvoice.save();
    console.log(`[ADD-INVOICE] Success - Invoice ID: ${newInvoice._id}`);
    res.status(201).json({ success: true, message: "Invoice state synchronized successfully.", invoice: newInvoice });
  } catch (error) {
    console.error("Invoice creation error:", error.message, error.stack);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/transactions/add-expense', requireAuth, async (req, res) => {
  try {
    const { billNumber, vendorName, amount, status } = req.body;
    
    // Validate required fields
    if (!billNumber || !vendorName || !amount) {
      return res.status(400).json({ success: false, error: "Missing required fields: billNumber, vendorName, amount" });
    }

    console.log(`[ADD-EXPENSE] Creating expense for user ${req.user.id}:`, { billNumber, vendorName, amount });

    const newExpense = new Expense({ 
      user: req.user.id,
      billNumber, 
      vendorName, 
      amount: Number(amount || 0), 
      status: status || 'Pending'
    });
    await newExpense.save();
    console.log(`[ADD-EXPENSE] Success - Expense ID: ${newExpense._id}`);
    res.status(201).json({ success: true, message: "Expense state logged successfully.", expense: newExpense });
  } catch (error) {
    console.error("Expense creation error:", error.message, error.stack);
    res.status(500).json({ success: false, error: error.message });
  }
});

/* ==========================================
   🌟 INVENTORY MANAGEMENT ROUTES (NEW)
   ========================================== */

// GET all inventory items for the logged-in user
app.get('/api/Inventory', requireAuth, async (req, res) => {
  try {
    const inventory = await Inventory.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, inventory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST - Add new inventory item
app.post('/api/Inventory', requireAuth, async (req, res) => {
  try {
    const { itemName, sku, quantity, unitPrice } = req.body;
    
    // Validate required fields
    if (!itemName || !sku || quantity === undefined || !unitPrice) {
      return res.status(400).json({ 
        success: false, 
        error: "Missing required fields: itemName, sku, quantity, unitPrice" 
      });
    }

    // Validate quantity and unitPrice are numbers
    const qty = Number(quantity);
    const price = Number(unitPrice);
    
    if (isNaN(qty) || isNaN(price)) {
      return res.status(400).json({ 
        success: false, 
        error: "Quantity and unitPrice must be valid numbers" 
      });
    }

    const newInventoryItem = new Inventory({ 
      user: req.user.id,
      itemName, 
      sku, 
      quantity: qty, 
      unitPrice: price
    });
    
    await newInventoryItem.save();
    res.status(201).json({ 
      success: true, 
      message: "Inventory asset provisioned successfully.",
      item: newInventoryItem
    });
  } catch (error) {
    console.error("Inventory creation error:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to create inventory item" });
  }
});

// PUT - Update inventory item (e.g., change quantity or price)
app.put('/api/Inventory/:itemId', requireAuth, async (req, res) => {
  try {
    const { itemId } = req.params;
    const { itemName, sku, quantity, unitPrice } = req.body;

    // Find the item and check user ownership
    const inventoryItem = await Inventory.findById(itemId);
    if (!inventoryItem) {
      return res.status(404).json({ success: false, error: "Inventory item not found" });
    }

    if (inventoryItem.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: "Unauthorized - cannot modify other users' inventory" });
    }

    // Update fields
    if (itemName !== undefined) inventoryItem.itemName = itemName;
    if (sku !== undefined) inventoryItem.sku = sku;
    if (quantity !== undefined) inventoryItem.quantity = Number(quantity);
    if (unitPrice !== undefined) inventoryItem.unitPrice = Number(unitPrice);

    await inventoryItem.save();
    
    res.json({ 
      success: true, 
      message: "Inventory item updated successfully",
      item: inventoryItem
    });
  } catch (error) {
    console.error("Inventory update error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE - Remove inventory item
app.delete('/api/Inventory/:itemId', requireAuth, async (req, res) => {
  try {
    const { itemId } = req.params;

    // Find the item and check user ownership
    const inventoryItem = await Inventory.findById(itemId);
    if (!inventoryItem) {
      return res.status(404).json({ success: false, error: "Inventory item not found" });
    }

    if (inventoryItem.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: "Unauthorized - cannot delete other users' inventory" });
    }

    await Inventory.deleteOne({ _id: itemId });
    
    res.json({ 
      success: true, 
      message: "Inventory item deleted successfully"
    });
  } catch (error) {
    console.error("Inventory deletion error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET inventory summary/analytics
app.get('/api/Inventory/analytics/summary', requireAuth, async (req, res) => {
  try {
    const inventory = await Inventory.find({ user: req.user.id });

    let totalInventoryValue = 0;
    let totalItems = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    inventory.forEach(item => {
      totalInventoryValue += item.totalValue || 0;
      totalItems += item.quantity || 0;
      if (item.quantity === 0) outOfStockCount++;
      else if (item.quantity <= 10) lowStockCount++;
    });

    res.json({
      success: true,
      totalInventoryValue,
      totalItems,
      totalProducts: inventory.length,
      lowStockCount,
      outOfStockCount
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(8000, () => console.log("System Status Tracking Online on Port 8000..."));
