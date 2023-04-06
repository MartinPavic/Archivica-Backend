import { CustomException } from "../models/exceptions/custom.exception";
import { BlogDocument, BlogModel } from "../models/mongo/blog.model";
import { Either, makeLeft, makeRight } from "../utils/either";
import logger from "../utils/logger";
import { BaseRepository } from "./base.repository";

export class BlogRepository extends BaseRepository<BlogDocument> {

	public async createComment(blogId: string, userId: string, comment: string): Promise<Either<CustomException, BlogDocument>> {
		try {
			const blog = await BlogModel.findByIdAndUpdate(blogId,
				{ $push: {
					comments: {
						owner: userId,
						comment,
					},
				},
				}, { new: true });
			if (!blog) {
				const error = CustomException.notFound(`Blog with id: ${blogId} does not exist`);
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
				{ _id: blogId, "comments._id": commentId, "comments.owner": userId },
				{ $set: { "comments.$.comment": comment } },
				{ new: true },
			);
			if (!updatedBlog) {
				const error = CustomException.notFound(`Blog with id: ${blogId} does not exist`);
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
				{ _id: blogId, "comments._id": commentId, "comments.owner": userId },
				{ $pull: { comments: { _id: commentId } } },
				{ new: true },
			);
			if (!updatedBlog) {
				const error = CustomException.notFound(`Blog with id: ${blogId} does not exist`);
				logger.error(`[BlogRepository] ${error.message}`);
				return makeLeft(error);
			}
			return makeRight(updatedBlog);
		} catch (error) {
			logger.error(error, "[BlogRepository] deleteComment failed");
			return makeLeft(error);
		}
	}

	public async like(blogId: string, userId: string, isLike: boolean): Promise<Either<CustomException, BlogDocument>> {
		try {
			const blog = await BlogModel.findById(blogId);
			if (!blog) {
				const error = CustomException.notFound(`Blog with id: ${blogId} does not exist`);
				logger.error(`[BlogRepository] ${error.message}`);
				return makeLeft(error);
			}
			const like = blog.likes.find((like) => like.owner.toString() === userId);
			if (!like) {
				const updatedBlog = await BlogModel.findByIdAndUpdate(blogId,
					{ $push: {
						likes: {
							owner: userId,
							liked: isLike,
							date: new Date(),
						},
					},
					}, { new: true });
				return makeRight(updatedBlog!);
			} else {
				const updatedBlog = await BlogModel.findOneAndUpdate(
					{ _id: blogId, "likes.owner": userId },
					{ $set: { "likes.$.liked": isLike, "likes.$.date": new Date() } }, { new: true });
				return makeRight(updatedBlog!);
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