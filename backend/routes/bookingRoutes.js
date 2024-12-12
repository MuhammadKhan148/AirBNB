// // backend/routes/bookingRoutes.js
// const express = require('express');
// const router = express.Router();
// const bookingController = require('../controllers/bookingController');
// const { authenticate } = require('../config/auth');

// // Create a new booking
// router.post('/', authenticate, bookingController.createBooking);

// // Get bookings for the authenticated seller
// router.get('/seller', authenticate, bookingController.getSellerBookings);

// module.exports = router;


// backend/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Removed authenticate import and usage

// Create a new booking
router.post('/', bookingController.createBooking);

// Get bookings for the authenticated seller
// Since there's no authentication, this just returns all bookings
router.get('/seller', bookingController.getSellerBookings);

module.exports = router;
