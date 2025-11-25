// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const PDFDocument = require('pdfkit');
// const { ToWords } = require('to-words');
// require('dotenv').config();

// const app = express();
// const toWords = new ToWords();

// app.use(cors({ origin: process.env.FRONTEND_URL }));
// app.use(express.json());

// // MongoDB Atlas connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('✅ MongoDB connected successfully!'))
//   .catch(err => console.error('❌ MongoDB connection error:', err));

// // Schemas
// const documentSchema = new mongoose.Schema({
//   type: { type: String, required: true, enum: ['invoice', 'quotation'] },
//   number: { type: String, required: true, unique: true },
//   date: { type: Date, default: Date.now },
//   billTO: { type: String, required: true },
//   customerAddress: String,
//   customerGSTIN: String,
//   items: [{
//     description: String,
//     quantity: Number,
//     unitPrice: Number
//   }],
//   sgst: Boolean,
//   cgst: Boolean,
//   sgstValue: Number,
//   cgstValue: Number,
//   taxableValue: Number,
//   invoiceValue: Number
// }, { timestamps: true });

// const counterSchema = new mongoose.Schema({
//   type: { type: String, required: true },
//   date: { type: String, required: true },
//   sequence: { type: Number, default: 0 }
// });

// // Compound unique index for type + date combination
// counterSchema.index({ type: 1, date: 1 }, { unique: true });

// const Counter = mongoose.model('Counter', counterSchema);

// // Routes
// app.get('/api/generate-number', async (req, res) => {
//   try {
//     const { type } = req.query;
//     if (!['invoice', 'quotation'].includes(type)) {
//       return res.status(400).json({ message: 'Invalid type' });
//     }

//     const prefix = type === 'invoice' ? 'DBINV' : 'DBQUO';
//     const today = new Date();
//     const day = today.getDate().toString().padStart(2, '0');
//     const dateKey = today.toISOString().slice(0, 10); // YYYY-MM-DD

//     const counterId = `${type}-${dateKey}`;
//     const counter = await Counter.findByIdAndUpdate(
//       counterId,
//       { $inc: { sequence: 1 } },
//       { new: true, upsert: true }
//     );

//     const paddedSeq = counter.sequence.toString().padStart(2, '0');
//     const number = `${prefix}${day}${paddedSeq}`;

//     res.json({ number });
//   } catch (error) {
//     console.error('Error generating number:', error);
//     res.status(500).json({ message: 'Error generating number' });
//   }
// });




// // app.get('/api/generate-number', async (req, res) => {
// //   try {
// //     const { type } = req.query;
// //     if (!['invoice', 'quotation'].includes(type)) {
// //       return res.status(400).json({ message: 'Invalid type' });
// //     }

// //     const prefix = type === 'invoice' ? 'DBINV' : 'DBQUO';
// //     const today = new Date();
// //     const day = today.getDate().toString().padStart(2, '0');
// //     const dateKey = today.toISOString().slice(0, 10); // "2025-11-13"

// //     // Find or create counter for today's date and type
// //     const counter = await Counter.findOneAndUpdate(
// //       { type, date: dateKey },
// //       { $inc: { sequence: 1 } },
// //       { new: true, upsert: true }
// //     );

// //     const paddedSeq = counter.sequence.toString().padStart(2, '0');
// //     const number = `${prefix}${day}${paddedSeq}`;

// //     res.json({ number });
// //   } catch (error) {
// //     console.error('Error generating number:', error);
// //     res.status(500).json({ message: 'Error generating number' });
// //   }
// // });



// // Save document
// app.post('/api/save', async (req, res) => {
//   try {
//     const existing = await Document.findOne({ number: req.body.number });
//     if (existing) return res.status(400).json({ message: 'Document number already exists' });

//     const document = new Document(req.body);
//     await document.save();

