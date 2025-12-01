
// const Quotation = require("../models/quotation");
// exports.generateQuotationNumber = async () => {
//   const prefix = "QUODB";

//   const lastQuotation = await Quotation.findOne().sort({ createdAt: -1 });

//   let nextNumber = 1;

//   if (lastQuotation) {
//     const lastCode = lastQuotation.quotationNumber; // e.g., QUODB005
//     const numericPart = parseInt(lastCode.replace(prefix, "")); // 5
//     nextNumber = numericPart + 1; // 6
//   }

//   const paddedNumber = String(nextNumber).padStart(3, "0");

//   return `${prefix}${paddedNumber}`; 
// };


// exports.saveQuotation = async (req, res) => {
//     try {
//         const data = req.body;

        
//         if (!data.sgst && !data.cgst) {
//             return res.status(400).json({
//                 success: false,
//                 error: "GST or CGST must be applied to save the Quotation."
//             });
//         }

//         const quotationNumber = await exports.generateQuotationNumber();
        
//         // Auto calculate totals per item
//         data.items = data.items.map((item) => ({
//             ...item,
//             total: item.quantity * item.unitPrice
//         }));

//         const quotation = new Quotation({
//             quotationNumber,
//             billTO: data.billTO,
//             customerAddress: data.customerAddress,
//             customerGSTIN: data.customerGSTIN,
//             items: data.items,
//             sgst: data.sgst,
//             cgst: data.cgst,
//             SGSTAmount: data.SGSTAmount,
//             CGSTAmount: data.CGSTAmount,
//             taxableValue: data.taxableValue,
//             invoiceValue: data.invoiceValue,
//             documentDate: data.documentDate,
//         });

//         await quotation.save();

//         return res.status(201).json({
//             success: true,
//             message: "Quotation saved successfully",
//             quotationNumber,
//             quotation
//         });

//     } catch (err) {
//         return res.status(500).json({ success: false, error: err.message });
//     }
// };


// exports.fetchQuotationByNumber = async (req, res) => {
//   try {
//     const number = req.params.number;

//     const quotation = await Quotation.findOne({ quotationNumber: number });

//     if (!quotation) {
//       return res.status(404).json({ success: false, error: "Quotation not found" });
//     }

//     return res.status(200).json({
//       success: true,
//       quotation
//     });
//   } catch (err) {
//     return res.status(500).json({ success: false, error: err.message });
//   }
// };



// exports.updateQuotation = async (req, res) => {
//   try {
//     const data = req.body;
//     const quotationNumber = data.quotationNumber; // అప్డేట్ చేయడానికి Quotation నంబర్ తప్పనిసరి.

//     // 1️⃣ ధృవీకరణ (Validation): Quotation నంబర్ ఉందో లేదో తనిఖీ చేయండి
//     if (!quotationNumber) {
//       return res.status(400).json({
//         success: false,
//         error: "Quotation number is required for update operation."
//       });
//     }

//     const updatedItems = data.items.map((item) => ({
//       ...item,
//       total: Number(item.quantity) * Number(item.unitPrice), 
//     }));

//     // 3️⃣ అప్డేట్ చేయవలసిన డేటాను సిద్ధం చేయండి
//     const quotationFields = {
//       // ప్రధాన వివరాలు
//       billTO: data.billTO,
//       customerAddress: data.customerAddress,
//       customerGSTIN: data.customerGSTIN,
//       items: updatedItems,
//       sgst: data.sgst,
//       cgst: data.cgst,
//       SGSTAmount: Number(data.SGSTAmount) || 0,
//       CGSTAmount: Number(data.CGSTAmount) || 0,
//       taxableValue: Number(data.taxableValue),
//       invoiceValue: Number(data.invoiceValue),
//       paymentType: data.paymentType || "",
//       note: data.note || "",
//       updatedAt: new Date(),
//       documentDate: data.documentDate,
//     };

//     const resultQuotation = await Quotation.findOneAndUpdate(
//       { quotationNumber: quotationNumber }, 
//       { $set: quotationFields },
//       { new: true, runValidators: true }
//     );

  
//     if (!resultQuotation) {
//       return res.status(404).json({
//         success: false,
//         message: `Quotation number ${quotationNumber} not found for update.`
//       });
//     }

//     // 6️⃣ సక్సెస్ రెస్పాన్స్
//     return res.status(200).json({
//       success: true,
//       message: "Quotation updated successfully",
//       quotation: resultQuotation,
//     });

//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// };


// exports.deleteQuotation = async (req, res) => {
//   try {
//     // 1️⃣ URL పారామీటర్స్ నుండి Quotation నంబర్‌ను పొందండి (e.g., /api/quotation/delete/QUODB001)
//     const quotationNumber = req.params.number; 
    
//     // 2️⃣ తొలగించాల్సిన డాక్యుమెంట్‌ను వెతికి, తొలగించండి (Find and Delete)
//     // Mongoose: findOneAndDelete మెథడ్ ను ఉపయోగిస్తున్నాము
//     const deletedQuotation = await Quotation.findOneAndDelete(
//       { quotationNumber: quotationNumber } // Filter: ఈ నంబర్‌తో ఉన్న డాక్యుమెంట్‌ను వెతకాలి
//     );

//     // 3️⃣ తొలగింపు సక్సెస్ అయిందా లేదా అని తనిఖీ చేయండి
//     if (!deletedQuotation) {
//       // 404 Not Found: ఇచ్చిన నంబర్‌తో డాక్యుమెంట్ DB లో దొరకలేదు
//       return res.status(404).json({
//         success: false,
//         message: `Quotation number ${quotationNumber} not found or already deleted.`
//       });
//     }

