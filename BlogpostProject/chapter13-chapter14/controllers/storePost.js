const BlogPost = require('../models/BlogPost.js'); // Importing the BlogPost model
const path = require('path'); // Importing the path module

module.exports = (req, res) => {
    // Retrieving the uploaded image from the request
    let image = req.files.image;

    // Moving the uploaded image to the public/img directory
    image.mv(path.resolve(__dirname, '..', 'public/img', image.name), async (error) => {
        // If there's an error during file upload
        if (error) {
            console.error(error); // Log the error
            return res.status(500).send('Internal Server Error'); // Send a 500 error response
        }

        // Ensure userId is retrieved from the session
        const userId = req.session.userId;

        try {
            // Create new BlogPost object with userId included
            await BlogPost.create({
                ...req.body, // Spread the request body
                image: '/img/' + image.name, // Set the image path
                userid: userId // Include userId here
            });

            // Redirect to the home page after successfully storing the post
            res.redirect('/');
        } catch (err) {
            console.error(err); // Log the error if any
            res.status(500).send('Internal Server Error'); // Send a 500 error response
        }
    });
};
