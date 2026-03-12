const express = require('express')
const UserController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router()



// "@route POST /api/users/follow/:userid"
// "@description follow a user"
// "@access Private"
userRouter.post("/follow/:username",identifyUser
    ,UserController.followUserController)

// "@route POST /api/users/unfollow/:userid"
// "@description Unfollow a user "
// "@access Private"

userRouter.post("/unfollow/:username",identifyUser,UserController.unfollowUserController)

// "@route Post/api/users/status/:userid"
// "@description check Status"
// "@access private"

userRouter.post("/status/:username",identifyUser,UserController.statusUserController)


module.exports=userRouter;
