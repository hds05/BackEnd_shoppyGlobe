// import express to create server
const express = require("express");
// import MongoData to intract with DB
const MongoData = require("./config/db");
// import routes of Products to perform product related APIs
const productRoutes = require('./routes/productsRoutes')
// import routes of cart to perform cart related APIs
const cartRoutes = require('./routes/cartRoutes')
// import routes of auth to handle authentication
const authRoutes = require('./routes/authRoutes')
// load environment variables from .env file
require('dotenv').config();

// create express app
const app = express()

// middleware (parses JSON data from request body)
app.use(express.json())

// if server is running
app.get('/', (req, res) => {
    res.send('ShoppyGlobe API running');
});

// after connecting DB only then start the server
MongoData().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on Port: ${process.env.PORT}`)
    })
}).catch((err) => {
    console.log('failed to start the server because of DB error', err)
})

// use product routes → base path "/"
app.use('/', productRoutes)

// use cart routes → base path "/cart"
app.use('/cart', cartRoutes)

// use auth routes → base path "/auth"
app.use('/auth', authRoutes)