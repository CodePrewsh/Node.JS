// Exporting a middleware function to validate the incoming request before creating a new blog post
module.exports = (req, res, next) => {
    // Checking if the request doesn't contain files, or if the title or body fields are empty after trimming
    if (req.files == null || req.body.title.trim() == '' || req.body.body.trim() == '') {
        // Redirecting the user to the new post page if any of the conditions are met
        return res.redirect('/posts/new');
    }

    // If the request is valid, move on to the next middleware in the chain
    next();
}
