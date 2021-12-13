//template for nodejs express server
require('dotenv').config()

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    port = process.env.PORT || 3000,
    path = require('path');

const options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
}

var allowedOrigins = ['http://localhost:3000',
    'http://yourapp.com'];
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.static('public', options))
app.use(bodyParser.json());

app.get('/', cors(), (req, res) => {
    res.send("hello world")
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})