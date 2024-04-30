// Import required modules
const mongoose = require('mongoose'); // For MongoDB object modeling
const Schema = mongoose.Schema; // Schema constructor from Mongoose

// Define BlogPost Schema
const BlogPostSchema = new Schema({
    title: String, // Title of the blog post
    body: String, // Body/content of the blog post
    username: String, // Username of the author
    datePosted: { // Date when the post was created
        type: Date,
        default: new Date() // Default value is the current date
    },
    image: String // URL or path to the image associated with the blog post
});

// Create the BlogPost model
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

// Export the BlogPost model for use in other files
module.exports = BlogPost;
