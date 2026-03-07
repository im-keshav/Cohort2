const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")



// "POST/api/posts [protected]"
// -req.body={caption,image-file}
postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController)


// "GET/api/posts/[protected]"
postRouter.get("/",identifyUser,postController.getPostControllers)

// "GET/api/posts/details/:postid "
postRouter.get("/details/:postID",identifyUser,postController.getPostDetails)

module.exports=postRouter