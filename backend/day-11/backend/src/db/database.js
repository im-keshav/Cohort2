const mongoose = require("mongoose")
const config = require("../config/config")



async function connectToDB(){
    try{
        await mongoose.connect(config.MONGO_URI)
        console.log("database connected")
    }catch(err){
        console.log("database connection failed",err)
    }
}
module.exports = connectToDB