const mongoose = require("mongoose")
require("dotenv").config();


if (!process.env.MONGO_URI) {
    console.log("There is no MONGO_URI")
}

const MongoData = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI)
        // .then(()=>
        console.log("DB Connection successful")
        // )
    }
    catch (err) {
        console.log("Error in connection to DB", err)
        process.exit(1)
    }
}
module.exports = MongoData