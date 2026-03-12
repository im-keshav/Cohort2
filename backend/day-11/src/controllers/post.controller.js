const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const {toFile}=require("@imagekit/nodejs")
const likeModel = require("../models/like.model")

const imagekit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY 

})



async function createPostController(req,res){

   


    const file= await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"Test",
        folder:"Insta-clone"
    })
     
    const post= await postModel.create({
        caption:req.body.caption,
        imgURL:file.url,
        user:req.user.id
    })


    res.status(201).json({
        message:"POST CREATED SUCCESSFULLY",
        post
    })

}


async function getPostControllers(req,res){
   
     const userID =req.user.id

     const posts = await postModel.find({
        user:userID,

     })

     res.status(200).json({
        message:" Post fetched successfully ",
        posts
     })

}

async function getPostDetails(req,res){
    

    const userID = req.user.id
    const postID = req.params.postId

    const post = await postModel.findById(postID)
    if(!post){
        return res.status(404).json({
            message:"Post not found."
        })
    }
    const isvaildUser = post.user.toString() === userID

    if(!isvaildUser){
        return res.status(403).json({
            message:"Forbidden Content"
        })
    }

    return res.status(200).json({
        message:"Post Fetched successfully",
        post

    })

}

async function likePostController(req,res){
    const username=req.user.username
    const postId = req.params.postId

    const post= await postModel.findById(postId)

    if(!post){
        return res.status(400).json({
            message:"Post not found"
        })
    }
    const like = await likeModel.create({
        post:postId,
        user:username

    })
    res.status(200).json({
        message:"Post liked Successfully",
        like 
    })
}



 
module.exports={
    createPostController,
    getPostControllers,
    getPostDetails,
    likePostController

}  
