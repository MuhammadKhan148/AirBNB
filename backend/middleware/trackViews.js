// backend/middleware/trackViews.js
const Listing = require('../models/listing');

const trackViews = async (req, res, next) => {
    const { id } = req.params;
    try {
        const listing = await Listing.findById(id);
        if (listing) {
            listing.views = (listing.views || 0) + 1;
            await listing.save();
        }
    } catch (error) {
        console.error('Error tracking views:', error);
    }
    next();
};

module.exports = trackViews;
