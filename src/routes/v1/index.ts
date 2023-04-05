import express, { Router } from "express";
import helmet from "helmet";
import cors from "src/middleware/cors.middleware";

// import codenamesApi from "./codenames.routes";
// import postsApi from "./posts.routes";
// import postCommentsApi from "./postComments.routes";
// import postLikesApi from "./postLikes.routes";
// import blogsApi from "./blog.routes";
// import blogCommentsApi from "./blogComments.routes";
// import blogLikesApi from "./blogLikes.routes";

// User imports
import { userRouter } from "./users.routes";
import { UserController } from "src/controllers/user.controller";
import { UserRepository } from "src/repositories/user.repository";
import { UserModel } from "src/models/mongo/user.model";

// Post imports
import { postRouter } from "./posts.routes";
import { PostController } from "src/controllers/post.controller";
import { PostRepository } from "src/repositories/post.repository";
import { PostModel } from "src/models/mongo/post.model";

// Blog imports
import { blogRouter } from "./blog.routes";
import { BlogController } from "src/controllers/blog.controller";
import { BlogRepository } from "src/repositories/blog.repository";
import { BlogModel } from "src/models/mongo/blog.model";

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
