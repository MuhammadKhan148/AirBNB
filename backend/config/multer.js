// // const multer = require('multer');
// // const { CloudinaryStorage } = require('multer-storage-cloudinary');
// // const cloudinary = require('./cloudinary');

// // const storage = new CloudinaryStorage({

// //     cloudinary: cloudinary,
// //     params: {
// //         folder: 'wanderlust',  // Specify the folder name on Cloudinary
// //         allowed_formats: ['jpg', 'png', 'jpeg'],
// //     },
// // });
// // console.log('multer')

// // const upload = multer({ storage: storage });

// // module.exports = upload;


// // backend/config/multer.js
// const multer = require('multer');
// const path = require('path');

// // Define storage for uploaded files
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Ensure this directory exists
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + path.extname(file.originalname));
//     }
// });

// // File filter to accept only images
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png|gif/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);
//     if (extname && mimetype) {
//         return cb(null, true);
//     } else {
//         cb(new Error('Only images are allowed'));
//     }
// };

// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
// });

// module.exports = upload;

// backend/config/multer.js
// backend/config/multer.js

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure 'uploads/' directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Set the destination to 'uploads/' directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }
};

// Initialize multer with defined storage, file filter, and limits
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

module.exports = upload;
