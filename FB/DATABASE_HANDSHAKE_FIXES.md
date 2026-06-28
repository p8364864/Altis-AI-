# Database Handshake - Troubleshooting & Testing Guide

## ✅ Issues Fixed

### 1. **Model Definition Conflict** ✓
- **Problem**: Backend.js defined Invoice/Expense schemas inline, conflicting with Models folder files
- **Fix**: Now imports models from `./Models/Invoice`, `./Models/Expenses`, `./Models/User`
- **Impact**: Eliminates duplicate schema conflicts causing handshake failures

### 2. **Missing User Field in Bills Model** ✓
- **Problem**: Bills.js didn't have user segregation
- **Fix**: Added `user: ObjectId` field with reference to User model
- **Impact**: Allows proper user isolation for bills

### 3. **Authentication Middleware** ✓
- **Problem**: Only stored raw userId string without proper conversion
- **Fix**: Now converts userId to proper MongoDB ObjectId
- **Impact**: Prevents invalid reference errors when saving documents

### 4. **Improved Error Logging** ✓
- **Problem**: Generic error messages made debugging difficult
- **Fix**: Added console.log statements with [ADD-INVOICE]/[ADD-EXPENSE] prefixes
- **Impact**: Now shows exact error messages and stack traces in terminal

## 🔧 Required Setup Steps

### Step 1: Verify MongoDB Connection
```bash
# Check if MongoDB is running
ps aux | grep mongod

# If not running on Mac:
brew services start mongodb-community

# If not installed:
brew install mongodb-community
brew services start mongodb-community
```

### Step 2: Create .env File
Create `/Users/piyushjangid/Desktop/Finance /FB/.env`:
```
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
FRONTEND_URL=http://localhost:5173
DATABASE_URL=mongodb://localhost:27017/altisAI
```

### Step 3: Clear Database (Optional - if data is corrupted)
```bash
# Connect to MongoDB
mongo

# In mongo shell
use altisAI
db.invoices.deleteMany({})
db.expenses.deleteMany({})
db.users.deleteMany({})
exit
```

### Step 4: Restart Backend Server
```bash
cd "/Users/piyushjangid/Desktop/Finance /FB"
npm install  # Make sure all dependencies are installed
node backend.js
```

## 🧪 Testing Checklist

### Test 1: Server Starts Without Errors
- ✅ Terminal shows: "MongoDB Connection Log: Operational & Connected!"
- ✅ Terminal shows: "System Status Tracking Online on Port 8000..."
- ⚠️ If connection fails: Check if MongoDB is running

### Test 2: Add Invoice via API
```bash
curl -X POST http://localhost:8000/api/Transaction/Invoices \
  -H "Content-Type: application/json" \
  -H "Cookie: userSession=<valid_user_id>" \
  -d '{
    "invoiceNumber": "INV-001",
    "clientName": "Test Client",
    "amount": 5000,
    "status": "Pending"
  }'
```
- ✅ Response: `{"success": true, "message": "Invoice state synchronized..."}`
- ⚠️ Error 401: User session is invalid or missing
- ⚠️ Error 400: Missing required fields
- ⚠️ Error 500: Check console logs for database error details

### Test 3: Get Invoices for User
```bash
curl -X GET http://localhost:8000/api/Transaction/Invoices \
  -H "Cookie: userSession=<valid_user_id>"
```
- ✅ Should return array of invoices for that user
- ✅ Should NOT return other users' invoices

### Test 4: Check Console Output
Terminal should show:
```
[ADD-INVOICE] Creating invoice for user 507f1f77bcf86cd799439011: { ... }
[ADD-INVOICE] Success - Invoice ID: 507f191e810c19729de860ea
```

## 🔍 Common Issues & Solutions

### Issue 1: "Unauthorized: No session found"
**Cause**: User not authenticated
**Solution**: 
1. Login via Google OAuth or manual registration first
2. Ensure cookies are being sent with requests

### Issue 2: "MongooseError: Operation timed out"
**Cause**: MongoDB not running
**Solution**:
```bash
brew services start mongodb-community
# Wait 5 seconds for MongoDB to start
```

### Issue 3: "Cast error: Cannot cast undefined to ObjectId"
**Cause**: Invalid user ID in session
**Solution**:
1. Logout and login again
2. Clear browser cookies
3. Check that user._id is valid MongoDB ObjectId

### Issue 4: "E11000 duplicate key error"
**Cause**: Duplicate invoiceNumber for same user
**Solution**: Use unique invoice numbers or add unique composite index

### Issue 5: Console shows database error but no response
**Cause**: Unhandled promise rejection
**Solution**: Look for detailed error in console logs with [ADD-INVOICE] prefix

## 📋 Files Modified

1. ✅ `/FB/backend.js` - Imports models properly, improved error handling
2. ✅ `/FB/Models/User.js` - Created new User model file
3. ✅ `/FB/Models/Bills.js` - Added user field
4. ✅ `/FB/middleware/authMiddleware.js` - Improved ObjectId conversion
5. ✅ `/FB/Models/Invoice.js` - Existing (no changes needed)
6. ✅ `/FB/Models/Expenses.js` - Existing (no changes needed)

## 📌 Next Steps

1. [ ] Verify MongoDB is running
2. [ ] Restart the backend server
3. [ ] Test invoice creation through the frontend
4. [ ] Monitor console for [ADD-INVOICE] log output
5. [ ] Check database in MongoDB Compass if available
6. [ ] Test with multiple users to verify segregation

---
**Last Updated**: 2026-06-12
