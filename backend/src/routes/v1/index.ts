import express, { Router } from "express";
import helmet from "helmet";
import cors from "src/middleware/cors.middleware";

import userRouter from "./users.routes";
// import codenamesApi from "./codenames.routes";
// import postsApi from "./posts.routes";
// import postCommentsApi from "./postComments.routes";
// import postLikesApi from "./postLikes.routes";
// import blogsApi from "./blog.routes";
// import blogCommentsApi from "./blogComments.routes";
// import blogLikesApi from "./blogLikes.routes";
import { UserController } from "src/controllers/user.controller";
import { UserRepository } from "src/repositories/user.repository";
import { UserModel } from "src/models/mongo/user.model";
import { postRouter } from "./posts.routes";
import { PostController } from "src/controllers/post.controller";
import { PostRepository } from "src/repositories/post.repository";
import { PostModel } from "src/models/mongo/post.model";

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
// router.use("/", blogsApi);
// /* =========== Blog Comments routes =========== */
// router.use("/", blogCommentsApi);
// /* =========== Blog Likes routes =========== */
// router.use("/", blogLikesApi);

export default router;