//     res.json({ message: 'Saved successfully', number: document.number, id: document._id });
//   } catch (error) {
//     res.status(500).json({ message: 'Error saving document', error: error.message });
//   }
// });

// // Fetch by number
// app.get('/api/fetch/:number', async (req, res) => {
//   try {
//     const document = await Document.findOne({ number: req.params.number });
//     if (!document) return res.status(404).json({ message: 'Document not found' });
//     res.json(document);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching document' });
//   }
// });

// // Download PDF
// app.get('/api/download/:number', async (req, res) => {
//   try {
//     const document = await Document.findOne({ number: req.params.number });
//     if (!document) return res.status(404).json({ message: 'Document not found' });

//     const doc = new PDFDocument({ size: 'A4', margin: 50 });
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `attachment; filename=${document.number}.pdf`);
//     doc.pipe(res);

//     doc.fontSize(20).text(document.type === 'invoice' ? 'INVOICE' : 'QUOTATION', { align: 'center' }).moveDown();
//     doc.fontSize(12).text('DESIGN BLOCKS').fontSize(10);
//     doc.text('GSTIN: 37AKOPY6766H1Z4');
//     doc.text('Flat No 406, 5th Floor, Botcha Square');
//     doc.text('Madhavadhara, VISAKHAPATNAM-530007').moveDown();
//     doc.text(`${document.type === 'invoice' ? 'Invoice' : 'Quotation'} No: ${document.number}`);
//     doc.text(`Date: ${new Date(document.date).toLocaleDateString('en-GB')}`).moveDown();
//     doc.fontSize(11).text('Bill To:', { underline: true });
//     if (document.customerGSTIN) doc.fontSize(10).text(`GSTIN: ${document.customerGSTIN}`);
//     doc.text(document.billTO);
//     doc.text(document.customerAddress).moveDown();

//     const col = [50, 100, 300, 380, 460];
//     doc.fontSize(10).text('S.No', col[0], doc.y);
//     doc.text('Description', col[1], doc.y);
//     doc.text('Qty', col[2], doc.y);
//     doc.text('Unit Price', col[3], doc.y);
//     doc.text('Total', col[4], doc.y);
//     doc.moveTo(col[0], doc.y + 5).lineTo(545, doc.y + 5).stroke().moveDown();

//     let y = doc.y;
//     document.items.forEach((item, i) => {
//       doc.text(i + 1, col[0], y);
//       doc.text(item.description, col[1], y, { width: 180 });
//       doc.text(item.quantity, col[2], y);
//       doc.text(item.unitPrice.toFixed(2), col[3], y);
//       doc.text((item.quantity * item.unitPrice).toFixed(2), col[4], y);
//       y = doc.y + 10;
//     });

//     doc.moveTo(col[0], y).lineTo(545, y).stroke().moveDown();
//     doc.text('Taxable Value:', 400, doc.y);
//     doc.text(document.taxableValue.toFixed(2), 500, doc.y - 10).moveDown();

//     if (document.sgst) {
//       doc.text('SGST @ 9%:', 400, doc.y);
//       doc.text(document.sgstValue.toFixed(2), 500, doc.y - 10).moveDown();
//     }

//     if (document.cgst) {
//       doc.text('CGST @ 9%:', 400, doc.y);
//       doc.text(document.cgstValue.toFixed(2), 500, doc.y - 10).moveDown();
//     }

//     if (document.sgst || document.cgst) {
//       doc.fontSize(11).text('Invoice Value:', 400, doc.y);
//       doc.text(document.invoiceValue.toFixed(2), 500, doc.y - 10).moveDown();
//     }

//     const amountInWords = toWords.convert(document.invoiceValue > 0 ? document.invoiceValue : document.taxableValue);
//     doc.fontSize(10).text(`Amount in Words: ${amountInWords}`, 50, doc.y).moveDown(2);
//     doc.text('BANK DETAILS:', { underline: true });
//     doc.text('UNION BANK OF INDIA, MURALI NAGAR, VISAKHAPATNAM');
//     doc.text('A/C NUMBER: 753601010050187');
//     doc.text('IFSC: UBIN0810746');
//     doc.text('UPI ID: designblocks@ybl').moveDown(2);
//     doc.text('For DESIGN BLOCKS', 400, doc.y).moveDown(3);
//     doc.text('Thank You', { align: 'center' });

