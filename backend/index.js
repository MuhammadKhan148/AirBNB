// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const userRoutes = require('./routes/userRoutes');
// const listingRoutes = require('./routes/listingRoutes');
// const reviewRoutes = require('./routes/reviewRoutes');
// const path = require('path');
// const cors = require('cors'); 
// dotenv.config();
// const app = express();
// // Middleware to parse application/x-www-form-urlencoded (for form submissions)
// app.use(express.urlencoded({ extended: true }));
// const corsOptions = {
//     origin: "http://localhost:5173",  // Your React frontend URL
//     credentials: true, // Allow cookies to be sent with requests
//   };

//   app.use(cors(corsOptions));
// // Middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/listings', listingRoutes);
// app.use('/api/reviews', reviewRoutes);

// // MongoDB connection
// mongoose.connect(process.env.ATLASDB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Database connected'))
//     .catch((err) => console.log('Database connection error:', err));

// // Start server
// app.listen(process.env.PORT || 8080, () => {
//     console.log(`Server running on port ${process.env.PORT || 8080}`);
// });

// backend/index.js
// backend/index.js

// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const userRoutes = require('./routes/userRoutes');
// const listingRoutes = require('./routes/listingRoutes');
// const reviewRoutes = require('./routes/reviewRoutes');
// const bookingRoutes = require('./routes/bookingRoutes'); // Import Booking Routes
// const analyticsRoutes = require('./routes/analyticsRoutes'); // Import Analytics Routes
// const cors = require('cors');
// const http = require('http');
// const { Server } = require('socket.io');
// const jwt = require('jsonwebtoken');
// const path = require('path'); // Import path module

// dotenv.config();
// const app = express();

// // Middleware to parse application/x-www-form-urlencoded (for form submissions)
// app.use(express.urlencoded({ extended: true }));

// const corsOptions = {
//     origin: "http://localhost:5173",  // Your React frontend URL
//     credentials: true, // Allow cookies to be sent with requests
// };

// app.use(cors(corsOptions));

// // Middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve static files from uploads directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/listings', listingRoutes);
// app.use('/api/reviews', reviewRoutes);
// app.use('/api/bookings', bookingRoutes); // Use Booking Routes
// app.use('/api/analytics', analyticsRoutes); // Use Analytics Routes

// // Create HTTP server
// const server = http.createServer(app);

// // Initialize Socket.IO
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5173",
//         methods: ["GET", "POST"],
//         credentials: true
//     }
// });

// // Middleware to authenticate socket connections
// io.use((socket, next) => {
//     const token = socket.handshake.auth.token;
//     if (!token) {
//         return next(new Error("Authentication error"));
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         socket.user = decoded;
//         next();
//     } catch (err) {
//         next(new Error("Authentication error"));
//     }
// });

// // Handle Socket.IO connections
// io.on('connection', (socket) => {
//     console.log(`User connected: ${socket.user.id}`);
//     // Join room based on user ID to target specific users
//     socket.join(socket.user.id);

//     socket.on('disconnect', () => {
//         console.log(`User disconnected: ${socket.user.id}`);
//     });
// });

// // Make io accessible to controllers
// app.set('socketio', io);

// // MongoDB connection
// mongoose.connect(process.env.ATLASDB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Database connected'))
//     .catch((err) => console.log('Database connection error:', err));

// // Global Error Handling Middleware
// app.use((err, req, res, next) => {
//     console.error('Global Error Handler:', err.stack);
//     res.status(err.statusCode || 500).json({
//         message: err.message || 'Internal Server Error',
//     });
// });

// // Start server
// server.listen(process.env.PORT || 8080, () => {
//     console.log(`Server running on port ${process.env.PORT || 8080}`);
// });

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();

// Middleware to parse application/x-www-form-urlencoded (for form submissions)
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: "http://localhost:5173", // Your React frontend URL
    credentials: true, // Allow cookies
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/analytics', analyticsRoutes);

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Optional Socket.IO auth for bookings or other features:
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next();
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded;
        next();
    } catch (err) {
        // If token invalid, still allow connection but no user details
        next();
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');
    // If user is authenticated, we can join their room:
    if (socket.user) {
        socket.join(socket.user.id);
    }

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Make io accessible to controllers
app.set('socketio', io);

// Connect to MongoDB
mongoose.connect(process.env.ATLASDB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Database connection error:', err));

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err.stack);
    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

// Start server
server.listen(process.env.PORT || 8080, () => {
    console.log(`Server running on port ${process.env.PORT || 8080}`);
});
