const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const BlogPostSchema = new Schema({
    title: String,
    body: String,
    username: String,
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: String // Add this line to keep the image field
});

// Create the model
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

// Export the model
module.exports = BlogPost;
