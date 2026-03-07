const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


async function registerController (req,res){
    const {username,email,password,bio,profileImage} = req.body
    // const isUserExistByEmail= await userModel.findOne({email})
    
    // if(isUserExistByEmail){
    //     return res.status(409).json({
    //         message:"User already exist with this mail"
    //     })
    // }

    // const isUserExistByUsername = await userModel.findOne({username})
    
    // if(isUserExistByUsername){
    //     return res.status(409).json({
    //         message:"User already exist with this Username"
    //     })
    // }

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
        
    })
    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"User Already Exist" + (isUserAlreadyExists.email == email? "email already exists":"Username already exists")
        })
    }

    const hash =await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password:hash
    })

    const token = jwt.sign({

        // user ka data hona chahiye
        // date unique hona chahiye
        id:user._id

    },process.env.JWT_SECRET,{expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(201).json({
        message:"User Registered Successfully",
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
    
}


async function loginController(req,res){
    const {username,email,password}=req.body

    const user = await userModel.findOne({
        $or:[
            {
                username:username
            },
            {
                email:email
            }
        ]
    })

    if(!user){
        return res.status(404).json({
            message:" user not found"
        })
    }

    

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(401).json({
            message:"password invalid"
        })
    }

    const token = jwt.sign(
        {
            is:user._id
        },process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(200).json({
        message:"User logged in successfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}

module.exports={
    registerController,
    loginController
} 