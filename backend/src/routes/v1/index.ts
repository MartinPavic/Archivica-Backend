import express, { Router } from "express";
import helmet from "helmet";
import cors from "src/middleware/cors.middleware";

import UserRouter from "./users.routes";
import codenamesApi from "./codenames.routes";
// import postsApi from "./posts.routes";
// import postCommentsApi from "./postComments.routes";
// import postLikesApi from "./postLikes.routes";
// import blogsApi from "./blog.routes";
// import blogCommentsApi from "./blogComments.routes";
// import blogLikesApi from "./blogLikes.routes";
import { UserController } from "src/controllers/user.controller";
import { UserRepository } from "src/repositories/user.repository";

const router = Router();

router.use(express.json());
router.use(cors);
router.use(helmet());

/* =========== User routes =========== */
UserRouter(router, new UserController(new UserRepository()));
/* =========== Codename routes =========== */
router.use("/", codenamesApi);
/* =========== Posts routes =========== */
// router.use("/", postsApi);
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
