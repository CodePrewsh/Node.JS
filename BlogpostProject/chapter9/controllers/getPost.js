// Importing the BlogPost model
const BlogPost = require('../models/BlogPost.js');

//  an async function which handles a request to view a specific blog post
module.exports = async (req, res) => {
    // Finding the blog post by its ID
    const blogpost = await BlogPost.findById(req.params.id);

    // Logging the found blog post to the console
    console.log(blogpost);

    // Rendering the 'post' view and passing the found blog post as data
    res.render('post', {
        blogpost 
    });
}
