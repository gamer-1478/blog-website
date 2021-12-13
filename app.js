//template for nodejs express server
require('dotenv').config()

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
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

// Allowed hosts
const allowedHosts = ['localhost'];
const checkHosts = (req, res, next) => {
    if (allowedHosts.includes(req.hostname)) {
        console.log(req.hostname);
        return next();
    }

    return res.sendStatus(403);
}

app.use(checkHosts);


app.use(express.static('public', options))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("hello world")
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})