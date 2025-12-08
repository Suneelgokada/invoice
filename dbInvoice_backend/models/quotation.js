// const mongoose = require("mongoose");

// const ItemSchema = new mongoose.Schema({
//   description: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   unitPrice: { type: Number, required: true },
//   total: { type: Number, required: true }
// });

// const QuotationSchema = new mongoose.Schema({
//   quotationNumber: { type: String, required: true, unique: true },

//   // Recipient Details
//   billTO: { type: String, required: true },
//   customerAddress: { type: String, required: true },
//   customerGSTIN: { type: String },

//   documentDate: { type: String, required: true, default: () => new Date().toISOString().split('T')[0] },

//   // Items array
//   items: [ItemSchema],

//   // GST Info
//   sgst: { type: Boolean, default: false },
//   cgst: { type: Boolean, default: false },
//   SGSTAmount: { type: Number, default: 0 },
//   CGSTAmount: { type: Number, default: 0 },

//   // Total Summary
//   taxableValue: { type: Number, required: true },
//   invoiceValue: { type: Number, required: true },

//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Quotation", QuotationSchema);


// const mongoose = require("mongoose");

// const ItemSchema = new mongoose.Schema({
//   description: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   unitPrice: { type: Number, required: true },
//   total: { type: Number, required: true }
// });

// const QuotationSchema = new mongoose.Schema({
//   quotationNumber: { type: String, required: true, unique: true },

//   // Recipient Details
//   billTO: { type: String, required: true },
//   customerAddress: { type: String, required: true },
//   customerGSTIN: { type: String },

//   // FIX: documentDate field definition is now correct
//   documentDate: { type: String, required: true },

//   // Items array
//   items: [ItemSchema],

//   // GST Info
//   sgst: { type: Boolean, default: false, required: false },
//   cgst: { type: Boolean, default: false, required: false },
//   SGSTAmount: { type: Number, default: 0 },
//   CGSTAmount: { type: Number, default: 0 },

// // Total Summary
//  taxableValue: { type: Number, required: true },
//  invoiceValue: { type: Number, required: true },
//   associatedQuotationNumber: { type: String },
//  createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Quotation", QuotationSchema);

const mongoose = require("mongoose");
const quotationSchema = new mongoose.Schema(
  {
    quotationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    billTO: {
      type: String,
      required: true,
    },
    customerAddress: {
      type: String,
      required: true,
    },
    customerGSTIN: {
      type: String,
      default: "",
    },
    items: [
      {
        description: { type: String, required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        total: { type: Number },
      },
    ],
    // ✅ GST fields are OPTIONAL - NO validation required
    sgst: {
      type: Boolean,
      default: false,
      // ❌ NO required: true
    },
    cgst: {
      type: Boolean,
      default: false,
      // ❌ NO required: true
    },
    SGSTAmount: {
      type: Number,
      default: 0,
    },
    CGSTAmount: {
      type: Number,
      default: 0,
    },
    taxableValue: {
      type: Number,
      required: true,
    },
    quotationValue: {
      type: Number,
      required: true,
    },
    documentDate: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
    associatedQuotationNumber: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// ❌ REMOVE THIS VALIDATION - This is causing the error!
// quotationSchema.pre("save", function (next) {
//   if (!this.sgst && !this.cgst) {
//     return next(new Error("GST or CGST must be applied to save the Quotation."));
//   }
//   next();
// });

// ✅ If you want to keep validation logic, make it optional:
// quotationSchema.pre("save", function (next) {
//   // No validation needed - GST is optional
//   next();
// });


const Quotation = mongoose.model("Quotation", quotationSchema);

module.exports = Quotation;