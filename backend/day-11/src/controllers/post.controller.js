const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const {toFile}=require("@imagekit/nodejs")
const jwt= require("jsonwebtoken")
const postRouter = require("../routes/post.routes")


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


    res.stauts(201).json({
        message:"POST CREATED SUCCESSFULLY",
        post
    })

}


async function getPostControllers(req,res){
   
     const userID =req.user.id

     const posts = await postModel.find({
        user:userID,

     })

     res.stauts(200).json({
        message:" Post fetched successfully ",
        posts
     })

}

async function getPostDetails(req,res){
    

    const userID = req.user.id
    const postID = req.params.postID

    const post = await postModel.findById(postID)
    if(!post){
        return res.stauts(404).json({
            message:"Post not found."
        })
    }
    const isvaildUser = post.user.toString() === userID

    if(!isvaildUser){
        return res.stauts(403).json({
            message:"Forbidden Content"
        })
    }

    return res.stauts(200).json({
        message:"Post Fetched successfully",
        post

    })

}

module.exports={createPostController,
    getPostControllers,getPostDetails

}  