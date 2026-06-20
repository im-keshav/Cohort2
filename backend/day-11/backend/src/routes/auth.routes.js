const express = require("express");
const authController = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middleware");

const authRouter = express.Router();

/**
 * @route POST/api/auth/register
 * @desc register user
 */
authRouter.post("/register", authController.registerController);
/**
 * @route POST/api/auth/login
 * @desc login user
 */
authRouter.post("/login", authController.loginController);
/**
 * @route GET/api/auth/get-me
 * @desc get the current user
 * @access Private
 */
authRouter.get("/get-me",identifyUser, authController.getMeController)

module.exports =  authRouter ;
