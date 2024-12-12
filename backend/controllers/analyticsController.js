// // backend/controllers/analyticsController.js
// const Listing = require('../models/listing');
// const catchAsync = require('../utils/catchAsync');

// exports.getAnalytics = catchAsync(async (req, res, next) => {
//     const ownerId = req.user.id;
//     try {
//         const listings = await Listing.find({ owner: ownerId }).select('title views bookings price');
//         const totalViews = listings.reduce((acc, listing) => acc + listing.views, 0);
//         const totalBookings = listings.reduce((acc, listing) => acc + (listing.bookings.length || 0), 0);
//         const totalRevenue = listings.reduce((acc, listing) => acc + (listing.price * (listing.bookings.length || 0)), 0);

//         res.status(200).json({
//             totalViews,
//             totalBookings,
//             totalRevenue,
//             listings,
//         });
//     } catch (error) {
//         console.error('Error fetching analytics:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });


// backend/controllers/analyticsController.js
const Listing = require('../models/listing');
const catchAsync = require('../utils/catchAsync');

exports.getAnalytics = catchAsync(async (req, res, next) => {
    // Without authentication, we can't filter by owner.
    // Either return analytics for all listings or no analytics.
    // For demonstration, let's return aggregated data for all listings.

    const listings = await Listing.find({}).select('title views bookings price');
    const totalViews = listings.reduce((acc, listing) => acc + listing.views, 0);
    const totalBookings = listings.reduce((acc, listing) => acc + (listing.bookings.length || 0), 0);
    const totalRevenue = listings.reduce((acc, listing) => acc + (listing.price * (listing.bookings.length || 0)), 0);

    return res.status(200).json({
        totalViews,
        totalBookings,
        totalRevenue,
        listings,
    });
});
