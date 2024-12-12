// // // const Listing = require('../models/listing');
// // // const catchAsync = require('../utils/catchAsync');
// // // const cloudinary = require('../config/cloudinary');  // Import Cloudinary config

// // // // Create a Listing
// // // module.exports.createListing = catchAsync(async (req, res, next) => {
// // //     // console.log(req.body)
// // //     const { title, description, price, location, country } = req.body;
// // //     const owner = req.user.id;
// // //     // console.log(owner)

// // //     let image = {};
// // //     if (req.file) {
// // //         // Cloudinary upload result
// // //         image = {
// // //             url: req.file.path,  // Cloudinary URL
// // //             filename: req.file.filename,
// // //         };
// // //     }

// // //     const listing = new Listing({ title, description, price, location, country, owner, image });
// // //     await listing.save();

// // //     return res.status(201).json({ message: 'Listing created successfully', listing });
// // // });

// // // // Get all Listings
// // // module.exports.getAllListings = catchAsync(async (req, res, next) => {
// // //     const listings = await Listing.find().populate('owner');
// // //     return res.status(200).json(listings);
// // // });

// // // // Get Listing by ID
// // // module.exports.getListingById = catchAsync(async (req, res, next) => {
// // //     // const listing = await Listing.findById(req.params.id).populate('owner reviews');
// // //     const listing = await Listing.findById(req.params.id).populate('owner reviews')
// // //             .populate({
// // //                 path: 'reviews',
// // //                 populate: { path: 'author', select: 'username' }, // Populate author info
// // //             });

// // //     if (!listing) {
// // //         return res.status(404).json({ message: 'Listing not found' });
// // //     }
// // //     return res.status(200).json(listing);
// // // });



// // // // Update a Listing
// // // exports.updateListing = catchAsync(async (req, res, next) => {
// // //     const { id } = req.params;
// // //     const { title, description, price, location, country } = req.body;
// // //     const owner = req.user.id;

// // //     const listing = await Listing.findById(id);
// // //     if (!listing) {
// // //         return res.status(404).json({ message: 'Listing not found' });
// // //     }

// // //     if (listing.owner.toString() !== owner) {
// // //         return res.status(403).json({ message: 'You are not authorized to update this listing' });
// // //     }

// // //     if (title) listing.title = title;
// // //     if (description) listing.description = description;
// // //     if (price) listing.price = price;
// // //     if (location) listing.location = location;
// // //     if (country) listing.country = country;

// // //     if (req.file) {
// // //         if (listing.image && listing.image.filename) {
// // //             await cloudinary.uploader.destroy(listing.image.filename);
// // //         }
// // //         listing.image = {
// // //             url: req.file.path,
// // //             filename: req.file.filename,
// // //         };
// // //     }

// // //     await listing.save();
// // //     return res.status(200).json({ message: 'Listing updated successfully', listing });
// // // });

// // // // Delete a Listing
// // // exports.deleteListing = catchAsync(async (req, res, next) => {
// // //     const { id } = req.params;
// // //     const owner = req.user.id;

// // //     const listing = await Listing.findById(id);
// // //     if (!listing) {
// // //         return res.status(404).json({ message: 'Listing not found' });
// // //     }

// // //     if (listing.owner.toString() !== owner) {
// // //         return res.status(403).json({ message: 'You are not authorized to delete this listing' });
// // //     }

// // //     if (listing.image && listing.image.filename) {
// // //         await cloudinary.uploader.destroy(listing.image.filename);
// // //     }

// // //     await listing.deleteOne();
// // //     return res.status(200).json({ message: 'Listing deleted successfully' });
// // // });

// // // backend/controllers/listingController.js
// // const Listing = require('../models/listing');
// // const Review = require('../models/review');
// // const catchAsync = require('../utils/catchAsync');

// // // Create a new listing
// // exports.createListing = catchAsync(async (req, res, next) => {
// //     const { title, description, price, location, country } = req.body;
// //     const image = req.file ? req.file.path : null;

// //     const listing = new Listing({
// //         title,
// //         description,
// //         price,
// //         location,
// //         country,
// //         image: {
// //             url: image,
// //             filename: req.file ? req.file.filename : '',
// //         },
// //         owner: req.user.id,
// //     });

// //     await listing.save();

// //     res.status(201).json({ message: 'Listing created successfully', listing });
// // });

// // // Get all listings
// // exports.getAllListings = catchAsync(async (req, res, next) => {
// //     const listings = await Listing.find().populate('owner', 'username email');
// //     res.status(200).json({ listings });
// // });

// // // Get a specific listing by ID
// // exports.getListingById = catchAsync(async (req, res, next) => {
// //     const { id } = req.params;
// //     const listing = await Listing.findById(id).populate('owner', 'username email').populate('reviews');

