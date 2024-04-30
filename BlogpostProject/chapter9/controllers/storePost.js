// Importing the BlogPost model
const BlogPost = require('../models/BlogPost.js');

// Importing the path module, which provides utilities for working with file and directory paths
const path = require('path');

// Exporting a function to handle the creation of a new blog post
module.exports = (req, res) => {
    // Getting the image file from the request
    let image = req.files.image;

    // Moving the uploaded image file to the appropriate directory
    image.mv(path.resolve(__dirname, '..', 'public/img', image.name), async (error) => {
        // Creating a new blog post in the database with the provided data
        await BlogPost.create({
            ...req.body, // Using spread operator to include all fields from the request body
            image: '/img/' + image.name // Setting the image field to the path of the uploaded image
        });

        // Redirecting the user to the home page after creating the blog post
        res.redirect('/');
    });
}
