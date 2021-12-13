//template for nodejs express server
require('dotenv').config()

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    port = process.env.PORT || 3000,
    path = require('path');

//serve public folder
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
app.use(express.static('public', options))


//cors middleware
const whitelist = ['http://blog.aayushgarg.net']
const corsOptions = {
    origin: (origin, callback) => {
        if ( whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    }
}
app.use(cors(corsOptions))

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


app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("hello world")
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})