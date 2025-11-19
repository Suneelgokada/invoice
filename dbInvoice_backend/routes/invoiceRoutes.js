// const express = require("express");
// const router = express.Router();
// const { generateInvoiceNumber, saveInvoice } = require("../controller/invoiceController");

// router.get("/generate", generateInvoiceNumber);
// router.post("/save", saveInvoice);

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  generateInvoiceNumber,
  saveInvoice,
  updateInvoice,
  deleteInvoice,
  fetchInvoiceByNumber,
} = require("../controllers/invoiceController");

router.get("/generate", generateInvoiceNumber);
router.post("/save", saveInvoice);
router.put("/update",updateInvoice);
router.delete("/delete/:number",deleteInvoice);
router.get('/fetch/:number', fetchInvoiceByNumber);
module.exports = router;

