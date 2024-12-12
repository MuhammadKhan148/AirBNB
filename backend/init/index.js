// // // if(process.env.NODE_ENV != "production") {
// // //     require('dotenv').config();
// // // }

// // // const mongoose = require("mongoose");
// // // const initData = require("./data.js");
// // // const Listing = require("../models/listing.js");

// // // const dbUrl = process.env.ATLASDB_URL;

// // // main().then(() => {
// // //     console.log("connected to DB");
// // // }).catch((err) => {
// // //     console.log(err);
// // // });

// // // async function main() {
// // //     await mongoose.connect(dbUrl);
// // // }

// // // const initDB = async () => {
// // //     await Listing.deleteMany({});
// // //     initData.data = initData.data.map((obj) => ({...obj, owner: "65f498de938bbbafdcf350b8"}))
// // //     await Listing.insertMany(initData.data);
// // //     console.log("data was initialized");
// // // }

// // // // initDB();


// // if (process.env.NODE_ENV != "production") {
// //     require('dotenv').config({ path: '../.env' });
// // }

// // const mongoose = require("mongoose");
// // const initData = require("./data.js");
// // const Listing = require("../models/listing.js");
// // const User = require("../models/user.js");

// // const dbUrl = process.env.ATLASDB_URL;

// // main().then(() => {
// //     console.log("connected to DB");
// // }).catch((err) => {
// //     console.log(err);
// // });

// // async function main() {
// //     await mongoose.connect(dbUrl);
// // }

// // const initDB = async () => {
// //     try {
// //         // Clear the database
// //         await Listing.deleteMany({});
// //         await User.deleteMany({});

// //         // Create a default admin user
// //         const adminUser = new User({
// //             email: "admin@wanderlust.com",
// //             username: "admin"
// //         });

// //         const registeredUser = await User.register(adminUser, "admin123");
// //         console.log("Admin user created");

// //         // Add the admin user as owner to all listings
// //         const listingsWithOwner = initData.data.map((listing) => ({
// //             ...listing,
// //             owner: registeredUser._id
// //         }));

// //         // Insert all listings
// //         const insertedListings = await Listing.insertMany(listingsWithOwner);
// //         console.log(${insertedListings.length} listings were created);

// //     } catch (err) {
// //         console.log("Error during initialization:", err);
// //     } finally {
// //         // Close the connection
// //         mongoose.connection.close();
// //     }
// // };

// // // Run the initialization
// // initDB();



// // backend/init/index.js

// // Load environment variables from .env file if not in production
// if (process.env.NODE_ENV !== "production") {
//     require('dotenv').config({ path: '../.env' });
// }

// const mongoose = require("mongoose");
// const bcrypt = require('bcrypt');
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");
// const User = require("../models/user.js");

// // Get MongoDB connection URI from environment variables
// const dbUrl = process.env.ATLASDB_URL;

// // Connect to MongoDB
// mongoose.connect(dbUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => {
//         console.log("Connected to MongoDB.");
//         initDB(); // Start database initialization after successful connection
//     })
//     .catch((err) => {
//         console.error("DB Connection Error:", err);
//     });

// // Function to initialize the database
// const initDB = async () => {
//     try {
//         // Clear existing data
//         console.log("Clearing existing listings and users...");
//         await Listing.deleteMany({});
//         await User.deleteMany({});

//         // Create a default admin user with hashed password
//         console.log("Creating admin user...");
//         const hashedPassword = await bcrypt.hash("admin123", 10); // You can change "admin123" to a more secure password
//         const adminUser = new User({
//             email: "admin@wanderlust.com",
//             username: "admin",
//             password: hashedPassword,
//         });

//         const savedAdminUser = await adminUser.save();
//         console.log("Admin user created.");

//         // Assign the admin user as the owner of all listings
//         console.log("Assigning admin as owner to all listings...");
//         const listingsWithOwner = initData.data.map((listing) => ({
//             ...listing,
//             owner: savedAdminUser._id, // Assign the admin user's ObjectId as the owner
//         }));

//         // Insert all listings into the database
//         const insertedListings = await Listing.insertMany(listingsWithOwner);
//         console.log(`${insertedListings.length} listings were created and assigned to the admin user.`);

//     } catch (err) {
//         console.error("Error during database initialization:", err);
//     } finally {
//         // Close the MongoDB connection
//         mongoose.connection.close();
//         console.log("Database connection closed.");
//     }
// };

// backend/init/index.js

// Load environment variables from .env file if not in production
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config({ path: '../.env' });
}

const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const initData = require("./data.js"); // Ensure this exports an object with a 'data' array
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

// Get MongoDB connection URI from environment variables
const dbUrl = process.env.ATLASDB_URL;

// Connect to MongoDB
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB.");
        initDB(); // Start database initialization after successful connection
    })
    .catch((err) => {
        console.error("DB Connection Error:", err);
    });

// Function to initialize the database
const initDB = async () => {
    try {
        // Clear existing data
        console.log("Clearing existing listings and users...");
        await Listing.deleteMany({});
        await User.deleteMany({});

        // Create a default admin user with hashed password
        console.log("Creating admin user...");
        const hashedPassword = await bcrypt.hash("admin123", 10); // Change "admin123" to a secure password as needed
        const adminUser = new User({
            email: "admin@wanderlust.com",
            username: "admin",
            password: hashedPassword,
        });

        const savedAdminUser = await adminUser.save();
        console.log("Admin user created.");

        // Assign the admin user as the owner of all listings
        console.log("Assigning admin as owner to all listings...");
        const listingsWithOwner = initData.data.map((listing) => ({
            ...listing,
            owner: savedAdminUser._id, // Assign the admin user's ObjectId as the owner
        }));

        // Insert all listings into the database
        const insertedListings = await Listing.insertMany(listingsWithOwner);
        console.log(`${insertedListings.length} listings were created and assigned to the admin user.`);

    } catch (err) {
        console.error("Error during database initialization:", err);
    } finally {
        // Close the MongoDB connection
        mongoose.connection.close();
        console.log("Database connection closed.");
    }
};

// Run the initialization
initDB();