// //     if (!listing) {
// //         return res.status(404).json({ message: 'Listing not found' });
// //     }

// //     res.status(200).json({ listing });
// // });

// // // Update a listing
// // exports.updateListing = catchAsync(async (req, res, next) => {
// //     const { id } = req.params;
// //     const { title, description, price, location, country } = req.body;
// //     let image = null;

// //     if (req.file) {
// //         image = req.file.path;
// //     }

// //     const updatedData = {
// //         title,
// //         description,
// //         price,
// //         location,
// //         country,
// //     };

// //     if (image) {
// //         updatedData.image = {
// //             url: image,
// //             filename: req.file.filename,
// //         };
// //     }

// //     const listing = await Listing.findByIdAndUpdate(id, updatedData, { new: true }).populate('owner', 'username email').populate('reviews');

// //     if (!listing) {
// //         return res.status(404).json({ message: 'Listing not found' });
// //     }

// //     res.status(200).json({ message: 'Listing updated successfully', listing });
// // });

// // // Delete a listing
// // exports.deleteListing = catchAsync(async (req, res, next) => {
// //     const { id } = req.params;
// //     const listing = await Listing.findByIdAndDelete(id);

// //     if (!listing) {
// //         return res.status(404).json({ message: 'Listing not found' });
// //     }

// //     res.status(200).json({ message: 'Listing deleted successfully' });
// // });


// // backend/controllers/listingController.js

// // const Listing = require('../models/listing');
// // const Review = require('../models/review');
// // const Booking = require('../models/booking'); // Ensure Booking model is imported
// // const catchAsync = require('../utils/catchAsync');

// // // Create a new listing
// // exports.createListing = catchAsync(async (req, res, next) => {
// //     const { title, description, price, location, country } = req.body;

// //     // Validate required fields
// //     if (!title || !price || !req.file || !req.user.id) {
// //         return res.status(400).json({ message: 'Missing required fields.' });
// //     }

// //     const listing = new Listing({
// //         title,
// //         description,
// //         price,
// //         location,
// //         country,
// //         image: {
// //             url: req.file.path, // Cloudinary or file upload URL
// //             filename: req.file.filename,
// //         },
// //         owner: req.user.id,
// //     });

// //     await listing.save();

// //     res.status(201).json({ message: 'Listing created successfully', listing });
// // });

// // // Get all listings
// // exports.getAllListings = catchAsync(async (req, res, next) => {
// //     const listings = await Listing.find()
// //         .populate('owner', 'username email') // Populate owner details
// //         .populate('reviews') // Populate reviews
// //         .populate('bookings'); // Populate bookings if needed

// //     res.status(200).json({ listings });
// // });

// // // Get a specific listing by ID
// // exports.getListingById = catchAsync(async (req, res, next) => {
// //     const { id } = req.params;

// //     // Validate ID format
// //     if (!id.match(/^[0-9a-fA-F]{24}$/)) {
// //         return res.status(400).json({ message: 'Invalid listing ID format.' });
// //     }

// //     const listing = await Listing.findById(id)
// //         .populate('owner', 'username email') // Populate owner details
// //         .populate({
// //             path: 'reviews',
// //             populate: { path: 'author', select: 'username' }, // Populate review authors
// //         })
// //         .populate('bookings'); // Populate bookings if needed

// //     if (!listing) {
// //         return res.status(404).json({ message: 'Listing not found.' });
// //     }

// //     res.status(200).json({ listing });
// // });

// // // Update a listing
// // exports.updateListing = catchAsync(async (req, res, next) => {
// //     const { id } = req.params;
// //     const { title, description, price, location, country } = req.body;

// //     // Validate listing existence
// //     const listing = await Listing.findById(id);
// //     if (!listing) {
// //         return res.status(404).json({ message: 'Listing not found.' });
// //     }

// //     // Authorization: Only owner can update
// //     if (listing.owner.toString() !== req.user.id) {
// //         return res.status(403).json({ message: 'Unauthorized to update this listing.' });
// //     }

// //     // Update fields if provided
// //     if (title) listing.title = title;
// //     if (description) listing.description = description;
// //     if (price) listing.price = price;
// //     if (location) listing.location = location;
// //     if (country) listing.country = country;

// //     // Handle image update
// //     if (req.file) {
// //         // Optionally, delete the old image from storage (e.g., Cloudinary)
// //         if (listing.image && listing.image.filename) {
// //             // Example: await cloudinary.uploader.destroy(listing.image.filename);
// //             // Uncomment and implement if using Cloudinary
// //         }

// //         listing.image = {
// //             url: req.file.path,
// //             filename: req.file.filename,
// //         };
// //     }

// //     await listing.save();

