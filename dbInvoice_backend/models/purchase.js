// /models/Purchase.js

const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    supplierName: {
        type: String,
        required: true,
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    billUrl: { // Cloudinary నుండి వచ్చే బిల్లు URL
        type: String,
        default: null,
    },
    billPublicId: { // Cloudinary నుండి వచ్చే Public ID (డిలీట్ కోసం ఉపయోగపడుతుంది)
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Purchase', purchaseSchema);