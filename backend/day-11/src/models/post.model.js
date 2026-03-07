const mongoose = require("mongoose")


const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgURL:{
        type:String,
        required:[true,"imgURL is required for the creating an post"]
    },
    user:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"user id is required for creating an post"]
    }
})

const postModel = mongoose.model("post",postSchema)

module.exports= postModel