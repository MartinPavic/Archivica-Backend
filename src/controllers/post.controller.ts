/* eslint-disable no-mixed-spaces-and-tabs */
import { getErrorMessage } from "../utils/error";
import { CreatePostCommentOutput, UpdatePostCommentOutput } from "../models/api/post";
import { PostDomain } from "../models/domain/post";
import { CustomException } from "../models/exceptions/custom.exception";
import { PostDocument } from "../models/mongo/post.model";
import { PostRepository } from "../repositories/post.repository";
import { Either, makeLeft, map } from "../utils/either";
import logger from "../utils/logger";
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
    		return makeLeft(new CustomException(getErrorMessage(error)));
    	}
	}

	public async updateComment(postId: string, userId: string, commentId: string, comment: string): Promise<Either<CustomException, UpdatePostCommentOutput>> {
    	try {
    		const either = await this.postRepository.updateComment(postId, userId, commentId, comment);
    		return map(either, (post) => "Successfully updated comment");
    	} catch (error) {
    		logger.error(error, "[PostController] updateComment failed");
    		return makeLeft(new CustomException(getErrorMessage(error)));
    	}
	}

	public async deleteComment(postId: string, userId: string, commentId: string): Promise<Either<CustomException, string>> {
    	try {
    		const either = await this.postRepository.deleteComment(postId, userId, commentId);
    		return map(either, (post) => "Successfully deleted comment");
    	} catch (error) {
    		logger.error(error, "[PostController] deleteComment failed");
    		return makeLeft(new CustomException(getErrorMessage(error)));
    	}
	}

	public async like(postId: string, userId: string, like: boolean): Promise<Either<CustomException, string>> {
    	try {
    		const either = await this.postRepository.like(postId, userId, like);
    		return map(either, (post) => "Successfully liked post");
    	} catch (error) {
    		logger.error(error, "[PostController] like failed");
    		return makeLeft(new CustomException(getErrorMessage(error)));
    	}
	}

}