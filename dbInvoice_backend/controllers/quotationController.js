
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

// const Quotation = require("../models/quotation"); // Assuming model path

// exports.generateQuotationNumber = async () => {
//   const prefix = "QUODB";

//   const lastQuotation = await Quotation.findOne().sort({ createdAt: -1 });

//   let nextNumber = 1;

//   if (lastQuotation) {
//     const lastCode = lastQuotation.quotationNumber; 
//     const numericPart = parseInt(lastCode.replace(prefix, "")); 
//     nextNumber = numericPart + 1; 
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

//         // ✅ FIX: Ensure documentDate is always present and valid
//         let documentDate = data.documentDate;
        
//         // If not provided or invalid, use today's date
//         if (!documentDate || documentDate === "" || documentDate === "Invalid Date") {
//             documentDate = new Date().toISOString().split("T")[0];
//             console.warn("⚠️ documentDate missing or invalid. Using today's date:", documentDate);
//         }

//         console.log("📅 Saving quotation with documentDate:", documentDate); // Debug log

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
//             invoiceValue: data.quotationValue, // ✅invoice Changed from invoiceValue
//             documentDate: documentDate, // ✅ Now correctly validated
//         });

//         await quotation.save();

//         return res.status(201).json({
//             success: true,
//             message: "Quotation saved successfully",
//             quotationNumber,
//             quotation
//         });

//     } catch (err) {
//         console.error("❌ Error saving quotation:", err);
//         return res.status(500).json({ success: false, error: err.message });
//     }
// };

// const Quotation = require("../models/quotation"); // Assuming model path

// exports.generateQuotationNumber = async () => {
//   const prefix = "QUODB";

//   const lastQuotation = await Quotation.findOne().sort({ createdAt: -1 });

//   let nextNumber = 1;

//   if (lastQuotation) {
//     const lastCode = lastQuotation.quotationNumber;
//     const numericPart = parseInt(lastCode.replace(prefix, ""));
//     nextNumber = numericPart + 1;
//   }

//   const paddedNumber = String(nextNumber).padStart(3, "0");

//   return `${prefix}${paddedNumber}`;
// };


// // controllers/accountController.js లో 'exports.saveQuotation' ఫంక్షన్

// exports.saveQuotation = async (req, res) => {
//   try {
//     const data = req.body;

//     let finalQuotationNumber = data.quotationNumber;

//     // --- 1. Manual vs Auto Number ---
//     if (finalQuotationNumber && finalQuotationNumber.trim() !== "") {
//       const existingQuotation = await Quotation.findOne({
//         quotationNumber: finalQuotationNumber,
//       });

//       if (existingQuotation) {
//         return res.status(400).json({
//           success: false,
//           error: `Quotation Number ${finalQuotationNumber} already exists. Please use a unique number.`,
//         });
//       }
//       console.log("Using manual number:", finalQuotationNumber);
//     } else {
//       finalQuotationNumber = await exports.generateQuotationNumber();
//       console.log("Generated new number:", finalQuotationNumber);
//     }

//     // --- 2. Auto calculate totals per item ---
//     data.items = (data.items || []).map((item) => ({
//       ...item,
//       total: Number(item.quantity) * Number(item.unitPrice),
//     }));

//     // --- 3. Ensure documentDate is valid ---
//     let documentDate = data.documentDate;
//     if (!documentDate || documentDate === "" || documentDate === "Invalid Date") {
//       documentDate = new Date().toISOString().split("T")[0];
//       console.warn("⚠️ documentDate missing or invalid. Using today's date:", documentDate);
//     }

//     // --- 4. Create Quotation ---
//     const quotation = new Quotation({
//       quotationNumber: finalQuotationNumber,
//       billTO: data.billTO,
//       customerAddress: data.customerAddress,
//       customerGSTIN: data.customerGSTIN,
//       items: data.items,
//       sgst: data.sgst || false,
//       cgst: data.cgst || false,
//       SGSTAmount: data.SGSTAmount || 0,
//       CGSTAmount: data.CGSTAmount || 0,
//       taxableValue: data.taxableValue || 0,
//       quotationValue: data.quotationValue || 0, // renamed from invoiceValue
//       documentDate: documentDate,
//       associatedQuotationNumber: data.associatedQuotationNumber || null, // ⭐ NEW FIELD
//     });

