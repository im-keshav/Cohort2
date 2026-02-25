const express = require("express")
const UserModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")


const authRouter = express.Router()

authRouter.post("/register",async (req,res)=>{
    const {name,email,password}=req.body

    const isUserAlreadyExist = await UserModel.findOne({email})

    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"User already exists"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")


    const user= await UserModel.create({
        name ,email,password:hash
    })


    const token=jwt.sign({
        id:user._id,
        email:user.email
    }
    ,process.env.JWT_SECRET_KEY,
)
   
res.cookie("token",token)


res.status(201).json({
        message:"User registered successfully",
        user,
        token
    })      
    
})

authRouter.post("/protected",async(req,res)=>{
    console.log(req.cookies);
    res.status(200).json({
        message:"Protected route accessed successfully"

    })
    
})
authRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body

    const user = await UserModel.findOne({email})
    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }

    const isPasswordMatch = user.password === crypto.createHash("md5").update(password).digest("hex")
    if(!isPasswordMatch){
        return res.status(401).json({
            message:"Invalid credentials"
        })
    }
    const token=jwt.sign({
        id:user._id,},
        process.env.JWT_SECRET_KEY)
        res.cookie("token",token)

        res.status(200).json({
            message:"Login successful",
            user,
            token
        }) 
    })



   
    module.exports=authRouter