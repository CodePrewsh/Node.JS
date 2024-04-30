const express = require('express');
const path = require('path');
const newPostController = require('./controllers/newPost')
const app = new express();
const ejs = require('ejs');
app.set('view engine', 'ejs');

app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a custom middleware function that logs a message when called
const customMiddleWare = (req, res, next) => {
    console.log('Custom middleware called'); // Log a message
    next(); // Call the next middleware in the stack
};

// Register the custom middleware to be used for all routes
app.use(customMiddleWare);

// Define a middleware function to validate whether required data exists
const validateMiddleWare = (req, res, next) => {
    // Check if files or title are missing in the request
    if (req.files == null || req.body.title == null) {
        return res.redirect('/posts/new'); // Redirect to create new post if data is missing
    }
    next(); // Call the next middleware in the stack if validation passes
};


// Importmodules.
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

// Connecting to MongoDB using mongoose.
mongoose.connect('mongodb://localhost/my_database', { useUnifiedTopology: true, useNewUrlParser: true });

// Applying the validateMiddleware to the '/posts/store' route.
app.use('/posts/store', validateMiddleWare);

const { error } = require('console');

const fileUpload = require('express-fileupload')
app.use(fileUpload())

app.listen(4000, () => {
    console.log('App listening on port 4000');
});
// Route to render the homepage and fetch all blog posts
app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({}); // Fetch all blog posts
    res.render('index', { // Render the index template and pass blogposts data
        blogposts: blogposts
    });
});

// Route to render the about page
app.get('/about', (req, res) => {
    res.render('about'); // Render the about template
});

// Route to render the contact page
app.get('/contact', (req, res) => {
    res.render('contact'); // Render the contact template
});

// Route to render the sample post page
app.get('/samplepost', (req, res) => {
    res.render('samplepost'); // Render the samplepost template
});

// Route to render a specific blog post based on its ID
app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id) // Find the blog post by ID
    res.render('post', { // Render the post template and pass the blogpost data
        blogpost: blogpost
    });
});

// Route to render the form for creating a new blog post
app.get('/posts/new', newPostController); // Render the newPostController, which renders the new post form

// Route to render the form for creating a new blog post
app.get('/create', (req, res) => {
    res.render('create'); // Render the create template
});

// Route to handle the creation of a new blog post
app.post('/posts/store', async (req, res) => {
    try {
        let image = req.files.image; // Get the uploaded image
        await image.mv(path.resolve(__dirname, 'public/img', image.name)); // Move the image to the /public/img folder
        await BlogPost.create({ // Create a new blog post in the database
            ...req.body, // Include form data
            image: '/img/' + image.name // Add the image path to the blog post data
        });
        res.redirect('/'); // Redirect to the homepage after successful creation
    } catch (error) {
        console.error(error); // Log any errors
        res.status(500).send('Internal Server Error'); // Render an internal server error page
    }
});


