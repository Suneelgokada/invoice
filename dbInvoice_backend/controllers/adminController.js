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

    const token = jwt.sign(
      { id: account._id, username: account.username, role: account.role },
      process.env.JWT_SECRET || "your_jwt_secret_key_here",
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

// 3. Verify Token Middleware
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ success: false, error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret_key_here");
    req.account = decoded; // { id, username, role }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
};

// 4. Change Any User Password (Admin only)
exports.changePassword = async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    if (!req.account || req.account.role !== "admin") {
      return res.status(403).json({ success: false, error: "Only admin can perform this action" });
    }

    const user = await Account.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully" });
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