const express = require('express'),
    path = require('path'),
     ejs = require('ejs'),

    app = new express();
    app.use(express.static('public'));

    
    app.set('view engine','ejs');
    app.get('/', (req, res) => {
        // res.sendFile(path.resolve(__dirname, 'pages/index.html'));
        res.render("index");
    });
    
    app.get('/about', (req, res) => {
        // res.sendFile(path.resolve(__dirname, 'pages/about.html'));
        res.render("about");
    });
    
    app.get('/contact', (req, res) => {
        // res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
        res.render("contact");
    });

    app.get('/post', (req, res) => {
        // res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
        res.render("post");
    });
    

    app.listen(4000, ()=>{
        console.log('App listening on port 4000')
       })