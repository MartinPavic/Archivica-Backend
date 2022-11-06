// import { Request, Router } from "express";
// import { ObjectId } from "mongodb";
// import { sendErrorResponse } from "src/utils";
// import _ from "lodash";
// import api from "../../constants";
// import Post from "src/models/mongo/post.model";

// const router = Router();

// router.post(api.POST_COMMENT, async (req: Request, res) => {
//     try {
//         const comment = _.pick(req.body, [
//             "postId",
//             "comment"
//         ]);

//         if (!ObjectId.isValid(comment.postId)) {
//             return res.status(404).send(`${comment.postId} id is not valid mongoose ObjectId`);
//         }
//         const post = await Post.findByIdAndUpdate(
//             { _id: comment.postId },
//             { $push: { comments: {
//                 // owner: req.user._id,
//                 comment: comment.comment
//             } } },
//             { new: true }
//         );

//         if (!post) {
//             return res.status(404).send(`Post with ${comment.postId} id does not exist`);
//         }
//         res.send({
//             success: true,
//             _id: post._id
//         });
//     } catch (ex) {
//         sendErrorResponse(res, ex);
//     }
// });

// router.patch(api.POST_COMMENT, async (req: Request, res) => {
//     try {
//         const updateComment = _.pick(req.body, [
//             "postId",
//             "comment_id",
//             "comment"
//         ]);

//         if (!ObjectId.isValid(updateComment.postId)) {
//             return res.status(404).send(`${updateComment.postId} id is not valid mongoose ObjectId`);
//         }

//         const post = await Post.findById(updateComment.postId);
//         if (!post) {
//             return res.status(404).send(`Post with ${updateComment.postId} id does not exist`);
//         }

//         const comment = post.comments.find((comment: any) => comment._id.toString() === updateComment.comment_id.toString());
//         if (!comment) {
//             return res.status(404).send(`Comment with ${updateComment.comment_id} id does not exist in post with id ${updateComment.postId}`);
//         }
//         // if (comment.owner.toString() !== req.user._id.toString()) {
//         //     return res.status(404).send("Only creator of this comment can edit the comment");
//         // }

//         await Post.updateOne(
//             { _id: updateComment.postId, "comments._id": updateComment.comment_id },
//             {
//                 $set: {
//                     "comments.$.comment": updateComment.comment
//                 }
//             }
//         );

//         res.send({
//             success: true
//             // _id: comment._id
//         });
//     } catch (ex) {
//         sendErrorResponse(res, ex);
//     }
// });

// router.delete(api.POST_COMMENT, async (req: Request, res) => {
//     try {
//         const delComment = _.pick(req.body, [
//             "postId",
//             "comment_id"
//         ]);

//         if (!ObjectId.isValid(delComment.postId)) {
//             return res.status(404).send(`${delComment.postId} id is not valid mongoose ObjectId`);
//         }

//         const post = await Post.findById(delComment.postId);
//         if (!post) {
//             return res.status(404).send(`Post with ${delComment.postId} id does not exist`);
//         }

//         const comment = post.comments.find((comment: any) => comment._id.toString() === delComment.comment_id.toString());
//         if (!comment) {
//             return res.status(404).send(`Comment with ${delComment.comment_id} id does not exist in post with id ${delComment.postId}`);
//         }
//         // if (comment.owner.toString() !== req.user._id.toString()) {
//         //     return res.status(404).send("Only creator of this comment can delete the comment");
//         // }

//         await Post.updateOne(
//             { _id: delComment.postId },
//             { $pull: { comments: { _id: delComment.comment_id } } },
//             { new: true }
//         );

//         res.send({
//             success: true
//             // _id: comment._id
//         });
//     } catch (ex) {
//         sendErrorResponse(res, ex);
//     }
// });

// export default router;