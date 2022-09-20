import express, { Router } from 'express';
import helmet from 'helmet';
import cors from 'middleware/cors';

import usersApi from './users';
import codenamesApi from './codenames';
import postsApi from './posts';
import postCommentsApi from './postComments';
import postLikesApi from './postLikes';
import blogsApi from './blogs';
import blogCommentsApi from './blogComments';
import blogLikesApi from './blogLikes';

const router = Router();

router.use(express.json());
router.use(cors);
router.use(helmet());

/* =========== User routes =========== */
router.use('/', usersApi);
/* =========== Codename routes =========== */
router.use('/', codenamesApi);
/* =========== Posts routes =========== */
router.use('/', postsApi);
/* =========== Post Comments routes =========== */
router.use('/', postCommentsApi);
/* =========== Post Likes routes =========== */
router.use('/', postLikesApi);
/* =========== Blogs routes =========== */
router.use('/', blogsApi);
/* =========== Blog Comments routes =========== */
router.use('/', blogCommentsApi);
/* =========== Blog Likes routes =========== */
router.use('/', blogLikesApi);

export default router;
