const express = require('express');
const bodyParser = require("body-parser");
const app = express();


const dbService = require('./service/db.service')
const ObjectId = require('mongodb').ObjectId

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Header",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS")
    next()
})

const productRoutes = require('./product/product.routes')

app.use('/api/product', productRoutes)

module.exports = app;