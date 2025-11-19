// const express = require("express");
// const router = express.Router();

// const {generateQuotationNumber}=require('../controllers/quotationController')

// router.get("/generate", generateQuotationNumber);


// module.exports = router;


const express = require("express");
const router = express.Router();

const { saveQuotation, generateQuotationNumber,fetchQuotationByNumber,updateQuotation, deleteQuotation } = require("../controllers/quotationController");

router.get("/generate", async (req, res) => {
  try {
    const number = await generateQuotationNumber();
    res.json({ success: true, quotationNumber: number });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post("/save", saveQuotation);
router.get('/fetch/:number', fetchQuotationByNumber);
router.put("/update",updateQuotation)
router.delete("/delete/:number", deleteQuotation);
module.exports = router;



