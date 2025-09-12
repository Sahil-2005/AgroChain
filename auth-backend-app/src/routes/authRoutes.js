const express = require('express');
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const controller = new AuthController();

// User registration route
router.post('/register', (req, res) => controller.registerUser(req, res));

// User login route
router.post('/login', (req, res) => controller.loginUser(req, res));

// Protected route example
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'You have accessed a protected route!' });
});

module.exports = router;