import { Router, Request, Response } from "express";
import authenticate from "../../middleware/authenticaton.middleware";
import api from "../../constants";
import { match } from "src/utils/either";
import { sendErrorResponse } from "src/utils";
import { BlogController } from "src/controllers/blog.controller";
import { CreateBlogInput, UpdateBlogInput } from "src/models/api/blog";

export const blogRouter = (router: Router, controller: BlogController) => {
    router.get(api.BLOGS, authenticate, async (request: Request, response: Response) => {
        try {
            const result = await controller.getAll(request.query);
            match(
                result,
                (getBlogsOutput) => response.json(getBlogsOutput),
                (error) => sendErrorResponse(response, error)
            );
        } catch (error) {
            sendErrorResponse(response, error);
        }
    });

    router.get(api.BLOGS + "/:id", authenticate, async (request: Request, response: Response) => {
        try {
            const id = request.params.id;
            const result = await controller.getById(id);
            match(
                result,
                (getBlogOutput) => response.json(getBlogOutput),
                (error) => sendErrorResponse(response, error)
            );
        } catch (error) {
            sendErrorResponse(response, error);
        }
    });

    router.post(api.BLOGS, authenticate, async (request: Request, response: Response) => {
        try {
            const input = request.body as CreateBlogInput;
            const result = await controller.create(input);
            match(
                result,
                (createBlogOutput) => response.json(createBlogOutput),
                (error) => sendErrorResponse(response, error)
            );
        } catch (error) {
            sendErrorResponse(response, error);
        }
    });

    router.put(api.BLOGS + "/:id", authenticate, async (request: Request, response: Response) => {
        try {
            const input = request.body as UpdateBlogInput;
            const id = request.params.id;
            const result = await controller.update(id, input);
            match(
                result,
                (updateBlogOutput) => response.json(updateBlogOutput),
                (error) => sendErrorResponse(response, error)
            );
        } catch (error) {
            sendErrorResponse(response, error);
        }
    });

    router.delete(api.BLOGS + "/:id", authenticate, async (request: Request, response: Response) => {
        try {
            const id = request.params.id;
            const result = await controller.delete(id);
            match(
                result,
                (deleteBlogOutput) => response.json(deleteBlogOutput),
                (error) => sendErrorResponse(response, error)
            );
        } catch (error) {
            sendErrorResponse(response, error);
        }
    });
};

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