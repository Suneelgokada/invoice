
// const Quotation = require("../models/quotation");

// // ----------- GENERATE QUOTATION NUMBER -----------
// exports.generateQuotationNumber = async () => {
//   const today = new Date();
//   const day = String(today.getDate()).padStart(2, "0");  
//   const prefix = `QUODB${day}`;   // Example: QUODB14

//   const lastQuotation = await Quotation.findOne().sort({ createdAt: -1 });

//   let runningNumber = 1;

//   if (lastQuotation) {
//     const lastTwo = parseInt(lastQuotation.quotationNumber.slice(-2));
//     runningNumber = lastTwo + 1;
//   }

//   const padded = String(runningNumber).padStart(2, "0");
//   return `${prefix}${padded}`;
// };


// // ----------- SAVE QUOTATION -----------
// exports.saveQuotation = async (req, res) => {
//   try {
//     // Auto-generate quotation number
//     const quotationNumber = await exports.generateQuotationNumber();

//     const data = req.body;

//     // Auto calculate total inside items
//     data.items = data.items.map((item) => ({
//       ...item,
//       total: item.quantity * item.unitPrice
//     }));

//     const quotation = new Quotation({
//       quotationNumber,
//       billTO: data.billTO,
//       customerAddress: data.customerAddress,
//       customerGSTIN: data.customerGSTIN,
//       items: data.items,
//       sgst: data.sgst,
//       cgst: data.cgst,
//       SGSTAmount: data.SGSTAmount,
//       CGSTAmount: data.CGSTAmount,
//       taxableValue: data.taxableValue,
//       invoiceValue: data.invoiceValue
//     });

//     await quotation.save();

//     return res.status(201).json({
//       success: true,
//       message: "Quotation saved successfully",
//       quotationNumber,
//       quotation
//     });

//   } catch (err) {
//     return res.status(500).json({ success: false, error: err.message });
//   }
// };

const Quotation = require("../models/quotation");

// ===============================================
// === GENERATE QUOTATION NUMBER (FINAL PERFECT) ===
// ===============================================
exports.generateQuotationNumber = async () => {
  const prefix = "QUODB";

  // Find last created quotation
  const lastQuotation = await Quotation.findOne().sort({ createdAt: -1 });

  let nextNumber = 1;

  if (lastQuotation) {
    const lastCode = lastQuotation.quotationNumber; // e.g., QUODB005
    const numericPart = parseInt(lastCode.replace(prefix, "")); // 5
    nextNumber = numericPart + 1; // 6
  }

  // Ensure 3-digit padded number
  const paddedNumber = String(nextNumber).padStart(3, "0");

  return `${prefix}${paddedNumber}`; 
};


// ===============================================
// === SAVE QUOTATION (AUTO GENERATES NUMBER) ====
// ===============================================
// exports.saveQuotation = async (req, res) => {
//   try {
//     const quotationNumber = await exports.generateQuotationNumber();
//     const data = req.body;

//     // Auto calculate totals per item
//     data.items = data.items.map((item) => ({
//       ...item,
//       total: item.quantity * item.unitPrice
//     }));

//     const quotation = new Quotation({
//       quotationNumber,
//       billTO: data.billTO,
//       customerAddress: data.customerAddress,
//       customerGSTIN: data.customerGSTIN,
//       items: data.items,
//       sgst: data.sgst,
//       cgst: data.cgst,
//       SGSTAmount: data.SGSTAmount,
//       CGSTAmount: data.CGSTAmount,
//       taxableValue: data.taxableValue,
//       invoiceValue: data.invoiceValue
//     });

//     await quotation.save();

//     return res.status(201).json({
//       success: true,
//       message: "Quotation saved successfully",
//       quotationNumber,
//       quotation
//     });

//   } catch (err) {
//     return res.status(500).json({ success: false, error: err.message });
//   }
// };


