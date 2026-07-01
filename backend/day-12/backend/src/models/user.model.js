const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Username is required"],
        unique:[true,"Username must be unique"]
        
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:[true,"Email is already taken"]
    },
    password:{  
        type:String,
        required:[true, "Password is required"],
        minlength:[6,"Password must be atleast 6 characters long"]
    }
   
})


// userSchema.pre("save",function(next){})
// userSchema.post("save",function(next){})
const userModel = mongoose.model("user",userSchema)

module.exports = userModel