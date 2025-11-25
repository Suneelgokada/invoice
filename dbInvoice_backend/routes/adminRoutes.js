// const express = require("express");
// const router = express.Router();
// const adminController = require("../controllers/adminController");
// const Invoice = require("../models/invoice");
// const Quotation = require("../models/quotation");

// // Auth Routes
// router.post("/register", adminController.registerAdmin);
// router.post("/login", adminController.loginAdmin);

// // Protected Routes - Get all invoices and quotations
// router.get("/invoices", adminController.verifyToken, async (req, res) => {
//   try {
//     const invoices = await Invoice.find().sort({ createdAt: -1 });
//     res.status(200).json({
//       success: true,
//       invoices
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.message
//     });
//   }
// });

// router.get("/quotations", adminController.verifyToken, async (req, res) => {
//   try {
//     const quotations = await Quotation.find().sort({ createdAt: -1 });
//     res.status(200).json({
//       success: true,
//       quotations
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.message
//     });
//   }
// });

// // Delete invoice (admin protected)
// router.delete("/invoice/:number", adminController.verifyToken, async (req, res) => {
//   try {
//     const invoiceNumber = req.params.number;
//     const deletedInvoice = await Invoice.findOneAndDelete({ invoiceNumber });

//     if (!deletedInvoice) {
//       return res.status(404).json({
//         success: false,
//         error: "Invoice not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Invoice deleted successfully",
//       invoice: deletedInvoice
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.message
//     });
//   }
// });

// // Delete quotation (admin protected)
// router.delete("/quotation/:number", adminController.verifyToken, async (req, res) => {
//   try {
//     const quotationNumber = req.params.number;
//     const deletedQuotation = await Quotation.findOneAndDelete({ quotationNumber });

//     if (!deletedQuotation) {
//       return res.status(404).json({
//         success: false,
//         error: "Quotation not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Quotation deleted successfully",
//       quotation: deletedQuotation
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.message
//     });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const Invoice = require("../models/invoice");
const Quotation = require("../models/quotation");

// ==========================
//       AUTH ROUTES
// ==========================
router.post("/register", adminController.registerAdmin);
router.post("/login", adminController.loginAdmin);

// ==========================
//     PROTECTED ROUTES
// ==========================

// 1. GET ALL Invoices
router.get("/invoices", adminController.verifyToken, async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      invoices
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// 2. GET ALL Quotations
router.get("/quotations", adminController.verifyToken, async (req, res) => {
  try {
    const quotations = await Quotation.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      quotations
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// 3. UPDATE Invoice (Needed for Admin Panel Edit Button)
router.put("/invoice/:number", adminController.verifyToken, async (req, res) => {
  try {
    const invoiceNumber = req.params.number;
    
    // Find and update
    const updatedInvoice = await Invoice.findOneAndUpdate(
      { invoiceNumber }, 
      req.body, // Updates fields sent from frontend (e.g., invoiceValue)
      { new: true } // Returns the updated document
    );

    if (!updatedInvoice) {
      return res.status(404).json({
        success: false,
        error: "Invoice not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      invoice: updatedInvoice
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// 4. UPDATE Quotation (Needed for Admin Panel Edit Button)
router.put("/quotation/:number", adminController.verifyToken, async (req, res) => {
  try {
    const quotationNumber = req.params.number;

    // Find and update
    const updatedQuotation = await Quotation.findOneAndUpdate(
      { quotationNumber },
      req.body,
      { new: true }
    );

    if (!updatedQuotation) {
      return res.status(404).json({
        success: false,
        error: "Quotation not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Quotation updated successfully",
      quotation: updatedQuotation
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// 5. DELETE Invoice
router.delete("/invoice/:number", adminController.verifyToken, async (req, res) => {
  try {
    const invoiceNumber = req.params.number;
    const deletedInvoice = await Invoice.findOneAndDelete({ invoiceNumber });

    if (!deletedInvoice) {
      return res.status(404).json({
        success: false,
        error: "Invoice not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
      invoice: deletedInvoice
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// 6. DELETE Quotation
router.delete("/quotation/:number", adminController.verifyToken, async (req, res) => {
  try {
    const quotationNumber = req.params.number;
    const deletedQuotation = await Quotation.findOneAndDelete({ quotationNumber });

    if (!deletedQuotation) {
      return res.status(404).json({
        success: false,
        error: "Quotation not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Quotation deleted successfully",
      quotation: deletedQuotation
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

module.exports = router;