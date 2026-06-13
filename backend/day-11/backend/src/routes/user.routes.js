const express = require("express");
const  userController  = require("../controllers/user.controller");
const identifyUser = require("../middlewares/auth.middleware");
const userRouter = express.Router();

/**
 * @route    POST /api/users/follow/:userid
 * @desc     follow a user
 * @access   Private
 * @middleware identifyUser
 */
userRouter.post(
  "/follow/:username",
  identifyUser,
  userController.followUserController,
);

/**
 * @route    POST /api/users/unfollow/:userid
 * @desc     unfollow a user
 * @access   Private
 * @middleware identifyUser
 */
userRouter.post("/unfollow/:username",identifyUser,userController.unfollowUserController)

/**
 * @route patch /accept/:requestId [protected]
 * @description accept follow request
 * @access private
 * @middleware identifyUser
 */

userRouter.patch("/accept/:requestId",identifyUser,userController.acceptFollowRequestController)

/**
 * @route patch /reject/:requestId [protected]
 * @description reject follow request
 * @access private
 * @middleware identifyUser
 */

userRouter.patch("/reject/:requestId",identifyUser,userController.rejectFollowRequestController)


module.exports = userRouter;
