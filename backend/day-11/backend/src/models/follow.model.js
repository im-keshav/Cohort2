const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
    follower:{
        type:String,
        required:[true,"follower username is required"]
    },
    followee:{
        type:String,
        required:[true,"following username is required"]
    },
    status:{
        type:String,
        default:"pending",
        enum:{
            values:["pending","accepted","rejected"],
            message:"Status can only be pending, accepted or rejected"
        }
    }   
},{
        timestamps:true
    })

    followSchema.index({follower:1,followee:1}, { unique: true })


    const followModel = mongoose.model("follows",followSchema)

    module.exports = followModel


