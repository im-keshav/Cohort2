const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"username is already exist"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email is already exist"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        select:false
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/chcg9fzem/default-image.jpg?updatedAt=1777377740447"

    }
},{
    timestamps:true
})


const userModel= mongoose.model("Users",userSchema)

module.exports = userModel