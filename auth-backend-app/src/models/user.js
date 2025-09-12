const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const baseOptions = {
    discriminatorKey: 'role',
    timestamps: true,
};

const BaseUserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    baseOptions
);

BaseUserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

BaseUserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', BaseUserSchema);

// Farmer schema
const FarmerSchema = new mongoose.Schema({
    phone: { type: String, required: true },
    location: { type: String, required: true },
});

// Distributor schema
const DistributorSchema = new mongoose.Schema({
    phone: { type: String, required: true },
    license: { type: String, required: true },
});

// Retailer schema
const RetailerSchema = new mongoose.Schema({
    phone: { type: String, required: true },
});

const Farmer = User.discriminator('farmer', FarmerSchema);
const Distributor = User.discriminator('distributor', DistributorSchema);
const Retailer = User.discriminator('retailer', RetailerSchema);

module.exports = {
    User,
    Farmer,
    Distributor,
    Retailer,
};