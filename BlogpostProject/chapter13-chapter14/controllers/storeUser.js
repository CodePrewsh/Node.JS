const User = require('../models/User.js'); // Importing the User model
const path = require('path');

module.exports = (req, res) => {
    // Create a new user with the data from the request body
    User.create(req.body, (error, user) => {
        // If there's an error during user creation
        if (error) {
            // Extract validation errors from the Mongoose error object
            const validationErrors = Object.keys(error.errors).map(key =>
                error.errors[key].message);
            
            // Flash validation errors and the input data to the session
            req.flash('validationErrors', validationErrors);
            req.flash('data', req.body);
            
            // Redirect back to the registration page with flash messages
            return res.redirect('/auth/register');
        }
        // If user creation is successful, redirect to the home page
        res.redirect('/');
    });
};
