const followModel =require("../models/follow.model")
const userModel = require("../models/user.model")


async function followUserController(req,res){
const followerUsername =req.user.username
const followeeUsername = req.params.username

if(followeeUsername == followerUsername){
    return res.status(400).json({
        message:"you cannot follow yourself"
    })

}
const isFolloweeExists = await userModel.findOne({
    username:followeeUsername 

})
if(!isFolloweeExists){
    return res.status(404).json({
        message:`user you are trying to follow does not exist`
    })
}



const isAlreadyFollowing = await followModel.findOne({
    follower:followerUsername,
    followee:followeeUsername
})

if(isAlreadyFollowing){
    return res.status(200).json({
        message:`You are already following ${followeeUsername}`,
        follow:isAlreadyFollowing

    })
}

const followRecord = await followModel.create({
    follower:followerUsername,
    followee:followeeUsername
})
res.status(201).json({
    message:`You are now following ${followeeUsername}`,
    follow:followRecord
})

}



async function unfollowUserController(req,res){
    const followerUsername = req.user.username
    const followeeUsername= req.params.username

    const isUserFollowing = await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername,
    })


    if(!isUserFollowing){
        return res.status(200).json({
             message:`You are not following ${followeeUsername}`

        })
    }
    await followModel.findByIdAndDelete(isUserFollowing._id)

        res.status(200).json({
            message:`You have unfollowed ${followeeUsername}`
        })

}
async function statusUserController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserStatus = await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername

    })

    if(!isUserStatus){
        return res.status(404).json({
            message:`No follow request found for ${followeeUsername}`,
            status:null
        })
    }
    
    if(isUserStatus.status !== "pending"){
        return res.status(200).json({
            message:`Request ${isUserStatus.status}`,
            status:isUserStatus.status
        })
    }
    return res.status(200).json({
        message:"Request is pending",
        status:isUserStatus.status
    })

}


module.exports={
    followUserController,unfollowUserController,statusUserController
}
