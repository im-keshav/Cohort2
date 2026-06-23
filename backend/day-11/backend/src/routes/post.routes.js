const express = require("express");

const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middleware");

/**
 * @route POST/api/posts [protected]
 * @description req.body = {caption,image-file}
 */

postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  postController.createPostController,
);

/**
 * @route GET/api/posts/ [protected]
 * @description returns all posts of users that are followed by the user that the request come form
 */
postRouter.get(
  "/", 
  identifyUser, 
  postController.getPostController
);

/**
 * @route GET/api/posts/details/:postId
 * @description returns an detail about specific post with the id.
 * also check whether the post belongs to the user that the request come form
 */

postRouter.get(
  "/details/:postId",
  identifyUser,
  postController.getPostDetailsController,
);


/**
 * @route POST /api/posts/like/:postId [protected]
 * @description like a post with he id provided in the request params.
 */

postRouter.post("/like/:postId",identifyUser,
  postController.likePostController,
)

/**
 * @routes GET /api/posts/feed
 * @description get all the post created on the db
 * @access private
 */
postRouter.get("/feed",identifyUser,postController.getFeedController)








module.exports = postRouter;
