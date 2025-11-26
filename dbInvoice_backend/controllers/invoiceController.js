
const invoice = require("../models/invoice");
const Invoice = require("../models/invoice");

// Generate invoice number
// exports.generateInvoiceNumber = async (req, res) => {
//   try {
//     const today = new Date();
//     const day = String(today.getDate()).padStart(2, "0"); // e.g., 14
//     const todayPrefix = `INVDB${day}`;                    // INVDB14

//     // 1. Fetch LAST saved invoice overall (not by date)
//     const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });

//     let runningNumber = 1;

//     if (lastInvoice) {
//       const last2Digits = parseInt(lastInvoice.invoiceNumber.slice(-2)); 
//       runningNumber = last2Digits + 1;
//     }

//     // 2. Combine prefix + running number
//     const padded = String(runningNumber).padStart(2, "0");  
//     const newInvoiceNumber = `${todayPrefix}${padded}`;

//     res.status(200).json({ 
//       success: true, 
//       invoiceNumber: newInvoiceNumber 
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


exports.generateInvoiceNumber = async (req, res) => {
  try {
    const prefix = "INVDB"; // fixed prefix
    const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });

    let runningNumber = 1;

    if (lastInvoice) {
      // extract last 3 digits only
      const last3 = parseInt(lastInvoice.invoiceNumber.slice(-3)); 
      runningNumber = last3 + 1;
    }

    const padded = String(runningNumber).padStart(3, "0"); // 001, 002, 003 ...
    const newInvoiceNumber = `${prefix}${padded}`;

    res.status(200).json({
      success: true,
      invoiceNumber: newInvoiceNumber
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// exports.saveInvoice = async (req, res) => {
//   try {
//     const data = req.body;

//     // Auto add total price inside items
//     data.items = data.items.map(item => ({
//       ...item,
//       total: item.quantity * item.unitPrice
//     }));

//     const invoice = new Invoice(data);
//     await invoice.save();

//     return res.status(201).json({
//       success: true,
//       message: "Invoice saved successfully",
//       invoice
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       error: err.message
//     });
//   }
// };



exports.saveInvoice = async (req, res) => {
  try {
    // 1️⃣ Auto-generate Invoice Number
    const prefix = "INVDB";
    const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });

    let runningNumber = 1;

    if (lastInvoice) {
      const last3Digits = parseInt(lastInvoice.invoiceNumber.slice(-3));
      runningNumber = last3Digits + 1;
    }

    const padded = String(runningNumber).padStart(3, "0");
    const invoiceNumber = `${prefix}${padded}`;

    // 2️⃣ Get request body
    const data = req.body;

    // 3️⃣ Auto add total = qty * unitPrice
    const updatedItems = data.items.map((item) => ({
      ...item,
      total: item.quantity * item.unitPrice,
    }));

    // 4️⃣ Create invoice object for DB
    const newInvoice = new Invoice({
      invoiceNumber: invoiceNumber,
      quotationNumber: data.quotationNumber || "",   // 👈 add if needed
      billTO: data.billTO,
      customerAddress: data.customerAddress,
      customerGSTIN: data.customerGSTIN,
      items: updatedItems,
      sgst: data.sgst,
      cgst: data.cgst,
      SGSTAmount: data.SGSTAmount || 0,
      CGSTAmount: data.CGSTAmount || 0,
      taxableValue: data.taxableValue,
      invoiceValue: data.invoiceValue,
      paymentType: data.paymentType || "",
      note: data.note || "",
    });

    // 5️⃣ Save to DB
    await newInvoice.save();

    return res.status(201).json({
      success: true,
      message: "Invoice saved successfully",
      invoiceNumber,
      invoice: newInvoice,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
exports.fetchInvoiceByNumber = async (req, res) => {
    try {
        const number = req.params.number;

        // 🟢 FIX: Ensure Mongoose Model 'Invoice' is used, and store result in a distinct variable name
        const resultInvoice = await Invoice.findOne({ invoiceNumber: number });

        if (!resultInvoice) {
            // Document not found in DB
            return res.status(404).json({ success: false, error: "Invoice not found" });
        }

        return res.status(200).json({
            success: true,
            // Renaming the returned data to 'invoice' for client consistency
            invoice: resultInvoice 
        });
    } catch (err) {
        // Catches true server errors
        return res.status(500).json({ success: false, error: err.message });
    }
};

exports.updateInvoice = async (req, res) => {
  try {
    const data = req.body;
    const invoiceNumber = data.invoiceNumber; // అప్డేట్ చేయడానికి ఇన్వాయిస్ నంబర్ తప్పనిసరి.

    // 1️⃣ ఇన్వాయిస్ నంబర్ అందించబడిందో లేదో తనిఖీ చేయండి
    if (!invoiceNumber) {
      return res.status(400).json({
        success: false,
        error: "Invoice number is required for update operation."
      });
    }

    // 2️⃣ Item Totalsను లెక్కించాలి
    const updatedItems = data.items.map((item) => ({
      ...item,
      total: item.quantity * item.unitPrice,
    }));

    // 3️⃣ అప్డేట్ చేయవలసిన డేటాను సిద్ధం చేయండి
    const invoiceFields = {
      // Invoice number ను అప్డేట్ చేయాల్సిన అవసరం లేదు, కానీ ఇతర ఫీల్డ్స్ ను అప్డేట్ చేయాలి
      originalQuotationNumber: data.originalQuotationNumber || data.quotationNumber || "", 
      billTO: data.billTO,
      customerAddress: data.customerAddress,
      customerGSTIN: data.customerGSTIN,
      items: updatedItems,
      sgst: data.sgst,
      cgst: data.cgst,
      SGSTAmount: data.SGSTAmount || 0,
      CGSTAmount: data.CGSTAmount || 0,
      taxableValue: data.taxableValue,
      invoiceValue: data.invoiceValue,
      paymentType: data.paymentType || "",
      note: data.note || "",
      updatedAt: new Date(), // అప్డేట్ సమయాన్ని ట్రాక్ చేయడానికి
    };

    // 4️⃣ డాక్యుమెంట్ ను వెతికి అప్డేట్ చేయండి
    const resultInvoice = await Invoice.findOneAndUpdate(
      { invoiceNumber: invoiceNumber }, // దేనిని వెతకాలి
      { $set: invoiceFields },         // దేనితో అప్డేట్ చేయాలి
      { new: true, runValidators: true } // అప్డేట్ అయిన డాక్యుమెంట్ ను రిటర్న్ చేయండి
    );

    // 5️⃣ అప్డేట్ సక్సెస్ అయిందా లేదా అని తనిఖీ చేయండి
    if (!resultInvoice) {
      return res.status(404).json({
        success: false,
        message: `Invoice number ${invoiceNumber} not found for update.`
      });
    }

    // 6️⃣ సక్సెస్ రెస్పాన్స్
    return res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      invoice: resultInvoice,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    // 1️⃣ URL పారామీటర్స్ నుండి Quotation నంబర్‌ను పొందండి (e.g., /api/quotation/delete/QUODB001)
    const invoiceNumber = req.params.number; 
    
    // 2️⃣ తొలగించాల్సిన డాక్యుమెంట్‌ను వెతికి, తొలగించండి (Find and Delete)
    // Mongoose: findOneAndDelete మెథడ్ ను ఉపయోగిస్తున్నాము
    const deletedInvoice = await Invoice.findOneAndDelete(
      { invoiceNumber: invoiceNumber } // Filter: ఈ నంబర్‌తో ఉన్న డాక్యుమెంట్‌ను వెతకాలి
    );

    // 3️⃣ తొలగింపు సక్సెస్ అయిందా లేదా అని తనిఖీ చేయండి
    if (!deletedInvoice) {
      // 404 Not Found: ఇచ్చిన నంబర్‌తో డాక్యుమెంట్ DB లో దొరకలేదు
      return res.status(404).json({
        success: false,
        message: `Invoice number ${invoiceNumber} not found or already deleted.`
      });
    }

    // 4️⃣ సక్సెస్ రెస్పాన్స్
    return res.status(200).json({
      success: true,
      message: `Invoice #${invoiceNumber} deleted successfully.`,
      invoice: deletedInvoice, // తొలగించబడిన డాక్యుమెంట్‌ను రిటర్న్ చేస్తుంది
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


exports.fetchAllInvoices = async (req, res) => {
    try {
        // Find all documents and sort by creation date descending
        const invoices = await Invoice.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            invoices: invoices 
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Error fetching all invoices: " + err.message
        });
    }
};