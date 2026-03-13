// // const Admin = require("../models/admin");
// // const jwt = require("jsonwebtoken");
// // const bcrypt = require("bcryptjs");


// // // Register Admin (Only for initial setup - disable after creating admin)
// // exports.registerAdmin = async (req, res) => {
// //   try {
// //     const { username, password } = req.body;

// //     // Check if admin already exists
// //     const existingAdmin = await Admin.findOne({ username });
// //     if (existingAdmin) {
// //       return res.status(400).json({
// //         success: false,
// //         error: "Admin already exists"
// //       });
// //     }

// //     // Hash password
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const admin = new Admin({
// //       username,
// //       password: hashedPassword
// //     });

// //     await admin.save();

// //     res.status(201).json({
// //       success: true,
// //       message: "Admin registered successfully"
// //     });

// //   } catch (err) {
// //     res.status(500).json({
// //       success: false,
// //       error: err.message
// //     });
// //   }
// // };

// // // Login Admin
// // exports.loginAdmin = async (req, res) => {
// //   try {
// //     const { username, password } = req.body;

// //     // Check if admin exists
// //     const admin = await Admin.findOne({ username });
// //     if (!admin) {
// //       return res.status(401).json({
// //         success: false,
// //         error: "Invalid credentials"
// //       });
// //     }

// //     // Verify password
// //     const isMatch = await bcrypt.compare(password, admin.password);
// //     if (!isMatch) {
// //       return res.status(401).json({
// //         success: false,
// //         error: "Invalid credentials"
// //       });
// //     }

// //     // Create JWT token
// //     const token = jwt.sign(
// //       { id: admin._id, username: admin.username },
// //       process.env.JWT_SECRET || "your_jwt_secret_key_here",
// //       { expiresIn: "24h" }
// //     );

// //     res.status(200).json({
// //       success: true,
// //       message: "Login successful",
// //       token,
// //       admin: {
// //         id: admin._id,
// //         username: admin.username
// //       }
// //     });

// //   } catch (err) {
// //     res.status(500).json({
// //       success: false,
// //       error: err.message
// //     });
// //   }
// // };

// // // Verify Token Middleware
// // exports.verifyToken = (req, res, next) => {
// //   const token = req.headers.authorization?.split(" ")[1];

// //   if (!token) {
// //     return res.status(403).json({
// //       success: false,
// //       error: "No token provided"
// //     });
// //   }

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret_key_here");
// //     req.admin = decoded;
// //     next();
// //   } catch (err) {
// //     return res.status(401).json({
// //       success: false,
// //       error: "Invalid or expired token"
// //     });
// //   }
// // };



// controllers/accountController.js
const Account = require("../models/account"); // ✅ match your schema filename
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Invoice = require("../models/invoice");
const Quotation = require("../models/quotation");

// 1. Register User (Admin or User)
exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Check if username already exists
    const existing = await Account.findOne({ username });
    if (existing) {
      return res.status(400).json({ success: false, error: "User already exists" });
    }

    // Create new account (password auto-hashed by pre-save hook)
    const account = new Account({
      username,
      password,
      role: role || "user" // default user if not provided
    });

    await account.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      role: account.role
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 2. Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const account = await Account.findOne({ username });
    if (!account) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

  const payload = {
  id: account._id,
  username: account.username,
  role: account.role
};

const token = jwt.sign(
  payload,
  process.env.JWT_SECRET,
  { expiresIn: "24h" }
);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role: account.role,
      account: { id: account._id, username: account.username, role: account.role }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// // 3. Verify Token Middleware
// exports.verifyToken = (req, res, next) => {

//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ success: false, error: "Token missing or malformed" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.account = decoded;

//     next();

//   } catch (err) {

//     return res.status(401).json({ success: false, error: "Invalid or expired token" });

//   }
// };

// 4. Change Any User Password (Admin only)
// Change Password - works for both user and admin
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, userId, username } = req.body;

    // If admin → reset another user's password
    if (req.account && req.account.role === "admin") {
      let user;

      // Allow either userId or username
      if (userId) {
        user = await Account.findById(userId);
      } else if (username) {
        user = await Account.findOne({ username });
      }

      if (!user) {
        return res.status(404).json({ success: false, error: "User not found" });
      }

      user.password = newPassword; // auto-hashed by pre-save hook
      await user.save();

      return res.status(200).json({ success: true, message: "Password reset by admin successfully" });
    }

    // If normal user → change own password
    if (req.account) {
      const user = await Account.findById(req.account.id);
      if (!user) {
        return res.status(404).json({ success: false, error: "User not found" });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, error: "Old password incorrect" });
      }

      user.password = newPassword;
      await user.save();

      return res.status(200).json({ success: true, message: "Password updated successfully" });
    }

    return res.status(403).json({ success: false, error: "Unauthorized" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


// 5. Delete User/Admin (Admin only)
exports.deleteAccount = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!req.account || req.account.role !== "admin") {
      return res.status(403).json({ success: false, error: "Only admin can delete accounts" });
    }

    const deleted = await Account.findByIdAndDelete(userId);
    if (!deleted) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.status(200).json({ success: true, message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.analytics = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear + 1, 0, 1);

    // Database nundi records fetch chestunnam
    const invoices = await Invoice.find({
      createdAt: { $gte: startOfYear, $lt: endOfYear }
    });

    const quotations = await Quotation.find({
      createdAt: { $gte: startOfYear, $lt: endOfYear }
    });

    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const monthlyData = monthNames.map((month, index) => {
      const monthInvoices = invoices.filter(inv => new Date(inv.createdAt).getMonth() === index);
      const monthQuotations = quotations.filter(quot => new Date(quot.createdAt).getMonth() === index);

      // ✅ REVENUE FIX: Only sum records that have 'invoiceValue' AND start with 'INVDB'
      const invoiceTotal = monthInvoices.reduce((sum, inv) => {
        const isRealInvoice = inv.invoiceNumber && inv.invoiceNumber.startsWith("INVDB");
        return sum + (isRealInvoice ? (parseFloat(inv.invoiceValue) || 0) : 0);
      }, 0);

      return {
        month,
        invoices: monthInvoices.length,
        quotations: monthQuotations.length,
        totalValue: parseFloat(invoiceTotal.toFixed(2)) // This will strictly match your card value
      };
    });

    // ---------------- WEEKLY DATA ----------------
    const startOfMonth = new Date(currentYear, currentMonth, 1);
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0);

    const weeklyData = [];
    const weeksInMonth = Math.ceil(endOfMonth.getDate() / 7);

    for (let week = 0; week < weeksInMonth; week++) {
      const weekStart = new Date(currentYear, currentMonth, week * 7 + 1);
      const weekEnd = new Date(currentYear, currentMonth, Math.min((week + 1) * 7, endOfMonth.getDate()));

      const weekInvoices = invoices.filter(inv => {
        const date = new Date(inv.createdAt);
        return date >= weekStart && date <= weekEnd && inv.invoiceNumber && inv.invoiceNumber.startsWith("INVDB");
      });

      const weekInvoiceTotal = weekInvoices.reduce((sum, inv) => sum + (parseFloat(inv.invoiceValue) || 0), 0);

      weeklyData.push({
        week: `Week ${week + 1}`,
        invoices: weekInvoices.length,
        quotations: quotations.filter(q => {
          const d = new Date(q.createdAt);
          return d >= weekStart && d <= weekEnd;
        }).length,
        totalValue: parseFloat(weekInvoiceTotal.toFixed(2))
      });
    }

    res.json({ success: true, monthlyData, weeklyData });

  } catch (error) {
    console.error("Analytics fetch error:", error);
    res.status(500).json({ success: false, error: "Failed to fetch analytics" });
  }
};
