const express = require("express");
const MongoData = require("./config/db");
const productRoutes = require('./routes/productsRoutes')


const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('ShoppyGlobe API running');
});

const PORT = 4000;


MongoData().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on Port: ${PORT}`)
    })
}).catch((err) => {
    console.log('failed to start the server because of DB error', err)
})

app.use('/', productRoutes)