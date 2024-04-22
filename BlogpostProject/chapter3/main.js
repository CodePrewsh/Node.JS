const express = require('express'),
    path = require('path'),
    app = new express();
    app.use(express.static('public'));

    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'pages/index.html'));
    });
    
    app.get('/about', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'pages/about.html'));
    });
    
    app.get('/contact', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
    });
    
    app.listen(3000, () => {
        console.log("App listening on port 4000");
    });


    app.listen(4000, ()=>{
        console.log('App listening on port 4000')
       })