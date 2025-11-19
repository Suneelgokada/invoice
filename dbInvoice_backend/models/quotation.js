const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  total: { type: Number, required: true }
});

const QuotationSchema = new mongoose.Schema({
  quotationNumber: { type: String, required: true, unique: true },

  // Recipient Details
  billTO: { type: String, required: true },
  customerAddress: { type: String, required: true },
  customerGSTIN: { type: String },

  // Items array
  items: [ItemSchema],

  // GST Info
  sgst: { type: Boolean, default: false },
  cgst: { type: Boolean, default: false },
  SGSTAmount: { type: Number, default: 0 },
  CGSTAmount: { type: Number, default: 0 },

  // Total Summary
  taxableValue: { type: Number, required: true },
  invoiceValue: { type: Number, required: true },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Quotation", QuotationSchema);