//     await quotation.save();

//     return res.status(201).json({
//       success: true,
//       message: "Quotation saved successfully",
//       quotationNumber: finalQuotationNumber,
//       quotation,
//     });
//   } catch (err) {
//     console.error("❌ Error saving quotation:", err);
//     if (err.code === 11000) {
//       return res.status(400).json({
//         success: false,
//         error: `Duplicate document number detected. Please ensure your manual number is unique.`,
//       });
//     }
//     return res.status(500).json({ success: false, error: err.message });
//   }
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



// // exports.updateQuotation = async (req, res) => {
// //   try {
// //     const data = req.body;
// //     const quotationNumber = data.quotationNumber; 

// //     if (!quotationNumber) {
// //       return res.status(400).json({
// //         success: false,
// //         error: "Quotation number is required for update operation."
// //       });
// //     }

// //     const updatedItems = data.items.map((item) => ({
// //       ...item,
// //       total: Number(item.quantity) * Number(item.unitPrice), 
// //     }));

// //     // ✅ FIX: Ensure documentDate is always present and valid
// //     let documentDate = data.documentDate;
    
// //     // If not provided or invalid, use today's date
// //     if (!documentDate || documentDate === "" || documentDate === "Invalid Date") {
// //         documentDate = new Date().toISOString().split("T")[0];
// //         console.warn("⚠️ documentDate missing or invalid during update. Using today's date:", documentDate);
// //     }

// //     console.log("📅 Updating quotation with documentDate:", documentDate); // Debug log

// //     const quotationFields = {
// //       billTO: data.billTO,
// //       customerAddress: data.customerAddress,
// //       customerGSTIN: data.customerGSTIN,
// //       items: updatedItems,
// //       sgst: data.sgst,
// //       cgst: data.cgst,
// //       SGSTAmount: Number(data.SGSTAmount) || 0,
// //       CGSTAmount: Number(data.CGSTAmount) || 0,
// //       taxableValue: Number(data.taxableValue),
// //       quotationValue: Number(data.quotationValue), // ✅ Changed from invoiceValue
// //       paymentType: data.paymentType || "",
// //       note: data.note || "",
// //       updatedAt: new Date(),
// //       documentDate: documentDate, // ✅ Now correctly validated
// //     };

// //     const resultQuotation = await Quotation.findOneAndUpdate(
// //       { quotationNumber: quotationNumber }, 
// //       { $set: quotationFields },
// //       { new: true, runValidators: true }
// //     );

  
// //     if (!resultQuotation) {
// //       return res.status(404).json({
// //         success: false,
// //         message: `Quotation number ${quotationNumber} not found for update.`
// //       });
// //     }

// //     return res.status(200).json({
// //       success: true,
// //       message: "Quotation updated successfully",
// //       quotation: resultQuotation,
// //     });

// //   } catch (err) {
// //     console.error("❌ Error updating quotation:", err);
// //     return res.status(500).json({
// //       success: false,
// //       error: err.message,
// //     });
// //   }
// // };

// // controllers/accountController.js లో 'exports.updateQuotation' ఫంక్షన్

// exports.updateQuotation = async (req, res) => {
//   try {
//     const data = req.body;

//     const updated = await Quotation.findOneAndUpdate(
//       { quotationNumber: data.quotationNumber },
//       {
//         billTO: data.billTO,
//         customerAddress: data.customerAddress,
//         customerGSTIN: data.customerGSTIN,
//         items: (data.items || []).map((item) => ({
//           ...item,
//           total: Number(item.quantity) * Number(item.unitPrice),
//         })),
//         sgst: data.sgst,
//         cgst: data.cgst,
//         SGSTAmount: data.SGSTAmount,
//         CGSTAmount: data.CGSTAmount,
//         taxableValue: data.taxableValue,
//         quotationValue: data.quotationValue,
//         documentDate: data.documentDate,
//         associatedQuotationNumber: data.associatedQuotationNumber || null, // ⭐ NEW FIELD
//       },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ success: false, error: "Quotation not found" });
//     }

