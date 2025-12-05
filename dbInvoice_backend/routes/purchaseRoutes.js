// /routes/purchaseRoutes.js

const express = require('express');
const { savePurchase, fetchAllPurchases } = require('../controllers/purchaseController');
const { upload, uploadToCloudinary } = require('../middleware/cloudinary');
// ⚠️ మీరు AdminPanel లోని authorizeRole మరియు verifyToken ను ఇక్కడ ఇంపోర్ట్ చేసుకోవాలి
// ఉదాహరణకు: const { verifyToken } = require('../controllers/adminController');
// const authorizeRole = require('../middleware/authorizeRole');
const router = express.Router();


// AUTH & AUTHORIZATION Middleware (మీ Admin Panel లాజిక్ ను ఇక్కడ జతచేయండి)
const verifyToken = (req, res, next) => { req.user = { role: 'admin' }; next(); }; // MOCK
const authorizeRole = (role) => (req, res, next) => { next(); }; // MOCK


// Purchase Save Route (Handles file upload before saving)
router.post(
    '/purchase/save', 
    verifyToken, 
    authorizeRole('admin'), 
    upload.single('billFile'), // 'billFile' అనేది ఫ్రంటెండ్ నుండి వచ్చే input name
    uploadToCloudinary, 
    savePurchase
);

// Purchase List Route
router.get(
    '/purchase/list', 
    verifyToken, 
    authorizeRole('admin'), 
    fetchAllPurchases
);

module.exports = router;