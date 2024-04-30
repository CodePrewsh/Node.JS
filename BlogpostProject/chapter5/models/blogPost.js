const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Define the schema
// A schema represents how a collection looks like.
const BlogPostSchema = new Schema({
  title: String,
  body: String
});

// Create the model
// We access the database via mongoose.model
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

// Export the model
module.exports = BlogPost;
