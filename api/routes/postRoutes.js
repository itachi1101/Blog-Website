const { Router } = require("express");
const postController = require("../controller/postcontroller");
const auth = require("../middlewares/authMiddleware");
const router = Router();

router.post("/createPost", postController.blog_post);
router.get("/allposts", postController.blog_get);
router.get("/post/:id", postController.blog_getByid);
router.get("/post/", postController.blog_usersPost);
router.delete("/post/:id", postController.blog_deletePost);
router.put("/post/:id",postController.blog_updatePost)
module.exports = router;
