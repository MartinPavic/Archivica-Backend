// import { Router } from "express";
// import _ from "lodash";
// import { ObjectId } from "mongodb";
// import { sendErrorResponse } from "utils";
// import { IRequest } from "../../../interfaces/express";
// import api from "../../constants";
// import authenticate from "src/middleware/authenticate";
// import Post from "../../models/mongo/post.model";

// const router = Router();

// router.post(api.POST_LIKE, authenticate, async (req: IRequest, res) => {
//     try {
//         const newLike = _.pick(req.body, [
//             "postId",
//             "liked"
//         ]);

//         if (!ObjectId.isValid(newLike.postId)) {
//             return res.status(404).send(`${newLike.postId} id is not valid mongoose ObjectId`);
//         }

//         const post = await Post.findById(newLike.postId);
//         if (!post) {
//             return res.status(404).send(`Post with ${newLike.postId} id does not exist`);
//         }

//         const like = post.likes.find((like: any) => like.owner.toString() === req.user._id.toString());
//         if (!like && newLike.liked !== null) {
//             await Post.findByIdAndUpdate(
//                 { _id: newLike.postId },
//                 { $push: { likes: {
//                     owner: req.user._id,
//                     liked: newLike.liked
//                 } } },
//                 { new: true }
//             );
//         } else if (newLike.liked === null) {
//             await Post.updateOne(
//                 { _id: newLike.postId },
//                 { $pull: { likes: { owner: req.user._id } } },
//                 { new: true }
//             );
//         } else {
//             await Post.updateOne(
//                 { _id: newLike.postId, "likes.owner": req.user._id },
//                 {
//                     $set: {
//                         "likes.$.liked": newLike.liked
//                     }
//                 }
//             );
//         }

//         res.send({
//             success: true,
//             _id: post._id
//         });
//     } catch (ex) {
//         sendErrorResponse(res, ex);
//     }
// });

// export default router;