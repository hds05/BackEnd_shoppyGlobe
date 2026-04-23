const express = require("express")
require("dotenv").config();
const mongoose = require("mongoose")

if(!process.env.MONGO_URI){
    console.log("There is no MONGO_URI")
}

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("DB Connection successful"))
.catch(err => console.log("Error in connection to DB", err))


const app = express()

const PORT = 4000;

app.listen(PORT, ()=> {
    console.log(`Server is running on Port: ${PORT}`)
})
