const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [50, 'Your name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email address'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Your password must be at least 6 characters'],
        select: false
    },
    avatar: {
        public_id: String,
        url: String,
    },
    role: {
        type: String,
        default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true });

// Encrypt the password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', userSchema);