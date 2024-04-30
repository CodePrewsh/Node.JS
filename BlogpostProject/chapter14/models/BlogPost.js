const mongoose = require('mongoose'),
    //Define models using schema interface
    Schema = mongoose.Schema,
    BlogPostSchema = new Schema({
        title: String,
        body: String,
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        datePosted: { /* can declare property type with an object like this 
because we need 'default' */
            type: Date,
            default: new Date()
        },
        image: String
    }),
    //Access the database via mongoose.model
    BlogPost = mongoose.model('BlogPost', BlogPostSchema);

/**Export the blogpost variable so that when other
 * file require, know to grab the blogpost.
 */
module.exports = BlogPost;