//     return res.json({
//       success: true,
//       message: "Quotation updated successfully",
//       quotation: updated,
//     });
//   } catch (err) {
//     console.error("❌ Error updating quotation:", err);
//     return res.status(500).json({ success: false, error: err.message });
//   }
// };


// exports.deleteQuotation = async (req, res) => {
//   try {
//     const quotationNumber = req.params.number; 
    
//     const deletedQuotation = await Quotation.findOneAndDelete(
//       { quotationNumber: quotationNumber } 
//     );

//     if (!deletedQuotation) {
//       return res.status(404).json({
//         success: false,
//         message: `Quotation number ${quotationNumber} not found or already deleted.`
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: `Quotation #${quotationNumber} deleted successfully.`,
//       quotation: deletedQuotation, 
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


const Quotation = require("../models/quotation");
const generateQuotationPDF = require("../utils/pdfGenerator");

// ---------------- GENERATE AUTO QUOTATION NUMBER ----------------
exports.generateQuotationNumber = async () => {
  const prefix = "QUODB";

  // Find the last auto-generated quotation (only those starting with prefix)
  const lastQuotation = await Quotation.findOne({
    quotationNumber: { $regex: `^${prefix}\\d+$` }
  }).sort({ createdAt: -1 });

  let nextNumber = 1;

  if (lastQuotation) {
    const lastCode = lastQuotation.quotationNumber;
    const numericPart = parseInt(lastCode.replace(prefix, ""));
    nextNumber = numericPart + 1;
  }

  const paddedNumber = String(nextNumber).padStart(3, "0");

  return `${prefix}${paddedNumber}`;
};




