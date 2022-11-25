import { CustomException, ExceptionType } from "src/models/exceptions/custom.exception";
import { BlogDocument, BlogModel } from "src/models/mongo/blog.model";
import { Either, makeLeft, makeRight } from "src/utils/either";
import logger from "src/utils/logger";
import { BaseRepository } from "./base.repository";

export class BlogRepository extends BaseRepository<BlogDocument> {

    public async createComment(blogId: string, userId: string, comment: string): Promise<Either<CustomException, BlogDocument>> {
        try {
            const blog = await BlogModel.findByIdAndUpdate(blogId,
                { $push: {
                    comments: {
                        owner: userId,
                        comment
                    }
                }
                }, { new: true });
            if (!blog) {
                const error: CustomException = {
                    name: "Blog not found",
                    message: `Blog with id: ${blogId} does not exist`,
                    type: ExceptionType.NOT_FOUND
                };
                logger.error(`[BlogRepository] ${error.message}`);
                return makeLeft(error);
            }
            return makeRight(blog);
        } catch (error) {
            logger.error(error, "[BlogRepository] createComment failed");
            return makeLeft(error);
        }
    }

    public async updateComment(blogId: string, userId: string, commentId: string, comment: string): Promise<Either<CustomException, BlogDocument>> {
        try {
            const updatedBlog = await BlogModel.findOneAndUpdate(
                { id: blogId, "comments.id": commentId, "comments.owner": userId },
                { $set: { "comments.$.comment": comment } }
            );
            if (!updatedBlog) {
                const error: CustomException = {
                    name: "Blog not found",
                    message: `Blog with id: ${blogId} does not exist`,
                    type: ExceptionType.NOT_FOUND
                };
                logger.error(`[BlogRepository] ${error.message}`);
                return makeLeft(error);
            }
            return makeRight(updatedBlog);
        } catch (error) {
            logger.error(error, "[BlogRepository] updateComment failed");
            return makeLeft(error);
        }
    }

    public async deleteComment(blogId: string, userId: string, commentId: string): Promise<Either<CustomException, BlogDocument>> {
        try {
            const updatedBlog = await BlogModel.findOneAndUpdate(
                { id: blogId, "comments.id": commentId, "comments.owner": userId },
                { $pull: { comments: { id: commentId } } },
                { new: true }
            );
            if (!updatedBlog) {
                const error: CustomException = {
                    name: "Blog not found",
                    message: `Blog with id: ${blogId} does not exist`,
                    type: ExceptionType.NOT_FOUND
                };
                logger.error(`[BlogRepository] ${error.message}`);
                return makeLeft(error);
            }
            return makeRight(updatedBlog);
        } catch (error) {
            logger.error(error, "[BlogRepository] deleteComment failed");
            return makeLeft(error);
        }
    }

    public async like(blogId: string, userId: string, like: boolean): Promise<Either<CustomException, BlogDocument>> {
        try {
            const blog = await BlogModel.findById(blogId);
            if (!blog) {
                const error: CustomException = {
                    name: "Blog not found",
                    message: `Blog with id: ${blogId} does not exist`,
                    type: ExceptionType.NOT_FOUND
                };
                logger.error(`[BlogRepository] ${error.message}`);
                return makeLeft(error);
            }
            const like = blog.likes.find((like) => like.owner === userId);
            if (!like) {
                const updatedBlog = await BlogModel.findByIdAndUpdate(userId,
                    { $push: {
                        likes: {
                            owner: userId,
                            like,
                            date: new Date()
                        }
                    }
                    });
                return makeRight(updatedBlog);
            } else {
                const updatedBlog = await BlogModel.findByIdAndUpdate(userId,
                    { $pull: { likes: { owner: userId } } });
                return makeRight(updatedBlog);
            }
        } catch (error) {
            logger.error(error, "[BlogRepository] like failed");
            return makeLeft(error);
        }
    }

}

// const blog = await BlogModel.findById(blogId);
//             if (!blog) {
//                 const error: CustomException = {
//                     name: "Blog not found",
//                     message: `Blog with id: ${blogId} does not exist`,
//                     type: ExceptionType.NOT_FOUND
//                 };
//                 logger.error(`[BlogRepository] ${error.message}`);
//                 return makeLeft(error);
//             }
//             const comment = blog.comments.find((comment) => comment.id == commentId);
//             if (!comment) {
//                 const error: CustomException = {
//                     name: "Blog comment not found",
//                     message: `Blog comment with id: ${commentId} does not exist`,
//                     type: ExceptionType.NOT_FOUND
//                 };
//                 logger.error(`[BlogRepository] ${error.message}`);
//                 return makeLeft(error);
//             }
//             if (comment.owner != userId) {
//                 const error: CustomException = {
//                     name: "Blog comment wrong user",
//                     message: "Only creator of this comment can edit the comment",
//                     type: ExceptionType.NOT_OWNER
//                 };
//                 logger.error(`[BlogRepository] ${error.message}`);
//                 return makeLeft(error);
//             }