// // backend/controllers/bookingController.js
// const Booking = require('../models/booking');
// const Listing = require('../models/listing');
// const catchAsync = require('../utils/catchAsync');

// // Create a Booking
// exports.createBooking = catchAsync(async (req, res, next) => {
//     const { listingId, startDate, endDate } = req.body;
//     const buyerId = req.user.id;

//     const listing = await Listing.findById(listingId);
//     if (!listing) {
//         return res.status(404).json({ message: 'Listing not found' });
//     }

//     const booking = new Booking({
//         listing: listingId,
//         buyer: buyerId,
//         startDate,
//         endDate,
//     });

//     await booking.save();

//     listing.bookings.push(booking._id);
//     await listing.save();

//     // Emit real-time notification
//     const io = req.app.get('socketio');
//     io.to(listing.owner.toString()).emit('newBooking', {
//         listingTitle: listing.title,
//         buyerUsername: req.user.username,
//         bookingId: booking._id,
//     });

//     res.status(201).json({ message: 'Booking created successfully', booking });
// });

// // Get Bookings for Seller
// exports.getSellerBookings = catchAsync(async (req, res, next) => {
//     const sellerId = req.user.id;

//     const listings = await Listing.find({ owner: sellerId }).populate({
//         path: 'bookings',
//         populate: { path: 'buyer', select: 'username email' },
//     });

//     const bookings = listings.reduce((acc, listing) => {
//         listing.bookings.forEach(booking => {
//             acc.push({
//                 listingTitle: listing.title,
//                 booking,
//             });
//         });
//         return acc;
//     }, []);

//     res.status(200).json({ bookings });
// });


// backend/controllers/bookingController.js
const Booking = require('../models/booking');
const Listing = require('../models/listing');
const catchAsync = require('../utils/catchAsync');

// Create a Booking without identifying a buyer (no auth)
exports.createBooking = catchAsync(async (req, res, next) => {
    const { listingId, startDate, endDate } = req.body;

    const listing = await Listing.findById(listingId);
    if (!listing) {
        return res.status(404).json({ message: 'Listing not found' });
    }

    // Since no auth, we don't have a buyerId from token
    // We'll skip buyer linking or set a dummy buyer if needed.
    // For demonstration, no buyer linking:
    const booking = new Booking({
        listing: listingId,
        buyer: null,
        startDate,
        endDate,
    });

    await booking.save();

    listing.bookings.push(booking._id);
    await listing.save();

    // Without auth, can't emit to a specific owner
    // Just skip the real-time notification
    return res.status(201).json({ message: 'Booking created successfully', booking });
});

// Get Bookings for Seller
// Without auth, we can't determine the seller. Return all bookings:
exports.getSellerBookings = catchAsync(async (req, res, next) => {
    // Return all bookings from all listings
    const listings = await Listing.find({}).populate({
        path: 'bookings',
        populate: { path: 'buyer', select: 'username email' },
    });

    const bookings = [];
    listings.forEach(listing => {
        listing.bookings.forEach(booking => {
            bookings.push({
                listingTitle: listing.title,
                booking,
            });
        });
    });

    res.status(200).json({ bookings });
});
