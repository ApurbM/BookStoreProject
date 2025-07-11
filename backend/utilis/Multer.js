const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer + Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Your Cloudinary folder
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'], // Adjust as needed
    transformation: [{ width: 800, height: 800, crop: 'limit' }], // Optional
  },
});

const upload = multer({ storage });

module.exports = upload;