//     // 4️⃣ సక్సెస్ రెస్పాన్స్
//     return res.status(200).json({
//       success: true,
//       message: `Quotation #${quotationNumber} deleted successfully.`,
//       quotation: deletedQuotation, // తొలగించబడిన డాక్యుమెంట్‌ను రిటర్న్ చేస్తుంది
//     });

//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// };



// exports.fetchAllQuotations = async (req, res) => {
//     try {
//         // Find all documents and sort by creation date descending
//         const quotations = await Quotation.find().sort({ createdAt: -1 });

//         return res.status(200).json({
//             success: true,
//             quotations: quotations
//         });
//     } catch (err) {
//         return res.status(500).json({
//             success: false,
//             error: "Error fetching all quotations: " + err.message
//         });
//     }
// };

const Quotation = require("../models/quotation"); // Assuming model path

exports.generateQuotationNumber = async () => {
  const prefix = "QUODB";

  const lastQuotation = await Quotation.findOne().sort({ createdAt: -1 });

  let nextNumber = 1;

  if (lastQuotation) {
    const lastCode = lastQuotation.quotationNumber; 
    const numericPart = parseInt(lastCode.replace(prefix, "")); 
    nextNumber = numericPart + 1; 
  }

  const paddedNumber = String(nextNumber).padStart(3, "0");

  return `${prefix}${paddedNumber}`; 
};


exports.saveQuotation = async (req, res) => {
    try {
        const data = req.body;

        if (!data.sgst && !data.cgst) {
            return res.status(400).json({
                success: false,
                error: "GST or CGST must be applied to save the Quotation."
            });
        }

        const quotationNumber = await exports.generateQuotationNumber();
        
        // Auto calculate totals per item
        data.items = data.items.map((item) => ({
            ...item,
            total: item.quantity * item.unitPrice
        }));

        // ✅ FIX: Ensure documentDate is always present and valid
        let documentDate = data.documentDate;
        
        // If not provided or invalid, use today's date
        if (!documentDate || documentDate === "" || documentDate === "Invalid Date") {
            documentDate = new Date().toISOString().split("T")[0];
            console.warn("⚠️ documentDate missing or invalid. Using today's date:", documentDate);
        }

        console.log("📅 Saving quotation with documentDate:", documentDate); // Debug log

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
            invoiceValue: data.quotationValue, // ✅ Changed from invoiceValue
            documentDate: documentDate, // ✅ Now correctly validated
        });

        await quotation.save();

        return res.status(201).json({
            success: true,
            message: "Quotation saved successfully",
            quotationNumber,
            quotation
        });

    } catch (err) {
        console.error("❌ Error saving quotation:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
};


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
    const quotationNumber = data.quotationNumber; 

    if (!quotationNumber) {
      return res.status(400).json({
        success: false,
        error: "Quotation number is required for update operation."
      });
    }

    const updatedItems = data.items.map((item) => ({
      ...item,
      total: Number(item.quantity) * Number(item.unitPrice), 
    }));

    // ✅ FIX: Ensure documentDate is always present and valid
    let documentDate = data.documentDate;
    
    // If not provided or invalid, use today's date
    if (!documentDate || documentDate === "" || documentDate === "Invalid Date") {
        documentDate = new Date().toISOString().split("T")[0];
        console.warn("⚠️ documentDate missing or invalid during update. Using today's date:", documentDate);
    }

    console.log("📅 Updating quotation with documentDate:", documentDate); // Debug log

    const quotationFields = {
      billTO: data.billTO,
      customerAddress: data.customerAddress,
      customerGSTIN: data.customerGSTIN,
      items: updatedItems,
      sgst: data.sgst,
      cgst: data.cgst,
      SGSTAmount: Number(data.SGSTAmount) || 0,
      CGSTAmount: Number(data.CGSTAmount) || 0,
      taxableValue: Number(data.taxableValue),
      quotationValue: Number(data.quotationValue), // ✅ Changed from invoiceValue
      paymentType: data.paymentType || "",
      note: data.note || "",
      updatedAt: new Date(),
      documentDate: documentDate, // ✅ Now correctly validated
    };

    const resultQuotation = await Quotation.findOneAndUpdate(
      { quotationNumber: quotationNumber }, 
      { $set: quotationFields },
      { new: true, runValidators: true }
    );

  
    if (!resultQuotation) {
      return res.status(404).json({
        success: false,
        message: `Quotation number ${quotationNumber} not found for update.`
      });
    }

    return res.status(200).json({
      success: true,
      message: "Quotation updated successfully",
      quotation: resultQuotation,
    });

  } catch (err) {
    console.error("❌ Error updating quotation:", err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


exports.deleteQuotation = async (req, res) => {
  try {
    const quotationNumber = req.params.number; 
    
    const deletedQuotation = await Quotation.findOneAndDelete(
      { quotationNumber: quotationNumber } 
    );

    if (!deletedQuotation) {
      return res.status(404).json({
        success: false,
        message: `Quotation number ${quotationNumber} not found or already deleted.`
      });
    }

    return res.status(200).json({
      success: true,
      message: `Quotation #${quotationNumber} deleted successfully.`,
      quotation: deletedQuotation, 
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


exports.fetchAllQuotations = async (req, res) => {
    try {
        const quotations = await Quotation.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            quotations: quotations
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Error fetching all quotations: " + err.message
        });
    }
};