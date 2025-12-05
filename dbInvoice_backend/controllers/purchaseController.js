// /controllers/purchaseController.js

const Purchase = require('../models/purchase');

// @desc    Record a new purchase
// @route   POST /api/admin/purchase/save
// @access  Private (Admin Role)
exports.savePurchase = async (req, res) => {
    try {
        const { supplierName, purchaseDate, description, amount, billUrl, billPublicId } = req.body;
        
        // Validation (UI లో required పెట్టినా, బ్యాకెండ్ లోనూ చెక్ చేయడం ముఖ్యం)
        if (!supplierName || !description || !amount) {
            return res.status(400).json({ success: false, error: "Please fill all required fields." });
        }

        const purchase = await Purchase.create({
            supplierName,
            purchaseDate,
            description,
            amount: parseFloat(amount),
            billUrl,
            billPublicId,
        });

        res.status(201).json({ success: true, purchase });
    } catch (error) {
        console.error("Error saving purchase:", error);
        res.status(500).json({ success: false, error: "Server error during save." });
    }
};

// @desc    Fetch all purchases
// @route   GET /api/admin/purchase/list
// @access  Private (Admin Role)
exports.fetchAllPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find().sort({ purchaseDate: -1, createdAt: -1 });
        res.status(200).json({ success: true, purchases });
    } catch (error) {
        console.error("Error fetching purchases:", error);
        res.status(500).json({ success: false, error: "Server error during fetch." });
    }
};