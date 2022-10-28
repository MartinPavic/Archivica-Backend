// import { Router, Request } from "express";
// import { sendErrorResponse } from "utils";
// import { ObjectId } from "mongodb";
// import authenticate from "src/middleware/authenticate";
// import _ from "lodash";
// import api from "../../constants";
// import Blog from "../../models/mongo/blog.model";
// import paginate from "src/middleware/paginateFilterSort";

// const router = Router();

// // Unauthenticated routes
// router.get(api.BLOGS, paginate(Blog), async (_req, res) => {
//     try {
//         res.json(res.locals.paginationResult);
//     } catch (ex) {
//         sendErrorResponse(res, ex);
//     }
// });

// router.get(api.BLOG + "/:id", async (req, res) => {
//     try {
//         const id = req.params.id;
//         if (!ObjectId.isValid(id)) {
//             return res.status(404).send(`${id} id is not valid mongoose ObjectId`);
//         }

//         const blog = await Blog.findById(id);
//         if (!blog) {
//             return res.status(404).send(`Blog with ${id} id does not exist`);
//         }
//         res.send(blog);
//     } catch (ex) {
//         sendErrorResponse(res, ex);
//     }
// });

// // Authenticated routes
// router.post(api.BLOG, authenticate, async (req: Request, res) => {
//     try {
//         const newBlog = await Blog.create({
//             owner: req.user._id,
//             ...req.body
//         });

//         res.send({
//             success: true,
//             _id: newBlog._id
//         });
//     } catch (ex) {
//         sendErrorResponse(res, ex);
//     }
// });

// router.patch(api.BLOG, authenticate, async (req: IRequest, res) => {
//     try {
//         const updatedBlog = _.pick(req.body, [
//             "_id",
//             "name",
//             "description",
//             "photoPath",
//             "readingTime",
//             "gallery",
//             "connectedPosts"
//         ]);

//         if (!ObjectId.isValid(updatedBlog._id)) {
//             return res.status(404).send(`${updatedBlog._id} id is not valid mongoose ObjectId`);
//         }
//         const blog = await Blog.findById(updatedBlog._id);

//         if (!blog) {
//             return res.status(404).send(`Blog with ${updatedBlog._id} id does not exist`);
//         }

//         if (blog.owner.toString() !== req.user._id.toString()) {
//             return res.status(404).send("Only creator of this blog can edit the blog");
//         }

//         await Blog.findByIdAndUpdate(
//             { _id: updatedBlog._id },
//             updatedBlog,
//             { new: true }
//         );

//         res.send({
//             success: true,
//             _id: blog._id
//         });
//     } catch (ex) {
//         sendErrorResponse(res, ex);
//     }
// });

// router.delete(api.BLOG + "/:id", authenticate, async (req: IRequest, res) => {
//     try {
//         const id = req.params.id;

//         if (!ObjectId.isValid(id)) {
//             return res.status(404).send(`${id} id is not valid mongoose ObjectId`);
//         }

//         const blog = await Blog.findById(id);
//         if (!blog) {
//             return res.status(404).send(`Blog with ${id} id does not exist`);
//         }

//         if (blog.owner.toString() !== req.user._id.toString()) {
//             return res.status(404).send("Only creator of this blog can delete the blog");
//         }

//         await Blog.findByIdAndRemove(id);
//         res.send({
//             success: true,
//             _id: blog._id
//         });
//     } catch (ex) {
//         sendErrorResponse(res, ex);
//     }
// });

// export default router;