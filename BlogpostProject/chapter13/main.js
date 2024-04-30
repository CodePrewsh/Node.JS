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

global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

app.use(fileUpload());


// Routes

app.get('/', homeController);

app.get('/post/:id', getPostController);


app.get('/posts/new', authMiddleware, newPostController);
app.post('/posts/store', authMiddleware, storePostController);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);

app.get('/auth/logout', logoutController);
app.use((req, res) => res.render('notfound'));

app.listen(PORT, () => {
    console.log('App listening on port 4000');
});