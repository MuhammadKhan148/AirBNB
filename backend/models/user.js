// // backend/models/user.js
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// });

// module.exports = mongoose.model('User', userSchema);


// backend/models/user.js

// const mongoose = require("mongoose");
// const passportLocalMongoose = require("passport-local-mongoose"); // If using Passport.js for authentication
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true, // Ensure emails are unique
//     },
//     username: {
//         type: String,
//         required: true,
//         unique: true, // Ensure usernames are unique
//     },
//     password: {
//         type: String,
//         required: true, // Password is required
//     },
//     // Add other user-related fields as needed (e.g., role, profilePic, etc.)
// });

// // Plugin for Passport.js (if used)
// //userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensure emails are unique
    },
    username: {
        type: String,
        required: true,
        unique: true, // Ensure usernames are unique
    },
    password: {
        type: String,
        required: true, // Password is required
    },
});

// Removed passportLocalMongoose import and usage entirely

module.exports = mongoose.model('User', userSchema);
