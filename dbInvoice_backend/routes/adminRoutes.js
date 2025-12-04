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


// const express = require("express");
// const router = express.Router();
// const adminController = require("../controllers/adminController");
// const Invoice = require("../models/invoice");
// const Quotation = require("../models/quotation");
// const { changePassword, verifyToken } = require("../controllers/adminController");
// const invoiceController = require('../controllers/invoiceController');
// const quotationController = require('../controllers/quotationController');
// const { verifyAdminToken } = require("../middleware/verifyAdminToken");
// // ...

// // PROTECTED ROUTES FOR ADMIN DASHBOARD LISTS
// router.get('/invoices', adminController.verifyToken, invoiceController.fetchAllInvoices);
// router.get('/quotations', adminController.verifyToken, quotationController.fetchAllQuotations);
// // ==========================
// //       AUTH ROUTES
// // ==========================
// router.post("/register", adminController.registerAdmin);
// router.post("/login", adminController.loginAdmin);
// router.put("/reset-user-password", verifyAdminToken, adminController.changeAnyUserPassword);

// module.exports = router;


const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const invoiceController = require("../controllers/invoiceController");
const quotationController = require("../controllers/quotationController");
const { verifyToken } = require("../controllers/adminController");
const authorizeRole = require("../middleware/authorizeRole");

// ==========================
//   AUTH ROUTES
// ==========================
router.post("/register", adminController.register);
router.post("/login", adminController.login);

// ==========================
//   USER ROUTES (Employee)
// ==========================
// router.post("/generate-invoice", verifyToken, authorizeRole("employee"), invoiceController.generateInvoiceNumber);
// router.post("/generate-quotation", verifyToken, authorizeRole("employee"), quotationController.generateQuotationNumber);

// ==========================
//   ADMIN ROUTES
// ==========================
router.get("/invoices", verifyToken, authorizeRole("admin"), invoiceController.fetchAllInvoices);
router.get("/quotations", verifyToken, authorizeRole("admin"), quotationController.fetchAllQuotations);
router.put("/change-user-password", verifyToken, authorizeRole("admin"), adminController.changePassword);
router.get("/analytics", adminController.verifyToken, adminController.analytics);
router.delete("/invoice/:number", verifyToken, authorizeRole("admin"), invoiceController.deleteInvoice);
router.delete("/quotation/:number", verifyToken, authorizeRole("admin"), quotationController.deleteQuotation);
router.get("/invoice/fetch/:number", verifyToken, authorizeRole("admin"), invoiceController.fetchInvoiceByNumber);
router.get("/quotation/fetch/:number", verifyToken, authorizeRole("admin"), quotationController.fetchQuotationByNumber);

router.get("/invoice/generate", verifyToken, authorizeRole("admin"), invoiceController.generateInvoiceNumber);
router.post("/invoice/save", verifyToken, authorizeRole("admin"), invoiceController.saveInvoice);
router.get("/update", verifyToken, authorizeRole("admin"), invoiceController.updateInvoice);

router.get("/quotation/generate", verifyToken, authorizeRole("admin"), quotationController.generateQuotationNumber);
router.post("/quotation/save", verifyToken, authorizeRole("admin"), quotationController.saveQuotation);
router.get("/quotation/update", verifyToken, authorizeRole("admin"), quotationController.updateQuotation);

module.exports = router;







