// import { Router } from "express";
// import _ from "lodash";
// import { ObjectId } from "mongodb";
// import { sendErrorResponse } from "utils";
// import { IRequest } from "src/models/api/request";
// import api from "../../constants";
// import authenticate from "src/middleware/authenticate";
// import Blog from "../../models/mongo/blog.model";

// const router = Router();

// router.post(api.BLOG_LIKE, authenticate, async (req: IRequest, res) => {
//     try {
//         const newLike = _.pick(req.body, [
//             "blogId",
//             "liked"
//         ]);

//         if (!ObjectId.isValid(newLike.blogId)) {
//             return res.status(404).send(`${newLike.blogId} id is not valid mongoose ObjectId`);
//         }

//         const blog = await Blog.findById(newLike.blogId);
//         if (!blog) {
//             return res.status(404).send(`Blog with ${newLike.blogId} id does not exist`);
//         }

//         const like = blog.likes.find((like: any) => like.owner.toString() === req.user._id.toString());
//         if (!like && newLike.liked !== null) {
//             await Blog.findByIdAndUpdate(
//                 { _id: newLike.blogId },
//                 { $push: { likes: {
//                     owner: req.user._id,
//                     liked: newLike.liked
//                 } } },
//                 { new: true }
//             );
//         } else if (newLike.liked === null) {
//             await Blog.updateOne(
//                 { _id: newLike.blogId },
//                 { $pull: { likes: { owner: req.user._id } } },
//                 { new: true }
//             );
//         } else {
//             await Blog.updateOne(
//                 { _id: newLike.blogId, "likes.owner": req.user._id },
//                 {
//                     $set: {
//                         "likes.$.liked": newLike.liked
//                     }
//                 }
//             );
//         }

//         res.send({
//             success: true,
//             _id: blog._id
//         });
//     } catch (ex) {
//         sendErrorResponse(res, ex);
//     }
// });

// export default router;