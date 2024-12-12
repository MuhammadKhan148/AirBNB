
// // const mongoose = require("mongoose");
// // const Schema = mongoose.Schema;

// // const Review = require("./review.js");

// // const listingSchema = new Schema({
// //     title: {
// //         type: String,
// //         required: true,
// //     },
// //     description: String,
// //     image: {
// //         url: String,
// //         filename: String,
// //     },
// //     price: Number,
// //     location: String,
// //     country: String,
// //     reviews: [
// //         {
// //             type: Schema.Types.ObjectId,
// //             ref: "Review",
// //         },
// //     ],
// //     owner: {
// //         type: Schema.Types.ObjectId,
// //         ref: "User",
// //     },
// // });

// // listingSchema.post("findOneAndDelete", async (listing) => {
// //     if (listing) {
// //         await Review.deleteMany({ _id: { $in: listing.reviews } });
// //     }
// // });

// // const Listing = mongoose.model("Listing", listingSchema);
// // module.exports = Listing;

// // backend/models/listing.js
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const Review = require("./review.js");
// const Booking = require("./booking.js"); // Import Booking

// const listingSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     description: String,
//     image: {
//         url: String,
//         filename: String,
//     },
//     price: Number,
//     location: String,
//     country: String,
//     reviews: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: "Review",
//         },
//     ],
//     bookings: [ // Add bookings field
//         {
//             type: Schema.Types.ObjectId,
//             ref: "Booking",
//         },
//     ],
//     views: { // Add views field
//         type: Number,
//         default: 0,
//     },
//     owner: { // Add owner field
//         type: Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//     },
// });

// listingSchema.post("findOneAndDelete", async (listing) => {
//     if (listing) {
//         await Review.deleteMany({ _id: { $in: listing.reviews } });
//         await Booking.deleteMany({ _id: { $in: listing.bookings } }); // Delete associated bookings
//     }
// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;



// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const Review = require("./review.js");

// const listingSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     description: String,
//     image: {
//         url: String,
//         filename: String,
//     },
//     price: Number,
//     location: String,
//     country: String,
//     reviews: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: "Review",
//         },
//     ],
//     owner: {
//         type: Schema.Types.ObjectId,
//         ref: "User",
//     },
// });

// listingSchema.post("findOneAndDelete", async (listing) => {
//     if (listing) {
//         await Review.deleteMany({ _id: { $in: listing.reviews } });
//     }
// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;
// backend/models/listing.js
// backend/models/listing.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const Booking = require("./booking.js"); // Import Booking

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: {
        type: Number,
        required: true,
    },
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    bookings: [ // Add bookings field
        {
            type: Schema.Types.ObjectId,
            ref: "Booking",
        },
    ],
    views: { // Add views field
        type: Number,
        default: 0,
    },
    owner: { // Add owner field
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true,
    },
});

// Middleware to handle cascading deletions
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
        await Booking.deleteMany({ _id: { $in: listing.bookings } }); // Delete associated bookings
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
