// Importing mongoose, a MongoDB ODM (Object Document Mapper)
const mongoose = require('mongoose');

// Getting the Schema constructor from mongoose
const Schema = mongoose.Schema;

// Defining a new Schema for BlogPost
const BlogPostSchema = new Schema({
    title: String, // Title of the blog post, type String
    body: String, // Body of the blog post, type String
    username: String, // Username of the author, type String
    datePosted: { // Date when the post was created, type Date
        type: Date,
        default: new Date() // Default value is the current date and time
    },
    image: String // Path to the image associated with the post, type String
});

// Creating a model named 'BlogPost' based on the BlogPostSchema
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

// Exporting the BlogPost model to make it accessible from other files
module.exports = BlogPost;
