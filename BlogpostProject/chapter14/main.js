const express = require('express');
const path = require('path');
const newPostController = require('./controllers/newPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const storePostController = require('./controllers/storePost');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const logoutController = require('./controllers/logout');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');
const fileUpload = require('express-fileupload');

const app = express();
const ejs = require('ejs');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/my_database', { useUnifiedTopology: true, useNewUrlParser: true });

const PORT = 4000;

// Session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Flash middleware
app.use(flash());

// Global middleware to check user session
global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

app.use(fileUpload());

app.listen(PORT, () => {
    console.log('App listening on port 4000');
});

// Routes

app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({});
    res.render('index', {
        blogposts: blogposts
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/samplepost', (req, res) => {
    res.render('samplepost');
});

app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost: blogpost
    });
});

// Route to render the form for creating a new post
app.get('/posts/new', authMiddleware, (req, res) => {
    res.render('newpost');
});

// Route to handle the creation of a new post
app.post('/posts/store', authMiddleware, async (req, res) => {
    try {
        if (!req.files || !req.files.image) {
            return res.status(400).send('No image was uploaded.');
        }

        const image = req.files.image;

        // Move the image to the 'public/img' directory
        await image.mv(path.resolve(__dirname, 'public/img', image.name));

        // Create a new BlogPost with the image path
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        });

        // Redirect to the home page after successful post creation
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);
app.get('/auth/logout', logoutController);

app.use((req, res) => res.render('notfound'));
