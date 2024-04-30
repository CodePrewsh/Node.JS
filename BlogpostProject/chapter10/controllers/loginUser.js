// Importing the bcrypt library for password hashing and comparison
const bcrypt = require('bcrypt');
// Importing the User model
const User = require('../models/User');

// Exporting a function to handle user login
module.exports = (req, res) => {
    // Destructuring username and password from the request body
    const { username, password } = req.body;
    
    // Finding a user with the given username in the database
    User.findOne({ username: username }, (error, user) => {
        if (user) { // If user is found
            // Comparing the provided password with the hashed password stored in the database
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) { // If passwords match
                    // Redirecting to the home page
                    res.redirect('/');
                } else {
                    // If passwords don't match, redirecting back to the login page
                    res.redirect('/auth/login');
                }
            });
        } else {
            // If user is not found, redirecting back to the login page
            res.redirect('/auth/login');
        }
    });
};
