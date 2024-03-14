require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const mongoose = require('mongoose')
const uri = process.env.MONGODB_URI;
const cors = require('cors')
const db = mongoose.connect(uri)
    .then(result => {
        app.listen(5000)
        console.log(`listening on port: ${5000}`)
    })
    .catch(err => console.log(err));

//middlewares
app.use(cors())
app.use(morgan('tiny'))
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});
app.use(express.json())
