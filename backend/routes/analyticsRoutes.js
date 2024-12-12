// // backend/routes/analyticsRoutes.js
// const express = require('express');
// const router = express.Router();
// const analyticsController = require('../controllers/analyticsController');
// const { authenticate } = require('../config/auth');

// router.get('/', authenticate, analyticsController.getAnalytics);

// module.exports = router;

// backend/routes/analyticsRoutes.js
const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Removed authenticate import and usage
// No token checks now

router.get('/', analyticsController.getAnalytics);

module.exports = router;
