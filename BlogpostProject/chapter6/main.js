
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost.js'); 

// Create Express app
const app = express();

// Middleware setup
app.use(express.static('public')); // Serving static files from the 'public' directory
app.use(express.json()); // Parsing JSON bodies
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost/my_database');

// Set view engine to EJS
app.set('view engine', 'ejs');

// Route to store blog posts
app.post('/posts/store', (req, res) => {
    console.log(req.body); 
    res.redirect('/'); // Redirect to homepage after storing the post
});

// Homepage route
// app.get('/', (req, res) => {
//     res.render("index"); // Render the index.ejs view
// });

app.get('/',async (req,res)=>{
    const blogposts = await BlogPost.find({})
    res.render('index',{
    blogposts: blogposts
    });
   })

// About page route
app.get('/about', (req, res) => {
    res.render("about"); // Render the about.ejs view
});

// Contact page route
app.get('/contact', (req, res) => {
    res.render("contact"); // Render the contact.ejs view
});

app.get('/post/:id',async (req,res)=>{
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post',{
    blogpost
    })
   })

//    Route to create a new blog post
app.get('/posts/new', (req, res) => {
    res.render('create'); // Render the create.ejs view for creating new posts
});


// Start the server
app.listen(4000, () => {
    console.log('App listening on port 4000');
});