// ---------------- SAVE QUOTATION ----------------
exports.saveQuotation = async (req, res) => {
  try {
    let data = req.body;
    let finalQuotationNumber = data.quotationNumber?.trim();

    // ✅ Allow manual custom number OR auto-generate
    if (finalQuotationNumber) {
      // Check if custom number already exists
      const exists = await Quotation.findOne({ quotationNumber: finalQuotationNumber });
      if (exists) {
        return res.status(400).json({
          success: false,
          error: `Quotation Number ${finalQuotationNumber} already exists.`,
        });
      }
    } else {
      // Auto generate if not provided
      finalQuotationNumber = await exports.generateQuotationNumber();
    }

    // Auto calculate totals for each item
    data.items = (data.items || []).map(item => ({
      ...item,
      total: Number(item.quantity) * Number(item.unitPrice),
    }));

    // Fix date
    let documentDate =
      !data.documentDate || data.documentDate === "Invalid Date"
        ? new Date().toISOString().split("T")[0]
        : data.documentDate;

    // ✅ CGST and SGST are COMPLETELY OPTIONAL - no validation, no checks
    const quotation = new Quotation({
      quotationNumber: finalQuotationNumber,
      billTO: data.billTO,
      customerAddress: data.customerAddress,
      customerGSTIN: data.customerGSTIN || "",
      items: data.items,
      sgst: Boolean(data.sgst),   // ✅ Convert to boolean, defaults to false
      cgst: Boolean(data.cgst),   // ✅ Convert to boolean, defaults to false
      SGSTAmount: Number(data.SGSTAmount) || 0,
      CGSTAmount: Number(data.CGSTAmount) || 0,
      taxableValue: Number(data.taxableValue) || 0,
      quotationValue: Number(data.quotationValue) || 0,
      documentDate,
      associatedQuotationNumber: data.associatedQuotationNumber || null,
    });

    await quotation.save();

    res.status(201).json({
      success: true,
      message: "Quotation saved successfully",
      quotation,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ---------------- UPDATE QUOTATION ----------------
exports.updateQuotation = async (req, res) => {
  try {
    const data = req.body;
    const originalNumber = data.originalQuotationNumber || data.quotationNumber;

    if (!originalNumber) {
      return res.status(400).json({
        success: false,
        error: "Original quotation number is required for update",
      });
    }

    const existing = await Quotation.findOne({ quotationNumber: originalNumber });
    if (!existing) {
      return res.status(404).json({ success: false, error: "Quotation not found" });
    }

    // ✅ Allow editing/changing quotation number during update
    if (data.quotationNumber && data.quotationNumber !== originalNumber) {
      const exists = await Quotation.findOne({ quotationNumber: data.quotationNumber });
      if (exists) {
        return res.status(400).json({
          success: false,
          error: `Quotation Number ${data.quotationNumber} already exists.`,
        });
      }
      existing.quotationNumber = data.quotationNumber;
    }

    // Update all fields
    existing.billTO = data.billTO;
    existing.customerAddress = data.customerAddress;
    existing.customerGSTIN = data.customerGSTIN || "";
    existing.items = (data.items || []).map(item => ({
      ...item,
      total: Number(item.quantity) * Number(item.unitPrice),
    }));
    
    // ✅ CGST and SGST are COMPLETELY OPTIONAL - no validation
    existing.sgst = Boolean(data.sgst);  // Defaults to false if not provided
    existing.cgst = Boolean(data.cgst);  // Defaults to false if not provided
    existing.SGSTAmount = Number(data.SGSTAmount) || 0;
    existing.CGSTAmount = Number(data.CGSTAmount) || 0;
    existing.taxableValue = Number(data.taxableValue) || 0;
    existing.quotationValue = Number(data.quotationValue) || 0;
    existing.documentDate = data.documentDate || existing.documentDate;
    existing.associatedQuotationNumber = data.associatedQuotationNumber || null;

    await existing.save();

    res.json({
      success: true,
      message: "Quotation updated successfully",
      quotation: existing,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ---------------- DELETE ----------------
exports.deleteQuotation = async (req, res) => {
  try {
    const deleted = await Quotation.findOneAndDelete({
      quotationNumber: req.params.number,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Quotation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Quotation ${req.params.number} deleted successfully`,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ---------------- FETCH ALL ----------------
exports.fetchAllQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, quotations });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ---------------- FETCH BY NUMBER ----------------
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
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const axios = require("axios");

exports.generateQuotationDocument = async (req, res) => {
  try {
    const { content } = req.body; // Frontend nundi vacche HTML (with Base64 images)
    
    // 1. Static Letterhead URL
    const CLOUDINARY_URL = "https://res.cloudinary.com/dp5ttq85f/image/upload/v1773465369/Design_Blocks_Lette_head_3__page-0001_tcbgu7.jpg";

    const templatePath = path.join(__dirname, "../template/quotationTemplate.html");
    let htmlTemplate = fs.readFileSync(templatePath, "utf8");

    // 2. Fetch Letterhead and convert to Base64 (Reliability kosam)
    const response = await axios.get(CLOUDINARY_URL, { responseType: 'arraybuffer' });
    const base64Letterhead = `data:image/jpeg;base64,${Buffer.from(response.data).toString('base64')}`;

    // 3. Replace Cloudinary URL with Base64 in the content
    const finalPageContent = content.replaceAll(CLOUDINARY_URL, base64Letterhead);
    const finalHtml = htmlTemplate.replace("{{PAGES}}", finalPageContent);

    // 4. Puppeteer Launch with optimized args
    const browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox", 
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage", // Render memory issues thagginchadaniki
        "--font-render-hinting=none" // Text sharp ga raavadaniki
      ]
    });

    const page = await browser.newPage();

    // 5. Important: Content Set and Image Rendering Wait
    // User upload chesina images render avvadaniki koncham time padthundi
    await page.setContent(finalHtml, { 
      waitUntil: ["networkidle0", "domcontentloaded", "load"],
      timeout: 60000 // 60 seconds (Large images unte safe)
    });

    // 6. Image Loading Verification Script (Industry Pro Tip)
    // Ee script prathi image full ga load ayye daka Puppeteer ni wait cheyisthundi
    await page.evaluate(async () => {
      const selectors = Array.from(document.querySelectorAll('img'));
      await Promise.all(selectors.map(img => {
        if (img.complete) return;
        return new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
      }));
    });

    // 7. PDF Generation
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
      preferCSSPageSize: true,
      displayHeaderFooter: false
    });

    await browser.close();

    // 8. Send Response
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=quotation.pdf"
    });

    res.send(pdf);

  } catch (error) {
    console.error("PDF GENERATION ERROR:", error);
    res.status(500).json({ 
      message: "PDF generation failed", 
      details: error.message 
    });
  }
};