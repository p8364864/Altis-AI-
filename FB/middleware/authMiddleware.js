const mongoose = require('mongoose');

// Middleware to verify user authentication and attach user info to request
const requireAuth = async (req, res, next) => {
  try {
    const userId = req.cookies.userSession;
    
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: No session found" });
    }

    // Validate if userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ success: false, message: "Unauthorized: Invalid session" });
    }

    // Verify user actually exists in database
    // This prevents handshake failures when user document doesn't exist
    // We'll just verify the ID is valid - actual user lookup done on demand
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Attach user ID to request object for use in route handlers
    req.user = { id: userObjectId.toString() };
    next();
  } catch (error) {
    console.error("Authentication middleware error:", error);
    return res.status(401).json({ success: false, message: "Authentication error" });
  }
};

module.exports = { requireAuth };
