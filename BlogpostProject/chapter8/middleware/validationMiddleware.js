// middleware function exports a function that takes three parameters: req, res, and next.
module.exports = (req, res, next) => {
    // Check if req.files is null or if the title/body fields of the request body are empty after trimming.
    if (req.files == null || req.body.title.trim() == '' || req.body.body.trim() == '') {
        // If any of the conditions are met, redirect the user to the '/posts/new' route.
        return res.redirect('/posts/new');
    }
    // If none of the conditions are met, call the next middleware function.
    next();
}
