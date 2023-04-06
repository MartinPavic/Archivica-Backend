import { Router, Request, Response } from "express";
import authenticate from "../../middleware/authenticaton.middleware";
import api from "../../constants";
import { match } from "../../utils/either";
import { sendErrorResponse } from "../../utils";
import { BlogController } from "../../controllers/blog.controller";
import { BlogCommentInput, BlogLikeInput, CreateBlogInput, UpdateBlogInput } from "../../models/api/blog";

export const blogRouter = (router: Router, controller: BlogController): void => {
	router.get(api.BLOGS, authenticate, async (request: Request, response: Response) => {
		try {
			const result = await controller.getAll(request.query);
			match(
				result,
				(getBlogsOutput) => response.json(getBlogsOutput),
				(error) => sendErrorResponse(response, error),
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
				(error) => sendErrorResponse(response, error),
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
				(createBlogOutput) => response.status(201).json(createBlogOutput),
				(error) => sendErrorResponse(response, error),
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
				(error) => sendErrorResponse(response, error),
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
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, error);
		}
	});

	router.post(api.BLOGS + "/:id" + "/comment", authenticate, async (request: Request, response: Response) => {
		try {
			const blogId = request.params.id;
			const user = response.locals.user;
			const input = request.body as BlogCommentInput;
			const result = await controller.createComment(blogId, user.id, input.comment);
			match(
				result,
				(commentBlogOutput) => response.status(201).json(commentBlogOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, error);
		}
	});

	router.put(api.BLOGS + "/:id" + "/comment" + "/:commentId", authenticate, async (request: Request, response: Response) => {
		try {
			const blogId = request.params.id;
			const user = response.locals.user;
			const commentId = request.params.commentId;
			const input = request.body as BlogCommentInput;
			const result = await controller.updateComment(blogId, user.id, commentId, input.comment);
			match(
				result,
				(commentBlogOutput) => response.json(commentBlogOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, error);
		}
	});

	router.delete(api.BLOGS + "/:id" + "/comment" + "/:commentId", authenticate, async (request: Request, response: Response) => {
		try {
			const blogId = request.params.id;
			const user = response.locals.user;
			const commentId = request.params.commentId;
			const result = await controller.deleteComment(blogId, user.id, commentId);
			match(
				result,
				(commentBlogOutput) => response.json(commentBlogOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, error);
		}
	});

	router.post(api.BLOGS + "/:id" + "/like", authenticate, async (request: Request, response: Response) => {
		try {
			const blogId = request.params.id;
			const user = response.locals.user;
			const input = request.body as BlogLikeInput;
			const result = await controller.like(blogId, user.id, input.like);
			match(
				result,
				(likeBlogOutput) => response.status(201).json(likeBlogOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, error);
		}
	});
};
