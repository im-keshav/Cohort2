const mongoose = require("mongoose");


function connecttoDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to MongoDB");
    })
}

module.exports = connecttoDb;