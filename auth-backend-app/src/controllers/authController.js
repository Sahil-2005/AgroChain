const jwt = require('jsonwebtoken');
const { User, Farmer, Distributor, Retailer } = require('../models/user');

class AuthController {
    async registerUser(req, res) {
        const { role, name, email, password, phone, location, license } = req.body;
        try {
            if (!['farmer', 'distributor', 'retailer'].includes(role)) {
                return res.status(400).json({ message: 'Invalid role' });
            }
            if (!name || !email || !password) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const exists = await User.findOne({ email });
            if (exists) return res.status(400).json({ message: 'User already exists' });

            let created;
            if (role === 'farmer') {
                if (!phone || !location) return res.status(400).json({ message: 'Phone and location are required for farmers' });
                created = await Farmer.create({ name, email, password, phone, location });
            } else if (role === 'distributor') {
                if (!phone || !license) return res.status(400).json({ message: 'Phone and license are required for distributors' });
                created = await Distributor.create({ name, email, password, phone, license });
            } else if (role === 'retailer') {
                if (!phone) return res.status(400).json({ message: 'Phone is required for retailers' });
                created = await Retailer.create({ name, email, password, phone });
            }

            const token = jwt.sign({ id: created._id, role }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
            res.status(201).json({ token, user: { id: created._id, name: created.name, email: created.email, role } });
        } catch (error) {
            console.error('Register error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async loginUser(req, res) {
        const { email, password, role } = req.body;
        try {
            const user = await User.findOne({ email }).select('+password');
            if (!user) return res.status(401).json({ message: 'Invalid credentials' });
            if (role && user.role !== role) return res.status(401).json({ message: 'Invalid role for these credentials' });
            const valid = await user.comparePassword(password);
            if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
            res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = AuthController;