//     if (document.type === 'quotation') {
//       doc.moveDown();
//       doc.fontSize(9).text('Terms and Conditions:', { underline: true });
//       doc.text('Quotation prices are valid for 20 days from the date of issue.');
//       doc.text('Any increase in project scope will result in an additional cost.');
//     }

//     doc.end();
//   } catch (error) {
//     res.status(500).json({ message: 'Error generating PDF' });
//   }
// });

// // List all documents
// app.get('/api/documents', async (req, res) => {
//   try {
//     const filter = req.query.type ? { type: req.query.type } : {};
//     const documents = await Document.find(filter).sort({ createdAt: -1 });
//     res.json(documents);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching documents' });
//   }
// });

// // Delete document
// app.delete('/api/delete/:number', async (req, res) => {
//   try {
//     const deleted = await Document.findOneAndDelete({ number: req.params.number });
//     if (!deleted) {
//       return res.status(404).json({ message: 'Document not found' });
//     }
//     res.json({ message: 'Deleted successfully', number: req.params.number });
//   } catch (error) {
//     console.error('Error deleting document:', error);
//     res.status(500).json({ message: 'Error deleting document' });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const PDFDocument = require('pdfkit');
// // const { ToWords } = require('to-words');
// // require('dotenv').config();

// // const app = express();
// // const toWords = new ToWords();

// // app.use(cors({ origin: process.env.FRONTEND_URL }));
// // app.use(express.json());

// // // MongoDB Atlas connection
// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => console.log('✅ MongoDB connected successfully!'))
// //   .catch(err => console.error('❌ MongoDB connection error:', err));

// // // Schemas
// // const documentSchema = new mongoose.Schema({
// //   type: { type: String, required: true, enum: ['invoice', 'quotation'] },
// //   number: { type: String, required: true, unique: true },
// //   date: { type: Date, default: Date.now },
// //   billTO: { type: String, required: true },
// //   customerAddress: String,
// //   customerGSTIN: String,
// //   items: [{
// //     description: String,
// //     quantity: Number,
// //     unitPrice: Number
// //   }],
// //   sgst: Boolean,
// //   cgst: Boolean,
// //   sgstValue: Number,
// //   cgstValue: Number,
// //   taxableValue: Number,
// //   invoiceValue: Number
// // }, { timestamps: true });

// // const Document = mongoose.model('Document', documentSchema);

// // const counterSchema = new mongoose.Schema({
// //   _id: { type: String, required: true }, // e.g., "invoice-2025-11-13" or "quotation-2025-11-13"
// //   sequence: { type: Number, default: 0 }
// // });

// // const Counter = mongoose.model('Counter', counterSchema);

// // // Routes

// // // Generate invoice/quotation number with DD + sequence format
// // app.get('/api/generate-number', async (req, res) => {
// //   try {
// //     const { type } = req.query;
// //     if (!['invoice', 'quotation'].includes(type)) {
// //       return res.status(400).json({ message: 'Invalid type' });
// //     }

// //     const prefix = type === 'invoice' ? 'DBINV' : 'DBQUO';
// //     const today = new Date();
// //     const day = today.getDate().toString().padStart(2, '0'); // Get day as 01, 02, 13, 14, etc.
// //     const dateKey = today.toISOString().slice(0, 10); // "2025-11-13"
    
// //     // Create unique counter ID for type and date
// //     const counterId = `${type}-${dateKey}`;

// //     // Increment counter for this specific type and date
// //     const counter = await Counter.findByIdAndUpdate(
// //       counterId,
// //       { $inc: { sequence: 1 } },
// //       { new: true, upsert: true }
// //     );