exports.saveQuotation = async (req, res) => {
    try {
        const data = req.body;

        // 🛑 NEW REQUIREMENT CHECK: SGST and CGST must not both be false.
        if (!data.sgst && !data.cgst) {
            return res.status(400).json({
                success: false,
                error: "GST or CGST must be applied to save the Quotation."
            });
        }
        // 🛑 NEW REQUIREMENT CHECK ENDS

        const quotationNumber = await exports.generateQuotationNumber();
        
        // Auto calculate totals per item
        data.items = data.items.map((item) => ({
            ...item,
            total: item.quantity * item.unitPrice
        }));

        const quotation = new Quotation({
            quotationNumber,
            billTO: data.billTO,
            customerAddress: data.customerAddress,
            customerGSTIN: data.customerGSTIN,
            items: data.items,
            sgst: data.sgst,
            cgst: data.cgst,
            SGSTAmount: data.SGSTAmount,
            CGSTAmount: data.CGSTAmount,
            taxableValue: data.taxableValue,
            invoiceValue: data.invoiceValue
        });

        await quotation.save();

        return res.status(201).json({
            success: true,
            message: "Quotation saved successfully",
            quotationNumber,
            quotation
        });

    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

// ===============================================
// === FETCH BY QUOTATION NUMBER =================
// ===============================================
exports.fetchQuotationByNumber = async (req, res) => {
  try {
    const number = req.params.number;

    const quotation = await Quotation.findOne({ quotationNumber: number });

    if (!quotation) {
      return res.status(404).json({ success: false, error: "Quotation not found" });
    }

    return res.status(200).json({
      success: true,
      quotation
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};



exports.updateQuotation = async (req, res) => {
  try {
    const data = req.body;
    const quotationNumber = data.quotationNumber; // అప్డేట్ చేయడానికి Quotation నంబర్ తప్పనిసరి.

    // 1️⃣ ధృవీకరణ (Validation): Quotation నంబర్ ఉందో లేదో తనిఖీ చేయండి
    if (!quotationNumber) {
      return res.status(400).json({
        success: false,
        error: "Quotation number is required for update operation."
      });
    }
    
    // 2️⃣ Item Totalsను తిరిగి లెక్కించండి (Recalculate Item Totals)
    // డేటా ఇంటిగ్రిటీ కోసం, క్వాంటిటీ మరియు ధర స్ట్రింగ్స్ గా వస్తే వాటిని నంబర్లుగా మార్చాలి.
    const updatedItems = data.items.map((item) => ({
      ...item,
      total: Number(item.quantity) * Number(item.unitPrice), 
    }));

    // 3️⃣ అప్డేట్ చేయవలసిన డేటాను సిద్ధం చేయండి
    const quotationFields = {
      // ప్రధాన వివరాలు
      billTO: data.billTO,
      customerAddress: data.customerAddress,
      customerGSTIN: data.customerGSTIN,
      items: updatedItems,
      
      // GST మరియు విలువలు (వీటిని నంబర్లుగా మార్చడం ముఖ్యం)
      sgst: data.sgst,
      cgst: data.cgst,
      SGSTAmount: Number(data.SGSTAmount) || 0,
      CGSTAmount: Number(data.CGSTAmount) || 0,
      taxableValue: Number(data.taxableValue),
      invoiceValue: Number(data.invoiceValue),
      
      // అదనపు ఫీల్డ్స్
      paymentType: data.paymentType || "",
      note: data.note || "",
      updatedAt: new Date(), // అప్డేట్ సమయాన్ని ట్రాక్ చేయడానికి
    };

    // 4️⃣ డాక్యుమెంట్ ను వెతికి అప్డేట్ చేయండి (Find and Update)
    // Mongoose: findOneAndUpdate మెథడ్ ను ఉపయోగిస్తున్నాము
    const resultQuotation = await Quotation.findOneAndUpdate(
      { quotationNumber: quotationNumber }, // Filter: ఈ నంబర్‌తో ఉన్న డాక్యుమెంట్‌ను వెతకాలి
      { $set: quotationFields },            // Update Data: పైన సిద్ధం చేసిన డేటాతో పూర్తిగా ఓవర్‌రైడ్ చేయాలి
      { new: true, runValidators: true }  // Options: అప్డేట్ అయిన డాక్యుమెంట్ ను రిటర్న్ చేయండి
    );

    // 5️⃣ అప్డేట్ సక్సెస్ అయిందా లేదా అని తనిఖీ చేయండి
    if (!resultQuotation) {
      return res.status(404).json({
        success: false,
        message: `Quotation number ${quotationNumber} not found for update.`
      });
    }

    // 6️⃣ సక్సెస్ రెస్పాన్స్
    return res.status(200).json({
      success: true,
      message: "Quotation updated successfully",
      quotation: resultQuotation,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


exports.deleteQuotation = async (req, res) => {
  try {
    // 1️⃣ URL పారామీటర్స్ నుండి Quotation నంబర్‌ను పొందండి (e.g., /api/quotation/delete/QUODB001)
    const quotationNumber = req.params.number; 
    
    // 2️⃣ తొలగించాల్సిన డాక్యుమెంట్‌ను వెతికి, తొలగించండి (Find and Delete)
    // Mongoose: findOneAndDelete మెథడ్ ను ఉపయోగిస్తున్నాము
    const deletedQuotation = await Quotation.findOneAndDelete(
      { quotationNumber: quotationNumber } // Filter: ఈ నంబర్‌తో ఉన్న డాక్యుమెంట్‌ను వెతకాలి
    );

    // 3️⃣ తొలగింపు సక్సెస్ అయిందా లేదా అని తనిఖీ చేయండి
    if (!deletedQuotation) {
      // 404 Not Found: ఇచ్చిన నంబర్‌తో డాక్యుమెంట్ DB లో దొరకలేదు
      return res.status(404).json({
        success: false,
        message: `Quotation number ${quotationNumber} not found or already deleted.`
      });
    }

    // 4️⃣ సక్సెస్ రెస్పాన్స్
    return res.status(200).json({
      success: true,
      message: `Quotation #${quotationNumber} deleted successfully.`,
      quotation: deletedQuotation, // తొలగించబడిన డాక్యుమెంట్‌ను రిటర్న్ చేస్తుంది
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};