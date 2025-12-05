// /middleware/cloudinaryMiddleware.js (కొత్త ఫైల్)

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Cloudinary కాన్ఫిగరేషన్
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer మెమరీ స్టోరేజ్
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Cloudinary అప్‌లోడ్ ఫంక్షన్
const uploadToCloudinary = (req, res, next) => {
    if (!req.file) {
        return next();
    }

    let stream = cloudinary.uploader.upload_stream(
        { folder: "purchase_bills" },
        (error, result) => {
            if (result) {
                
                req.body.billUrl = result.secure_url;
                req.body.billPublicId = result.public_id;
                next();
            } else {
                console.error("Cloudinary Upload Error:", error);
                res.status(500).json({ success: false, error: "Bill upload failed." });
            }
        }
    );
    
    streamifier.createReadStream(req.file.buffer).pipe(stream);
};

module.exports = { upload, uploadToCloudinary };