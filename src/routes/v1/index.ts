import express, { Router } from "express";
import helmet from "helmet";
import cors from "../../middleware/cors.middleware";

// import codenamesApi from "./codenames.routes";
// import postsApi from "./posts.routes";
// import postCommentsApi from "./postComments.routes";
// import postLikesApi from "./postLikes.routes";
// import blogsApi from "./blog.routes";
// import blogCommentsApi from "./blogComments.routes";
// import blogLikesApi from "./blogLikes.routes";

// User imports
import { userRouter } from "./users.routes";
import { UserController } from "../../controllers/user.controller";
import { UserRepository } from "../../repositories/user.repository";
import { UserModel } from "../../models/mongo/user.model";

// Post imports
import { postRouter } from "./posts.routes";
import { PostController } from "../../controllers/post.controller";
import { PostRepository } from "../../repositories/post.repository";
import { PostModel } from "../../models/mongo/post.model";

// Blog imports
import { blogRouter } from "./blog.routes";
import { BlogController } from "../../controllers/blog.controller";
import { BlogRepository } from "../../repositories/blog.repository";
import { BlogModel } from "../../models/mongo/blog.model";

const router = Router();

router.use(express.json());
router.use(cors);
router.use(helmet());

/* =========== User routes =========== */
userRouter(router, new UserController(new UserRepository("User", UserModel)));
/* =========== Codename routes =========== */
// router.use("/", codenamesApi);
/* =========== Posts routes =========== */
postRouter(router, new PostController(new PostRepository("Post", PostModel)));
// /* =========== Post Comments routes =========== */
// router.use("/", postCommentsApi);
// /* =========== Post Likes routes =========== */
// router.use("/", postLikesApi);
// /* =========== Blogs routes =========== */
blogRouter(router, new BlogController(new BlogRepository("Blog", BlogModel)));
// /* =========== Blog Comments routes =========== */
// router.use("/", blogCommentsApi);
// /* =========== Blog Likes routes =========== */
// router.use("/", blogLikesApi);

export default router;
