
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');  // Add bcrypt for hashing passwords

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
        userType: ['User', 'Admin'],  // Ensure only 'User' or 'Admin' can be set
    },
});

// Hash password before saving user
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(12); // Generate a salt with 12 rounds
        this.password = await bcrypt.hash(this.password, salt); // Hash password with salt
        next();
    } catch (error) {
        next(error);
    }
});

// Check if entered password matches the hashed password
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};


const User = mongoose.model('User', UserSchema);
module.exports = User;
