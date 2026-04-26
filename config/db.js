const mongoose = require("mongoose")
// Load environment variables from .env file (MONGO_URI)
require("dotenv").config();

// Check if MONGO_URI exists in .env file
if (!process.env.MONGO_URI) {
    console.log("There is no MONGO_URI")
}
// This is a function that will connect our app to MongoDB
const MongoData = async () => {
    // mongoose.connect() connects to MongoDB using the URL
    try {
        await mongoose.connect(process.env.MONGO_URI)
        // If connection is successful, this will run
        console.log("DB Connection successful")
    }
    catch (err) {
        // If connection fails, this will run
        console.log("Error in connection to DB", err)
        // Stop the server completely 
        process.exit(1)
    }
}
// Export this function so we can use it in server.js
module.exports = MongoData