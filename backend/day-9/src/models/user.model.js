const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"Email already exists"]
    },
    password:String,
})


const UserModel=mongoose.model("user",userSchema)

module.exports=UserModel