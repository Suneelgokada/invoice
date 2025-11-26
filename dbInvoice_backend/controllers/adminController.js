// const Admin = require("../models/admin");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");


// // Register Admin (Only for initial setup - disable after creating admin)
// exports.registerAdmin = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Check if admin already exists
//     const existingAdmin = await Admin.findOne({ username });
//     if (existingAdmin) {
//       return res.status(400).json({
//         success: false,
//         error: "Admin already exists"
//       });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const admin = new Admin({
//       username,
//       password: hashedPassword
//     });

//     await admin.save();

//     res.status(201).json({
//       success: true,
//       message: "Admin registered successfully"
//     });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.message
//     });
//   }
// };

// // Login Admin
// exports.loginAdmin = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Check if admin exists
//     const admin = await Admin.findOne({ username });
//     if (!admin) {
//       return res.status(401).json({
//         success: false,
//         error: "Invalid credentials"
//       });
//     }

//     // Verify password
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         error: "Invalid credentials"
//       });
//     }

//     // Create JWT token
//     const token = jwt.sign(
//       { id: admin._id, username: admin.username },
//       process.env.JWT_SECRET || "your_jwt_secret_key_here",
//       { expiresIn: "24h" }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       admin: {
//         id: admin._id,
//         username: admin.username
//       }
//     });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.message
//     });
//   }
// };

// // Verify Token Middleware
// exports.verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(403).json({
//       success: false,
//       error: "No token provided"
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret_key_here");
//     req.admin = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({
//       success: false,
//       error: "Invalid or expired token"
//     });
//   }
// };


const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// 1. Register User (Admin or Employee)
exports.registerAdmin = async (req, res) => {
  try {
    // Frontend/Postman nundi 'role' ni destruct cheyandi
    const { username, password, role } = req.body;

    // Check if user already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        error: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with Role
    const admin = new Admin({
      username,
      password: hashedPassword,
      // Role ivvakapothe default ga 'employee' teeskuntundi
      role: role || "employee" 
    });

    await admin.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      role: admin.role // Response lo role chupistam
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// 2. Login User
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials"
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials"
      });
    }

    // Create JWT token (Token lo role ni include chestunnam)
    const token = jwt.sign(
      { 
        id: admin._id, 
        username: admin.username, 
        role: admin.role // IMPORTANT: Token lo role save chestunnam
      },
      process.env.JWT_SECRET || "your_jwt_secret_key_here",
      { expiresIn: "24h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      // Frontend ki role pampistunnam (App.js lo redirect cheyadaniki)
      role: admin.role, 
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// 3. Verify Token Middleware
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      success: false,
      error: "No token provided"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret_key_here");
    
    // Decoded object lo ippudu { id, username, role } moodu untayi
    req.admin = decoded; 
    
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: "Invalid or expired token"
    });
  }
};


exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Token verify middleware lo req.admin set chestunnam
    const adminId = req.admin.id;

    // Find user by ID
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: "Old password is incorrect"
      });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    admin.password = hashedNewPassword;
    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

