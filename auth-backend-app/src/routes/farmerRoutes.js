const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const farmerController = require('../controllers/farmerController');

const router = express.Router();

// All farmer routes require authentication
router.use(authMiddleware);

// Check if user is a farmer
router.use((req, res, next) => {
    if (req.user.role !== 'farmer') {
        return res.status(403).json({ message: 'Access denied. Farmer role required.' });
    }
    next();
});

// Farmer inventory routes
router.get('/inventory', farmerController.getInventory);
router.post('/inventory', farmerController.addProduct);

module.exports = router;
