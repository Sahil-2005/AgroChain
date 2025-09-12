const { Farmer } = require('../models/user');
const Product = require('../models/product');

class FarmerController {
    async getInventory(req, res) {
        try {
            const farmerId = req.user.id;
            
            // Fetch products from database
            const products = await Product.find({ farmerId })
                .sort({ createdAt: -1 }) // Most recent first
                .lean();

            // Format the response to match frontend expectations
            const formattedInventory = products.map(product => ({
                _id: product._id,
                name: product.name,
                batch: product.batch,
                quantity: product.quantity,
                harvestDate: product.harvestDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
                location: product.location,
                basePrice: `$${product.basePrice}`,
                currentPrice: `$${product.currentPrice}`,
                increase: product.priceIncrease,
                supplyChain: product.supplyChain,
                status: product.status,
                createdAt: product.createdAt
            }));

            res.status(200).json({ 
                inventory: formattedInventory,
                message: 'Inventory fetched successfully'
            });
        } catch (error) {
            console.error('Get inventory error:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    async addProduct(req, res) {
        try {
            const { name, batch, quantity, harvestDate, location, basePrice, description } = req.body;
            const farmerId = req.user.id;

            // Validate required fields
            if (!name || !batch || !quantity || !harvestDate || !location || !basePrice) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            // Check if batch already exists
            const existingProduct = await Product.findOne({ batch });
            if (existingProduct) {
                return res.status(400).json({ message: 'Product with this batch ID already exists' });
            }

            // Create new product in database
            const productData = {
                name,
                batch,
                quantity,
                harvestDate: new Date(harvestDate),
                location,
                basePrice: parseFloat(basePrice),
                description: description || '',
                farmerId
            };

            const savedProduct = await Product.create(productData);

            // Format response to match frontend expectations
            const formattedProduct = {
                _id: savedProduct._id,
                name: savedProduct.name,
                batch: savedProduct.batch,
                quantity: savedProduct.quantity,
                harvestDate: savedProduct.harvestDate.toISOString().split('T')[0],
                location: savedProduct.location,
                basePrice: `$${savedProduct.basePrice}`,
                currentPrice: `$${savedProduct.currentPrice}`,
                increase: savedProduct.priceIncrease,
                supplyChain: savedProduct.supplyChain,
                status: savedProduct.status,
                createdAt: savedProduct.createdAt
            };

            res.status(201).json({ 
                product: formattedProduct,
                message: 'Product added successfully'
            });
        } catch (error) {
            console.error('Add product error:', error);
            if (error.code === 11000) {
                return res.status(400).json({ message: 'Product with this batch ID already exists' });
            }
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new FarmerController();
