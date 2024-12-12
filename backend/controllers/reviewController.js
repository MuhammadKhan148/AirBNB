// // const Review = require('../models/review');
// // const Listing = require('../models/listing');
// // const catchAsync = require('../utils/catchAsync');

// // // Create a Review
// // module.exports.createReview = catchAsync(async (req, res, next) => {
// //     const { comment, rating } = req.body;
// //     console.log(req.body)
// //     const id=req.params.Id;

// //     // console.log(id)
// //     // const listing = await Listing.findById(req.params.id);
// //     const listing = await Listing.findById(id);
// //     // const listing = await Listing.findById(req.params.id);
// // // console.log(listing)
// //     if (!listing) {
// //         return res.status(404).json({ message: 'Listing not found' });
// //     }

// // console.log(req.user)
// //     const review = new Review({ comment, rating, author: req.user.id });
// //     await review.save();

// //     listing.reviews.push(review._id);
// //     await listing.save();

// //     return res.status(201).json({ message: 'Review added successfully', review });
// // });

// // module.exports.getReviewsForListing = async (req, res, next) => {
// //     try {
// //         // Get the listing ID from the route parameters
// //         const { listingId } = req.params;

// //         // Find the listing and populate its reviews
// //         const listing = await Listing.findById(listingId).populate("reviews").populate("author");;

// //         if (!listing) {
// //             return res.status(404).json({ message: "Listing not found" });
// //         }

// //         // Return the reviews related to the listing
// //         res.status(200).json({ reviews: listing.reviews });
// //     } catch (error) {
// //         next(error);
// //     }
// // };


// // // Delete a review
// // exports.deleteReview = async (req, res) => {
// //     try {
// //         const reviewId = req.params.reviewId;
// //         const userId = req.user.id; // Get user ID from authentication middleware

// //         // Find the review
// //         const review = await Review.findById(reviewId);
// //         if (!review) {
// //             return res.status(404).json({ message: 'Review not found' });
// //         }

// //         // Ensure the logged-in user is the author of the review
// //         if (review.author.toString() !== userId) {
// //             return res.status(403).json({ message: 'You can only delete your own reviews' });
// //         }

// //         // Find the listing and remove the review
// //         const listing = await Listing.findOne({ reviews: reviewId });
// //         if (listing) {
// //             listing.reviews = listing.reviews.filter(
// //                 (review) => review.toString() !== reviewId
// //             );
// //             await listing.save();
// //         }

// //         // Delete the review
// //         await review.remove();

// //         res.status(200).json({ message: 'Review deleted successfully' });
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ message: 'Server error' });
// //     }
// // };


// const Review = require('../models/review');
// const Listing = require('../models/listing');
// const catchAsync = require('../utils/catchAsync');

// // Create a Review
// module.exports.createReview = catchAsync(async (req, res, next) => {
//     const { comment, rating } = req.body;
//     const id = req.params.id;  // Changed from req.params.Id to req.params.id

//     const listing = await Listing.findById(id);
//     if (!listing) {
//         return res.status(404).json({ message: 'Listing not found' });
//     }

//     const review = new Review({ comment, rating, author: req.user.id });
//     await review.save();

//     listing.reviews.push(review._id);
//     await listing.save();

//     return res.status(201).json({ message: 'Review added successfully', review });
// });

// // Get reviews for a listing
// module.exports.getReviewsForListing = async (req, res, next) => {
//     try {
//         const { id } = req.params; // Use 'id' consistent with route parameter
//         const listing = await Listing.findById(id).populate("reviews").populate("author");

//         if (!listing) {
//             return res.status(404).json({ message: "Listing not found" });
//         }

//         res.status(200).json({ reviews: listing.reviews });
//     } catch (error) {
//         next(error);
//     }
// };

// // Delete a review
// exports.deleteReview = async (req, res) => {
//     try {
//         const reviewId = req.params.reviewId;
//         const userId = req.user.id; // Get user ID from authentication middleware

//         // Find the review
//         const review = await Review.findById(reviewId);
//         if (!review) {
//             return res.status(404).json({ message: 'Review not found' });
//         }

//         // Ensure the logged-in user is the author
//         if (review.author.toString() !== userId) {
//             return res.status(403).json({ message: 'You can only delete your own reviews' });
//         }

//         // Remove the review from the listing
//         const listing = await Listing.findOne({ reviews: reviewId });
//         if (listing) {
//             listing.reviews = listing.reviews.filter(r => r.toString() !== reviewId);
//             await listing.save();
//         }

//         // Delete the review
//         await review.remove();

//         res.status(200).json({ message: 'Review deleted successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };


// backend/controllers/reviewController.js
const Review = require('../models/review');
const Listing = require('../models/listing');
const catchAsync = require('../utils/catchAsync');

// Create a Review without user
module.exports.createReview = catchAsync(async (req, res, next) => {
    const { comment, rating } = req.body;
    const id = req.params.id;

    const listing = await Listing.findById(id);
    if (!listing) {
        return res.status(404).json({ message: 'Listing not found' });
    }

    // No auth, so no author
    const review = new Review({ comment, rating, author: null });
    await review.save();

    listing.reviews.push(review._id);
    await listing.save();

    return res.status(201).json({ message: 'Review added successfully', review });
});

// Get reviews for a listing
module.exports.getReviewsForListing = async (req, res, next) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id).populate("reviews").populate("author");

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        res.status(200).json({ reviews: listing.reviews });
    } catch (error) {
        next(error);
    }
};

// Delete a review without user checks
exports.deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;

        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Without auth, anyone can delete the review
        const listing = await Listing.findOne({ reviews: reviewId });
        if (listing) {
            listing.reviews = listing.reviews.filter(r => r.toString() !== reviewId);
            await listing.save();
        }

        await review.remove();

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
