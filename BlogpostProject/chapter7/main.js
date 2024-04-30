const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost.js');
const fileUpload = require('express-fileupload'); // Add this line

// Create Express app
const app = express();

// Middleware setup
app.use(express.static('public')); // Serving static files from the 'public' directory
app.use(express.json()); // Parsing JSON bodies
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded bodies
app.use(fileUpload()); // Add this line to enable file uploads

// Connect to MongoDB
mongoose.connect('mongodb://localhost/my_database');

// Set view engine to EJS
app.set('view engine', 'ejs');

// Route to store blog posts
app.post('/posts/store', (req, res) => {
    // Check if image exists in request
    if (!req.files || !req.files.image) {
        return res.status(400).send('No files were uploaded.');
    }

    let image = req.files.image;
    let imageName = image.name;

    // Move the uploaded file to the public/img directory
    image.mv(path.resolve(__dirname, 'public/img', imageName), async (error) => {
        if (error) {
            return res.status(500).send(error);
        }

        // Create the blog post with the image name
        try {
            await BlogPost.create({
                title: req.body.title,
                body: req.body.body,
                image: '/img/' + imageName // Specify the full image file path
            });
            res.redirect('/');
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });
});

// Homepage route
app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({});
    res.render('index', { blogposts: blogposts });
});

// About page route
app.get('/about', (req, res) => {
    res.render('about');
});

// Contact page route
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Route to view a single blog post
app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id);
    res.render('post', { blogpost: blogpost });
});

// Route to create a new blog post
app.get('/posts/new', (req, res) => {
    res.render('create');
});

// Start the server
app.listen(4000, () => {
    console.log('App listening on port 4000');
});
