// utils/catchAsync.js

// module.exports = (fn) => {
//     console.log(fn)
//     return (req, res, next) => {
//         // console.log(req)
//         fn(req, res, next).catch(next);
//     };
// };
// backend/utils/catchAsync.js
module.exports = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    }
}
