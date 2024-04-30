// Import required modules
const mongoose = require('mongoose'); // For MongoDB object modeling
const Schema = mongoose.Schema; // Schema constructor from Mongoose
const bcrypt = require('bcrypt'); // For hashing passwords

// Define User Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true, // Username is required
        unique: true // Username must be unique
    },
    password: {
        type: String,
        required: true // Password is required
    }
});

// Hash Password Before Saving
UserSchema.pre('save', function (next) {
    const user = this; // Reference to the current user
    // Hash the password with bcrypt, salt round is 10
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash; // Replace plain password with hash
        next(); // Continue with the saving process
    });
});

// Export User model
const User = mongoose.model('User', UserSchema); // Create the User model
module.exports = User; // Export the User model for use in other files
