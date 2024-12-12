// // const express = require("express");
// // const router = express.Router();
// // const reviewController = require("../controllers/reviewController");
// // const { authenticate } = require("../config/auth");

// // // Create review route
// // router.post("/:Id", authenticate, reviewController.createReview);

// // // Get all reviews for a listing
// // router.get("/:Id", reviewController.getReviewsForListing);
// // // Delete a review
// // router.delete("/:reviewId", authenticate, reviewController.deleteReview);

// // module.exports = router;


// const express = require("express");
// const router = express.Router();
// const reviewController = require("../controllers/reviewController");
// const { authenticate } = require("../config/auth");

// // Create review route
// router.post("/:id", authenticate, reviewController.createReview);

// // Get all reviews for a listing
// router.get("/:id", reviewController.getReviewsForListing);

// // Delete a review
// router.delete("/:reviewId", authenticate, reviewController.deleteReview);

// module.exports = router;


// backend/routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

// Removed authenticate import and usage

// Create review route
router.post("/:id", reviewController.createReview);

// Get all reviews for a listing
router.get("/:id", reviewController.getReviewsForListing);

// Delete a review
router.delete("/:reviewId", reviewController.deleteReview);

module.exports = router;