// //     // Pad sequence with leading zeros (01, 02, 03, etc.)
// //     const paddedSeq = counter.sequence.toString().padStart(2, '0');
    
// //     // Create final number: DBINV1301, DBINV1302, DBQUO1301, etc.
// //     const number = `${prefix}${day}${paddedSeq}`;

// //     res.json({ number });
// //   } catch (error) {
// //     console.error('Error generating number:', error);
// //     res.status(500).json({ message: 'Error generating number' });
// //   }
// // });

// // // Save document
// // app.post('/api/save', async (req, res) => {
// //   try {
// //     const existing = await Document.findOne({ number: req.body.number });
// //     if (existing) return res.status(400).json({ message: 'Document number already exists' });

// //     const document = new Document(req.body);
// //     await document.save();

// //     res.json({ message: 'Saved successfully', number: document.number, id: document._id });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error saving document', error: error.message });
// //   }
// // });

// // // Fetch by number
// // app.get('/api/fetch/:number', async (req, res) => {
// //   try {
// //     const document = await Document.findOne({ number: req.params.number });
// //     if (!document) return res.status(404).json({ message: 'Document not found' });
// //     res.json(document);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error fetching document' });
// //   }
// // });

// // // Download PDF
// // app.get('/api/download/:number', async (req, res) => {
// //   try {
// //     const document = await Document.findOne({ number: req.params.number });
// //     if (!document) return res.status(404).json({ message: 'Document not found' });

// //     const doc = new PDFDocument({ size: 'A4', margin: 50 });
// //     res.setHeader('Content-Type', 'application/pdf');
// //     res.setHeader('Content-Disposition', `attachment; filename=${document.number}.pdf`);
// //     doc.pipe(res);

// //     doc.fontSize(20).text(document.type === 'invoice' ? 'INVOICE' : 'QUOTATION', { align: 'center' }).moveDown();
// //     doc.fontSize(12).text('DESIGN BLOCKS').fontSize(10);
// //     doc.text('GSTIN: 37AKOPY6766H1Z4');
// //     doc.text('Flat No 406, 5th Floor, Botcha Square');
// //     doc.text('Madhavadhara, VISAKHAPATNAM-530007').moveDown();
// //     doc.text(`${document.type === 'invoice' ? 'Invoice' : 'Quotation'} No: ${document.number}`);
// //     doc.text(`Date: ${new Date(document.date).toLocaleDateString('en-GB')}`).moveDown();
// //     doc.fontSize(11).text('Bill To:', { underline: true });
// //     if (document.customerGSTIN) doc.fontSize(10).text(`GSTIN: ${document.customerGSTIN}`);
// //     doc.text(document.billTO);
// //     doc.text(document.customerAddress).moveDown();

// //     const col = [50, 100, 300, 380, 460];
// //     doc.fontSize(10).text('S.No', col[0], doc.y);
// //     doc.text('Description', col[1], doc.y);
// //     doc.text('Qty', col[2], doc.y);
// //     doc.text('Unit Price', col[3], doc.y);
// //     doc.text('Total', col[4], doc.y);
// //     doc.moveTo(col[0], doc.y + 5).lineTo(545, doc.y + 5).stroke().moveDown();

// //     let y = doc.y;
// //     document.items.forEach((item, i) => {
// //       doc.text(i + 1, col[0], y);
// //       doc.text(item.description, col[1], y, { width: 180 });
// //       doc.text(item.quantity, col[2], y);
// //       doc.text(item.unitPrice.toFixed(2), col[3], y);
// //       doc.text((item.quantity * item.unitPrice).toFixed(2), col[4], y);
// //       y = doc.y + 10;
// //     });

// //     doc.moveTo(col[0], y).lineTo(545, y).stroke().moveDown();
// //     doc.text('Taxable Value:', 400, doc.y);
// //     doc.text(document.taxableValue.toFixed(2), 500, doc.y - 10).moveDown();

