const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['user', 'admin'], // Define valid roles
            default: 'user'          // Default role is 'user'
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: false
        },
        versionKey: false
    }
);

module.exports = mongoose.model('user', userSchema);