// //     res.status(200).json({ message: 'Listing updated successfully', listing });
// // });

// // // Delete a listing
// // exports.deleteListing = catchAsync(async (req, res, next) => {
// //     const { id } = req.params;

// //     // Validate ID format
// //     if (!id.match(/^[0-9a-fA-F]{24}$/)) {
// //         return res.status(400).json({ message: 'Invalid listing ID format.' });
// //     }

// //     const listing = await Listing.findById(id);
// //     if (!listing) {
// //         return res.status(404).json({ message: 'Listing not found.' });
// //     }

// //     // Authorization: Only owner can delete
// //     if (listing.owner.toString() !== req.user.id) {
// //         return res.status(403).json({ message: 'Unauthorized to delete this listing.' });
// //     }

// //     // Optionally, delete the image from storage (e.g., Cloudinary)
// //     if (listing.image && listing.image.filename) {
// //         // Example: await cloudinary.uploader.destroy(listing.image.filename);
// //         // Uncomment and implement if using Cloudinary
// //     }

// //     await Listing.findByIdAndDelete(id);

// //     res.status(200).json({ message: 'Listing deleted successfully.' });
// // });


// // backend/controllers/listingController.js

// // backend/controllers/listingController.js

// const Listing = require('../models/listing');
// const Review = require('../models/review');
// const Booking = require('../models/booking'); // Ensure Booking model is imported
// const catchAsync = require('../utils/catchAsync');

// // Create a new listing
// exports.createListing = catchAsync(async (req, res, next) => {
//     const { title, description, price, location, country } = req.body;

//     // Validate required fields
//     if (!title || !price || !req.file) {
//         return res.status(400).json({ message: 'Missing required fields: title, price, image, or user ID.' });
//     }

//     // Optional: Validate data types (e.g., price should be a number)
//     if (isNaN(price)) {
//         return res.status(400).json({ message: 'Price must be a valid number.' });
//     }

//     try {
//         const listing = new Listing({
//             title,
//             description,
//             price,
//             location,
//             country,
//             image: {
//                 url: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`, // Construct the image URL
//                 filename: req.file.filename,
//             },
//             // owner: req.user._id, // Use _id instead of id
//         });

//         await listing.save();

//         res.status(201).json({ message: 'Listing created successfully', listing });
//     } catch (error) {
//         console.error('Error creating listing:', error);
//         next(error); // Pass the error to the global error handler
//     }
// });

// // Get all listings
// exports.getAllListings = catchAsync(async (req, res, next) => {
//     try {
//         const listings = await Listing.find()
//             .populate('owner', 'username email') // Populate owner details
//             .populate('reviews') // Populate reviews
//             .populate('bookings'); // Populate bookings if needed

//         res.status(200).json({ listings });
//     } catch (error) {
//         console.error('Error fetching listings:', error);
//         next(error);
//     }
// });

// // Get a specific listing by ID
// exports.getListingById = catchAsync(async (req, res, next) => {
//     const { id } = req.params;

//     // Validate ID format
//     if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//         return res.status(400).json({ message: 'Invalid listing ID format.' });
//     }

//     try {
//         const listing = await Listing.findById(id)
//             .populate('owner', 'username email') // Populate owner details
//             .populate({
//                 path: 'reviews',
//                 populate: { path: 'author', select: 'username' }, // Populate review authors
//             })
//             .populate('bookings'); // Populate bookings if needed

//         if (!listing) {
//             return res.status(404).json({ message: 'Listing not found.' });
//         }

//         res.status(200).json({ listing });
//     } catch (error) {
//         console.error('Error fetching listing by ID:', error);
//         next(error);
//     }
// });

// // Update a listing
// exports.updateListing = catchAsync(async (req, res, next) => {
//     const { id } = req.params;
//     const { title, description, price, location, country } = req.body;

//     try {
//         const listing = await Listing.findById(id);
//         if (!listing) {
//             return res.status(404).json({ message: 'Listing not found.' });
//         }

//         // Authorization: Only owner can update
//         if (listing.owner.toString() !== req.user._id.toString()) {
//             return res.status(403).json({ message: 'Unauthorized to update this listing.' });
//         }

//         // Update fields if provided
//         if (title) listing.title = title;
//         if (description) listing.description = description;
//         if (price) {
//             if (isNaN(price)) {
//                 return res.status(400).json({ message: 'Price must be a valid number.' });
//             }
//             listing.price = price;
//         }
//         if (location) listing.location = location;
//         if (country) listing.country = country;

//         // Handle image update
//         if (req.file) {
//             // Optionally, delete the old image from storage (e.g., Cloudinary)
//             if (listing.image && listing.image.filename) {
//                 // Example: await cloudinary.uploader.destroy(listing.image.filename);
//                 // Uncomment and implement if using Cloudinary
//             }

