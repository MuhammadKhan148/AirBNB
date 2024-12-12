// // backend/routes/listingRoutes.js
// const express = require('express');
// const router = express.Router();
// const { createListing, getAllListings, getListingById, updateListing, deleteListing } = require('../controllers/listingController');
// const { authenticate } = require('../config/auth');
// const upload = require('../config/multer');  // Import multer configuration
// const trackViews = require('../middleware/trackViews'); // Import trackViews

// // Route to create listing
// router.post('/', authenticate, upload.single('image'), createListing);  // Use Multer to upload the image

// // Route to get all listings
// router.get('/', getAllListings);

// // Route to get a specific listing, with views tracking
// router.get('/:id', trackViews, getListingById);

// // Route to update a listing
// router.put('/:id', authenticate, upload.single('image'), updateListing);

// // Route to delete a listing
// router.delete('/:id', authenticate, deleteListing);

// module.exports = router;


// backend/routes/listingRoutes.js
// backend/routes/listingRoutes.js

// const express = require('express');
// const router = express.Router();
// const {
//     createListing,
//     getAllListings,
//     getListingById,
//     updateListing,
//     deleteListing
// } = require('../controllers/listingController');
// const { authenticate } = require('../config/auth'); // Ensure authentication middleware is correctly implemented
// const upload = require('../config/multer');  // Multer configuration for file uploads
// const trackViews = require('../middleware/trackViews'); // Middleware to track listing views (if implemented)

// // Route to create a new listing
// router.post('/', upload.single('image'), createListing);

// // Route to get all listings
// router.get('/', getAllListings);

// // Route to get a specific listing by ID, with view tracking
// router.get('/:id', trackViews, getListingById);

// // Route to update a listing
// router.put('/:id', upload.single('image'), updateListing);

// // Route to delete a listing
// router.delete('/:id', deleteListing);

// module.exports = router;


// backend/routes/listingRoutes.js
const express = require('express');
const router = express.Router();
const {
    createListing,
    getAllListings,
    getListingById,
    updateListing,
    deleteListing
} = require('../controllers/listingController');

// Removed authenticate import and usage
const upload = require('../config/multer');
const trackViews = require('../middleware/trackViews');

// Route to create a new listing (no auth)
router.post('/', upload.single('image'), createListing);

// Route to get all listings
router.get('/', getAllListings);

// Route to get a specific listing by ID, with view tracking
router.get('/:id', trackViews, getListingById);

// Route to update a listing (no auth)
router.put('/:id', upload.single('image'), updateListing);

// Route to delete a listing (no auth)
router.delete('/:id', deleteListing);

module.exports = router;
