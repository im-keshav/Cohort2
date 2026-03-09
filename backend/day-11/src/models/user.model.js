const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"this username already taken"],
        required:[true,"User name is required"]
        },
    email:{
            type:String,
            unique:[true,"email already exists"],
            required:[true,"email is require"],

        },
    password:{
        type:String,
        required:[true,"Password is required"]
    },

    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/3ttv4oxy3/img.webp", 
    },
    

})

const userModel = mongoose.model("users",UserSchema)

module.exports = userModel