const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    batch: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: String,
        required: true
    },
    harvestDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    basePrice: {
        type: Number,
        required: true
    },
    currentPrice: {
        type: Number,
        default: function() {
            return this.basePrice;
        }
    },
    description: {
        type: String,
        default: ''
    },
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    supplyChain: [{
        stage: {
            type: String,
            enum: ['Farmer', 'Distributor', 'Retailer', 'Consumer'],
            required: true
        },
        price: {
            type: Number,
            default: null
        },
        company: {
            type: String,
            default: null
        },
        active: {
            type: Boolean,
            default: false
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    }],
    status: {
        type: String,
        enum: ['active', 'in_transit', 'at_retail', 'sold'],
        default: 'active'
    }
}, {
    timestamps: true
});

// Pre-save middleware to initialize supply chain
productSchema.pre('save', function(next) {
    if (this.isNew) {
        this.supplyChain = [
            { stage: 'Farmer', price: this.basePrice, active: true },
            { stage: 'Distributor', active: false },
            { stage: 'Retailer', active: false },
            { stage: 'Consumer', active: false }
        ];
        this.currentPrice = this.basePrice;
    }
    next();
});

// Virtual for price increase percentage
productSchema.virtual('priceIncrease').get(function() {
    if (this.currentPrice && this.basePrice) {
        const increase = ((this.currentPrice - this.basePrice) / this.basePrice) * 100;
        return `+${increase.toFixed(1)}%`;
    }
    return '+0.0%';
});

// Ensure virtual fields are serialized
productSchema.set('toJSON', { virtuals: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
