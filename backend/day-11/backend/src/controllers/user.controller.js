const followModel = require('../models/follow.model')
const userModel = require("../models/user.model")




async function followUserController(req,res){

    const followerUsername =req.user.username
    const followeeUsername = req.params.username


    if(followeeUsername == followerUsername){
        return res.status(400).json({
            message:"You cannot follow yourself"
        })

    }

    const ifFolloweeExists = await userModel.findOne({
        username:followeeUsername
    })
    if(!ifFolloweeExists){
        return res.status(404).json({
            message:"User not found"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    })


    if(isAlreadyFollowing){
        if(isAlreadyFollowing.status ==="pending"){
            return res.status(200).json({
                message:"follow request is already sent",
                follow:isAlreadyFollowing
            })  
        }
        if(isAlreadyFollowing.status ==="accepted"){
            return res.status(400).json({
                message:"you are already following this user"
            })
        }
        if(isAlreadyFollowing.status === "rejected"){

            isAlreadyFollowing.status = "pending"

            await isAlreadyFollowing.save()

            return res.status(200).json({
                message:"Follow request sent again",
                follow:isAlreadyFollowing
            })
        }
        
            


    }

    const followRecord = await followModel.create({
        follower:followerUsername,
        followee:followeeUsername
    })

    res.status(201).json({
        message:`${followerUsername} has now followed ${followeeUsername}`,
        follow:followRecord
    })

    


}


async function acceptFollowRequestController(req,res){
    const requestId = req.params.requestId
    const request = await followModel.findById(requestId)
    if(!request){
        return res.status(404).json({
            message:"Request not found"
        })
    }
    if(request.status !=="pending"){
        return res.status(400).json({
            message:"Request is not pending"
        })
    }
    request.status = "accepted"
    await request.save()
    return res.status(200).json({
        message:"Request accepted successfully"
    })
}

async function rejectFollowRequestController(req,res){
    const requestId = req.params.requestId
    const request = await followModel.findById(requestId)
    if(!request){
        return res.status(404).json({
            message:"Request not found"
        })
    }
    if(request.status !=="pending"){
        return res.status(400).json({
            message:"Request is not pending"
        })
    }
    request.status = "rejected"
    await request.save()
    return res.status(200).json({
        message:"Request rejected successfully"
    })

    

}

async function unfollowUserController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername

    })

    if(!isUserFollowing){
        return res.status(404).json({
            message:`You are not following ${followeeUsername}`
            
            
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)
    return res.status(200).json({
        message:`You have unfollowed ${followeeUsername}`
    })
   
}

module.exports={
    followUserController,
    unfollowUserController,
    acceptFollowRequestController,
    rejectFollowRequestController

    
}


