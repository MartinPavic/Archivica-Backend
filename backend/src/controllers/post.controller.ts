import { CreatePostCommentOutput, UpdatePostCommentOutput } from "src/models/api/post";
import { PostDomain } from "src/models/domain/post";
import { CustomException } from "src/models/exceptions/custom.exception";
import { PostDocument } from "src/models/mongo/post.model";
import { PostRepository } from "src/repositories/post.repository";
import { Either, makeLeft, map } from "src/utils/either";
import logger from "src/utils/logger";
import { BaseController } from "./base.controller";

export class PostController extends BaseController<PostDocument, PostDomain> {

    postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        super(postRepository);
        this.postRepository = postRepository;
    }

    public async createComment(postId: string, userId: string, comment: string): Promise<Either<CustomException, CreatePostCommentOutput>> {
        try {
            const either = await this.postRepository.createComment(postId, userId, comment);
            return map(either, (post) => "Successfully created comment");
        } catch (error) {
            logger.error(error, "[PostController] createComment failed");
            return makeLeft(error);
        }
    }

    public async updateComment(postId: string, userId: string, commentId: string, comment: string): Promise<Either<CustomException, UpdatePostCommentOutput>> {
        try {
            const either = await this.postRepository.updateComment(postId, userId, commentId, comment);
            return map(either, (post) => "Successfully updated comment");
        } catch (error) {
            logger.error(error, "[PostController] updateComment failed");
            return makeLeft(error);
        }
    }

    public async deleteComment(postId: string, userId: string, commentId: string): Promise<Either<CustomException, string>> {
        try {
            const either = await this.postRepository.deleteComment(postId, userId, commentId);
            return map(either, (post) => "Successfully deleted comment");
        } catch (error) {
            logger.error(error, "[PostController] deleteComment failed");
            return makeLeft(error);
        }
    }

    public async like(blogId: string, userId: string, like: boolean): Promise<Either<CustomException, string>> {
        try {
            const either = await this.postRepository.like(blogId, userId, like);
            return map(either, (blog) => "Successfully liked post");
        } catch (error) {
            logger.error(error, "[BlogController] like failed");
            return makeLeft(error);
        }
    }

}