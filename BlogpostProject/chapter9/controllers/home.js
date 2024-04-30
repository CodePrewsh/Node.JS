const BlogPost = require('../models/BlogPost.js');

// Exporting an async function to handle a request to view all blog posts
module.exports = async (req, res) => {
    // Finding all blog posts
    const blogposts = await BlogPost.find({});

    // Rendering the 'index' view and passing the found blog posts as data
    res.render('index', {
        blogposts // 
    });
}
