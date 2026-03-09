const express = require('express')
const UserController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router()



// "@route POST /api/users/follow/:userid"
// "@description follow a user"
// "@access Private"
userRouter.post("/follow/:userid",identifyUser
    ,UserController.followUserController)
    



module.exports=userRouter;
