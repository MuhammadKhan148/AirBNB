// // const jwt = require('jsonwebtoken');

// // module.exports.authenticate = (req, res, next) => {
// //     const token = req.header('Authorization')?.split(' ')[1];
// // console.log(token)
// //     if (!token) {
// //         return res.status(403).json({ message: 'Access denied' });
// //     }

// //     try {
// //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //         req.user = decoded;  // Attach the decoded user to request
// //         console.log(req.user)
// //         next();
// //     } catch (err) {
// //         return res.status(400).json({ message: 'Invalid token' });
// //     }
// // };

// // backend/config/auth.js
// // backend/config/auth.js

// const jwt = require('jsonwebtoken');

// module.exports.authenticate = (req, res, next) => {
//     const authHeader = req.header('Authorization');
//     if (!authHeader) {
//         return res.status(403).json({ message: 'Access denied. No token provided.' });
//     }

//     const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
//     if (!token) {
//         return res.status(403).json({ message: 'Access denied. No token provided.' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;  // Attach the decoded user to request
//         next();
//     } catch (err) {
//         console.error('Authentication error:', err);
//         return res.status(400).json({ message: 'Invalid token.' });
//     }
// };
