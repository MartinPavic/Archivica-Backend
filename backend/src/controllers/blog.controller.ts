import { CreateBlogCommentOutput, UpdateBlogCommentOutput } from "src/models/api/blog";
import { BlogDomain } from "src/models/domain/blog";
import { CustomException } from "src/models/exceptions/custom.exception";
import { BlogDocument } from "src/models/mongo/blog.model";
import { BlogRepository } from "src/repositories/blog.repository";
import { Either, makeLeft, map } from "src/utils/either";
import logger from "src/utils/logger";
import { BaseController } from "./base.controller";

export class BlogController extends BaseController<BlogDocument, BlogDomain> {

    blogRespository: BlogRepository;

    constructor(blogRepository: BlogRepository) {
        super(blogRepository);
        this.blogRespository = blogRepository;
    }

    public async createComment(blogId: string, userId: string, comment: string): Promise<Either<CustomException, CreateBlogCommentOutput>> {
        try {
            const either = await this.blogRespository.createComment(blogId, userId, comment);
            return map(either, (blog) => "Successfully created comment");
        } catch (error) {
            logger.error(error, "[BlogController] createComment failed");
            return makeLeft(error);
        }
    }

    public async updateComment(blogId: string, userId: string, commentId: string, comment: string): Promise<Either<CustomException, UpdateBlogCommentOutput>> {
        try {
            const either = await this.blogRespository.updateComment(blogId, userId, commentId, comment);
            return map(either, (blog) => "Successfully updated comment");
        } catch (error) {
            logger.error(error, "[BlogController] updateComment failed");
            return makeLeft(error);
        }
    }

    public async deleteComment(blogId: string, userId: string, commentId: string): Promise<Either<CustomException, string>> {
        try {
            const either = await this.blogRespository.deleteComment(blogId, userId, commentId);
            return map(either, (blog) => "Successfully delete comment");
        } catch (error) {
            logger.error(error, "[BlogController] deleteComment failed");
            return makeLeft(error);
        }
    }

    public async like(blogId: string, userId: string, like: boolean): Promise<Either<CustomException, string>> {
        try {
            const either = await this.blogRespository.like(blogId, userId, like);
            return map(either, (blog) => "Successfully liked blog");
        } catch (error) {
            logger.error(error, "[BlogController] like failed");
            return makeLeft(error);
        }
    }

}