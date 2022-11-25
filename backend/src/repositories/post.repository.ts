import { CustomException, ExceptionType } from "src/models/exceptions/custom.exception";
import { PostDocument, PostModel } from "src/models/mongo/post.model";
import { Either, makeLeft, makeRight } from "src/utils/either";
import logger from "src/utils/logger";
import { BaseRepository } from "./base.repository";

export class PostRepository extends BaseRepository<PostDocument> {

    public async createComment(postId: string, userId: string, comment: string): Promise<Either<CustomException, PostDocument>> {
        try {
            const post = await PostModel.findByIdAndUpdate(postId,
                { $push: {
                    comments: {
                        owner: userId,
                        comment
                    }
                }
                }, { new: true });
            if (!post) {
                const error: CustomException = {
                    name: "post not found",
                    message: `post with id: ${postId} does not exist`,
                    type: ExceptionType.NOT_FOUND
                };
                logger.error(`[PostRepository] ${error.message}`);
                return makeLeft(error);
            }
            return makeRight(post);
        } catch (error) {
            logger.error(error, "[PostRepository] createComment failed");
            return makeLeft(error);
        }
    }

    public async updateComment(postId: string, userId: string, commentId: string, comment: string): Promise<Either<CustomException, PostDocument>> {
        try {
            const updatedPost = await PostModel.findOneAndUpdate(
                { id: postId, "comments.id": commentId, "comments.owner": userId },
                { $set: { "comments.$.comment": comment } }
            );
            if (!updatedPost) {
                const error: CustomException = {
                    name: "Post not found",
                    message: `Post with id: ${postId} does not exist`,
                    type: ExceptionType.NOT_FOUND
                };
                logger.error(`[PostRepository] ${error.message}`);
                return makeLeft(error);
            }
            return makeRight(updatedPost);
        } catch (error) {
            logger.error(error, "[PostRepository] updateComment failed");
            return makeLeft(error);
        }
    }

    public async deleteComment(postId: string, userId: string, commentId: string): Promise<Either<CustomException, PostDocument>> {
        try {
            const updatedPost = await PostModel.findOneAndUpdate(
                { id: postId, "comments.id": commentId, "comments.owner": userId },
                { $pull: { comments: { id: commentId } } },
                { new: true }
            );
            if (!updatedPost) {
                const error: CustomException = {
                    name: "Post not found",
                    message: `Post with id: ${postId} does not exist`,
                    type: ExceptionType.NOT_FOUND
                };
                logger.error(`[PostRepository] ${error.message}`);
                return makeLeft(error);
            }
            return makeRight(updatedPost);
        } catch (error) {
            logger.error(error, "[PostRepository] deleteComment failed");
            return makeLeft(error);
        }
    }

    public async like(postId: string, userId: string, like: boolean): Promise<Either<CustomException, PostDocument>> {
        try {
            const post = await PostModel.findById(postId);
            if (!post) {
                const error: CustomException = {
                    name: "Post not found",
                    message: `Post with id: ${postId} does not exist`,
                    type: ExceptionType.NOT_FOUND
                };
                logger.error(`[PostRepository] ${error.message}`);
                return makeLeft(error);
            }
            const like = post.likes.find((like) => like.owner === userId);
            if (!like) {
                const updatedPost = await PostModel.findByIdAndUpdate(userId,
                    { $push: {
                        likes: {
                            owner: userId,
                            like,
                            date: new Date()
                        }
                    }
                    });
                return makeRight(updatedPost);
            } else {
                const updatedPost = await PostModel.findByIdAndUpdate(userId,
                    { $pull: { likes: { owner: userId } } });
                return makeRight(updatedPost);
            }
        } catch (error) {
            logger.error(error, "[PostRepository] like failed");
            return makeLeft(error);
        }
    }
}