// //     if (document.sgst) {
// //       doc.text('SGST @ 9%:', 400, doc.y);
// //       doc.text(document.sgstValue.toFixed(2), 500, doc.y - 10).moveDown();
// //     }

// //     if (document.cgst) {
// //       doc.text('CGST @ 9%:', 400, doc.y);
// //       doc.text(document.cgstValue.toFixed(2), 500, doc.y - 10).moveDown();
// //     }

// //     if (document.sgst || document.cgst) {
// //       doc.fontSize(11).text('Invoice Value:', 400, doc.y);
// //       doc.text(document.invoiceValue.toFixed(2), 500, doc.y - 10).moveDown();
// //     }

// //     const amountInWords = toWords.convert(document.invoiceValue > 0 ? document.invoiceValue : document.taxableValue);
// //     doc.fontSize(10).text(`Amount in Words: ${amountInWords}`, 50, doc.y).moveDown(2);
// //     doc.text('BANK DETAILS:', { underline: true });
// //     doc.text('UNION BANK OF INDIA, MURALI NAGAR, VISAKHAPATNAM');
// //     doc.text('A/C NUMBER: 753601010050187');
// //     doc.text('IFSC: UBIN0810746');
// //     doc.text('UPI ID: designblocks@ybl').moveDown(2);
// //     doc.text('For DESIGN BLOCKS', 400, doc.y).moveDown(3);
// //     doc.text('Thank You', { align: 'center' });

// //     if (document.type === 'quotation') {
// //       doc.moveDown();
// //       doc.fontSize(9).text('Terms and Conditions:', { underline: true });
// //       doc.text('Quotation prices are valid for 20 days from the date of issue.');
// //       doc.text('Any increase in project scope will result in an additional cost.');
// //     }

// //     doc.end();
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error generating PDF' });
// //   }
// // });

// // // List all documents
// // app.get('/api/documents', async (req, res) => {
// //   try {
// //     const filter = req.query.type ? { type: req.query.type } : {};
// //     const documents = await Document.find(filter).sort({ createdAt: -1 });
// //     res.json(documents);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error fetching documents' });
// //   }
// // });

// // // Delete document
// // app.delete('/api/delete/:number', async (req, res) => {
// //   try {
// //     const deleted = await Document.findOneAndDelete({ number: req.params.number });
// //     if (!deleted) {
// //       return res.status(404).json({ message: 'Document not found' });
// //     }
// //     res.json({ message: 'Deleted successfully', number: req.params.number });
// //   } catch (error) {
// //     console.error('Error deleting document:', error);
// //     res.status(500).json({ message: 'Error deleting document' });
// //   }
// // });

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running on port ${PORT}`);
// // });



require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const invoiceRoutes = require("./routes/invoiceRoutes");

const quotationRoutes=require('./routes/quotationRoutes');
const adminRoutes = require("./routes/adminRoutes");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/invoice", invoiceRoutes);
app.use("/api/quotation", require("./routes/quotationRoutes"));
app.use("/api/admin", adminRoutes);


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log("MongoDB Error:", err));


// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const invoiceRoutes = require("./routes/invoiceRoutes");
// const quotationRoutes = require("./routes/quotationRoutes");

// const app = express();

// // ✅ CORS Configuration
// app.use(cors({
//   origin: "https://invoice-frontend-5cme.onrender.com", // your frontend URL
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// // ✅ Middleware
// app.use(express.json());

// // ✅ Routes
// app.use("/api/invoice", invoiceRoutes);
// app.use("/api/quotation", quotationRoutes);

// // ✅ Root Route
// app.get("/", (req, res) => {
//   res.send("Backend is live!");
// });

// // ✅ MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log("MongoDB Connected Successfully");
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// })
// .catch((err) => {
//   console.error("MongoDB Connection Error:", err);
// });