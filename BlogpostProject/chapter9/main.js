// Importing required modules
const express = require('express');
const newPostController = require('./controllers/newPost');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');
const fileUpload = require('express-fileupload');

// Initializing express app
const app = new express();

// Setting view engine to EJS
app.set('view engine', 'ejs');

// Serving static files from the 'public' directory
app.use(express.static('public'));

// Setting up body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to validate request before creating a new blog post
const validateMiddleWare = (req, res, next) => {
    if (req.files == null || req.body.title == null) {
        return res.redirect('/posts/new')
    }
    next()
};

// Applying validateMiddleWare to the '/posts/store' route
app.use('/posts/store', validateMiddleWare);

// Connecting to MongoDB database
mongoose.connect('mongodb://localhost/my_database', { useUnifiedTopology: true, useNewUrlParser: true });

// Setting up file upload middleware
app.use(fileUpload());

// Route to display all blog posts
app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({});
    res.render('index', {
        blogposts: blogposts
    });
});

// Route to display 'about' page
app.get('/about', (req, res) => {
    res.render('about');
});

// Route to display 'contact' page
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Route to display a sample post
app.get('/samplepost', (req, res) => {
    res.render('samplepost');
});

// Route to display a specific blog post
app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost: blogpost
    });
});

// Route to handle creation of a new blog post
app.post('/posts/store', async (req, res) => {
    try {
        // Getting uploaded image
        let image = req.files.image;

        // Moving the image to the appropriate directory
        await image.mv(path.resolve(__dirname, 'public/img', image.name));

        // Creating a new blog post in the database
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        });

        // Redirecting to the home page after successful creation
        res.redirect('/');
    } catch (error) {
        // Handling errors
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Starting the server
app.listen(4000, () => {
    console.log('App listening on port 4000');
});
