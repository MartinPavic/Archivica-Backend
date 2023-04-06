import { Router, Request, Response } from "express";
import { sendErrorResponse } from "../../utils";
import api from "../../constants";
import { PostController } from "../../controllers/post.controller";
import { match } from "../../utils/either";
import authenticate from "../../middleware/authenticaton.middleware";
import { CreatePostInput, PostCommentInput, PostLikeInput, UpdatePostInput } from "../../models/api/post";

export const postRouter = (router: Router, controller: PostController): void => {
	router.get(api.POSTS, authenticate, async (request: Request, response: Response) => {
		try {
			const result = await controller.getAll(request.query);
			match(
				result,
				(getPostsOutput) => response.json(getPostsOutput),
				(error) => sendErrorResponse(response, error),
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
				(error) => sendErrorResponse(response, error),
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
				(createPostOutput) => response.status(201).json(createPostOutput),
				(error) => sendErrorResponse(response, error),
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
				(error) => sendErrorResponse(response, error),
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
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, error);
		}
	});

	router.post(api.POSTS + "/:id" + "/comment", authenticate, async (request: Request, response: Response) => {
		try {
			const postId = request.params.id;
			const user = response.locals.user;
			const input = request.body as PostCommentInput;
			const result = await controller.createComment(postId, user.id, input.comment);
			match(
				result,
				(commentPostOutput) => response.status(201).json(commentPostOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, error);
		}
	});

	router.put(
		api.POSTS + "/:id" + "/comment" + "/:commentId",
		authenticate,
		async (request: Request, response: Response) => {
			try {
				const postId = request.params.id;
				const user = response.locals.user;
				const commentId = request.params.commentId;
				const input = request.body as PostCommentInput;
				const result = await controller.updateComment(postId, user.id, commentId, input.comment);
				match(
					result,
					(commentPostOutput) => response.json(commentPostOutput),
					(error) => sendErrorResponse(response, error),
				);
			} catch (error) {
				sendErrorResponse(response, error);
			}
		},
	);

	router.delete(
		api.POSTS + "/:id" + "/comment" + "/:commentId",
		authenticate,
		async (request: Request, response: Response) => {
			try {
				const postId = request.params.id;
				const user = response.locals.user;
				const commentId = request.params.commentId;
				const result = await controller.deleteComment(postId, user.id, commentId);
				match(
					result,
					(commentPostOutput) => response.json(commentPostOutput),
					(error) => sendErrorResponse(response, error),
				);
			} catch (error) {
				sendErrorResponse(response, error);
			}
		},
	);

	router.post(api.POSTS + "/:id" + "/like", authenticate, async (request: Request, response: Response) => {
		try {
			const post = request.params.id;
			const user = response.locals.user;
			const input = request.body as PostLikeInput;
			const result = await controller.like(post, user.id, input.like);
			match(
				result,
				(likePostOutput) => response.status(201).json(likePostOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, error);
		}
	});
};
