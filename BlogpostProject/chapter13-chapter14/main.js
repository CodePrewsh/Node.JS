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
const getPostController = require("./controllers/getPost")
const homeController = require('./controllers/home');
const app = express();
const ejs = require('ejs');
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/my_database', { useUnifiedTopology: true, useNewUrlParser: true });

const PORT = 4000;

// Session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Flash middleware for displaying flash messages
app.use(flash());

// Variable to hold user authentication status
global.loggedIn = null;
app.use("*", (req, res, next) => {
    // Set global variable 'loggedIn' based on user session
    loggedIn = req.session.userId;
    next();
});

// File upload middleware
app.use(fileUpload());

// Routes

// Home page route
app.get('/', homeController);

// Route to view a specific post
app.get('/post/:id', getPostController);

// Route to create a new post
app.get('/posts/new', authMiddleware, newPostController);
app.post('/posts/store', authMiddleware, storePostController);

// Routes for user authentication
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);

// Logout route
app.get('/auth/logout', logoutController);

// Route for handling 404 errors
app.use((req, res) => res.render('notfound'));

// Start the server
app.listen(PORT, () => {
    console.log('App listening on port 4000');
});
