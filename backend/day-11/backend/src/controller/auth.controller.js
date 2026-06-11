const bcrypt = require("bcryptjs")
const userModel=require("../models/user.model")
const jwt = require("jsonwebtoken")
const config = require("../config/config")



async function registerController(req,res){
    const {email,username,password ,bio,profileImage}=req.body

    const isUserALreadyExists= await userModel.findOne({
        $or:[{email},{username}]
    })

    if(isUserALreadyExists){
        return res.status(409).json({
            message:"User already exist"+ (isUserALreadyExists.email==email? "Email already exists":"Username already exists")
        }) 
    }


    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        profileImage,
        bio,
        password:hash
    
    })



  const token = jwt.sign({
    id:user._id,



  },config.JWT_SECRET,
  {expiresIn:"1d"})

  res.cookie("token",token)

  res.status(201).json({
    message:"user register successfully",
    user:{
        email:user.email,
        username:user.username,
        bio:user.bio,
        profileImage:user.profileImage
    }
    
  })

}
 

async function loginController (req,res){
    const {email,password,username}=req.body
   

    
    const user=await userModel.findOne({
        $or:[{email:email},{username:username}] 
    })
    if(!user){
        return res.status(401).json({
            message:"invalid credentials"
        })
    }
    
   
    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){return res.status(401).json({
        message:"invalid credentials"
    })}

    const token = jwt.sign({
        id:user._id,
    },config.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token",token)
    res.status(200).json({
        message:"user login successfully",
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })

}

module.exports={
    registerController,
    loginController,
}