//             listing.image = {
//                 url: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
//                 filename: req.file.filename,
//             };
//         }

//         await listing.save();

//         res.status(200).json({ message: 'Listing updated successfully', listing });
//     } catch (error) {
//         console.error('Error updating listing:', error);
//         next(error);
//     }
// });

// // Delete a listing
// exports.deleteListing = catchAsync(async (req, res, next) => {
//     const { id } = req.params;

//     // Validate ID format
//     if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//         return res.status(400).json({ message: 'Invalid listing ID format.' });
//     }

//     try {
//         const listing = await Listing.findById(id);
//         if (!listing) {
//             return res.status(404).json({ message: 'Listing not found.' });
//         }

//         // Authorization: Only owner can delete
//         if (listing.owner.toString() !== req.user._id.toString()) {
//             return res.status(403).json({ message: 'Unauthorized to delete this listing.' });
//         }

//         // Optionally, delete the image from storage (e.g., Cloudinary)
//         if (listing.image && listing.image.filename) {
//             // Example: await cloudinary.uploader.destroy(listing.image.filename);
//             // Uncomment and implement if using Cloudinary
//         }

//         await Listing.findByIdAndDelete(id);

//         res.status(200).json({ message: 'Listing deleted successfully.' });
//     } catch (error) {
//         console.error('Error deleting listing:', error);
//         next(error);
//     }
// });



// backend/controllers/listingController.js
const Listing = require('../models/listing');
const Review = require('../models/review');
const Booking = require('../models/booking');
const catchAsync = require('../utils/catchAsync');

// Create a new listing (no auth check)
exports.createListing = catchAsync(async (req, res, next) => {
    const { title, description, price, location, country } = req.body;

    if (!title || !price || !req.file) {
        return res.status(400).json({ message: 'Missing required fields: title, price, image.' });
    }

    if (isNaN(price)) {
        return res.status(400).json({ message: 'Price must be a valid number.' });
    }

    try {
        const listing = new Listing({
            title,
            description,
            price,
            location,
            country,
            image: {
                url: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
                filename: req.file.filename,
            }
        });

        await listing.save();

        // Emit notification for creation
        const io = req.app.get('socketio');
        io.emit('listingNotification', {
            type: 'created',
            message: `New listing "${listing.title}" has been created!`
        });

        res.status(201).json({ message: 'Listing created successfully', listing });
    } catch (error) {
        console.error('Error creating listing:', error);
        next(error);
    }
});

// Get all listings
exports.getAllListings = catchAsync(async (req, res, next) => {
    try {
        const listings = await Listing.find()
            .populate('owner', 'username email')
            .populate('reviews')
            .populate('bookings');

        res.status(200).json({ listings });
    } catch (error) {
        console.error('Error fetching listings:', error);
        next(error);
    }
});

// Get a specific listing by ID
exports.getListingById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: 'Invalid listing ID format.' });
    }

    try {
        const listing = await Listing.findById(id)
            .populate('owner', 'username email')
            .populate({
                path: 'reviews',
                populate: { path: 'author', select: 'username' },
            })
            .populate('bookings');

        if (!listing) {
            return res.status(404).json({ message: 'Listing not found.' });
        }

        res.status(200).json({ listing });
    } catch (error) {
        console.error('Error fetching listing by ID:', error);
        next(error);
    }
});

// Update a listing (no auth check)
exports.updateListing = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { title, description, price, location, country } = req.body;

    try {
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found.' });
        }

        if (title) listing.title = title;
        if (description) listing.description = description;
        if (price) {
            if (isNaN(price)) {
                return res.status(400).json({ message: 'Price must be a valid number.' });
            }
            listing.price = price;
        }
        if (location) listing.location = location;
        if (country) listing.country = country;

        if (req.file) {
            listing.image = {
                url: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
                filename: req.file.filename,
            };
        }

        await listing.save();

        // Emit notification for update
        const io = req.app.get('socketio');
        io.emit('listingNotification', {
            type: 'updated',
            message: `Listing "${listing.title}" has been updated!`
        });

        res.status(200).json({ message: 'Listing updated successfully', listing });
    } catch (error) {
        console.error('Error updating listing:', error);
        next(error);
    }
});

// Delete a listing (no auth check)
exports.deleteListing = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: 'Invalid listing ID format.' });
    }

    try {
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found.' });
        }

        await Listing.findByIdAndDelete(id);

        // Emit notification for deletion
        const io = req.app.get('socketio');
        io.emit('listingNotification', {
            type: 'deleted',
            message: `A listing has been deleted!`
        });

        res.status(200).json({ message: 'Listing deleted successfully.' });
    } catch (error) {
        console.error('Error deleting listing:', error);
        next(error);
    }
});
