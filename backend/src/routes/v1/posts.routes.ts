import { Router, Request, Response } from "express";
// import _ from "lodash";
// import { ObjectId } from "mongodb";
import { sendErrorResponse } from "src/utils";
import api from "../../constants";
// import authenticate from "src/middleware/authenticaton.middleware";
import { PostController } from "src/controllers/post.controller";
import { match } from "src/utils/either";
import authenticate from "src/middleware/authenticaton.middleware";
import { CreatePostInput, UpdatePostInput } from "src/models/api/post";

export const postRouter = (router: Router, controller: PostController): void => {

    router.get(api.POSTS, authenticate, async (request: Request, response: Response) => {
        try {
            const result = await controller.getAll(request.query);
            match(
                result,
                (getPostsOutput) => response.json(getPostsOutput),
                (error) => sendErrorResponse(response, error)
            );
        } catch (error) {
            sendErrorResponse(response, error);
        }
    });

    router.get(api.POSTS + "/:id", authenticate, async (request: Request, response: Response) => {
        try {
            const id = request.params.id;
            const result = await controller.getById(id);
            match(
                result,
                (getPostOutput) => response.json(getPostOutput),
                (error) => sendErrorResponse(response, error)
            );
        } catch (error) {
            sendErrorResponse(response, error);
        }
    });

    router.post(api.POSTS, authenticate, async (request: Request, response: Response) => {
        try {
            const input = request.body as CreatePostInput;
            const result = await controller.create(input);
            match(
                result,
                (createPostOutput) => response.json(createPostOutput),
                (error) => sendErrorResponse(response, error)
            );
        } catch (error) {
            sendErrorResponse(response, error);
        }
    });

    router.put(api.POSTS + "/:id", authenticate, async (request: Request, response: Response) => {
        try {
            const input = request.body as UpdatePostInput;
            const id = request.params.id;
            const result = await controller.update(id, input);
            match(
                result,
                (updatePostOutput) => response.json(updatePostOutput),
                (error) => sendErrorResponse(response, error)
            );
        } catch (error) {
            sendErrorResponse(response, error);
        }
    });

    router.delete(api.POSTS + "/:id", authenticate, async (request: Request, response: Response) => {
        try {
            const id = request.params.id;
            const result = await controller.delete(id);
            match(
                result,
                (deletePostOutput) => response.json(deletePostOutput),
                (error) => sendErrorResponse(response, error)
            );
        } catch (error) {
            sendErrorResponse(response, error);
        }
    });
};

//     // Authenticated routes
//     router.post(api.POST, authenticate, async (req: IRequest, res) => {
//         try {
//             const newPost = await Post.create({
//                 owner: req.user._id,
//                 ...req.body
//             });

//             res.send({
//                 success: true,
//                 _id: newPost._id
//             });
//         } catch (ex) {
//             sendErrorResponse(res, ex);
//         }
//     });

//     router.patch(api.POST, authenticate, async (req: IRequest, res) => {
//         try {
//             const updatedPost = _.pick(req.body, [
//                 "_id",
//                 "name",
//                 "photoPath",
//                 "description",
//                 "architect",
//                 "city",
//                 "subAge",
//                 "gallery"
//             ]);

//             if (!ObjectId.isValid(updatedPost._id)) {
//                 return res.status(404).send(`${updatedPost._id} id is not valid mongoose ObjectId`);
//             }
//             const post = await Post.findById(updatedPost._id);

//             if (!post) {
//                 return res.status(404).send(`Post with ${updatedPost._id} id does not exist`);
//             }

//             if (post.owner.toString() !== req.user._id.toString()) {
//                 return res.status(404).send("Only creator of this post can edit the post");
//             }

//             await Post.findByIdAndUpdate(
//                 { _id: updatedPost._id },
//                 updatedPost,
//                 { new: true }
//             );

//             res.send({
//                 success: true,
//                 _id: post._id
//             });
//         } catch (ex) {
//             sendErrorResponse(res, ex);
//         }
//     });

//     router.delete(api.POST + "/:id", authenticate, async (req: IRequest, res) => {
//         try {
//             const id = req.params.id;

//             if (!ObjectId.isValid(id)) {
//                 return res.status(404).send(`${id} id is not valid mongoose ObjectId`);
//             }

//             const post = await Post.findById(id);
//             if (!post) {
//                 return res.status(404).send(`Post with ${id} id does not exist`);
//             }

//             if (post.owner.toString() !== req.user._id.toString()) {
//                 return res.status(404).send("Only creator of this post can delete the post");
//             }

//             await Post.findByIdAndRemove(id);
//             res.send({
//                 success: true,
//                 _id: post._id
//             });
//         } catch (ex) {
//             sendErrorResponse(res, ex);
//         }
//     });
// };

// export default router;