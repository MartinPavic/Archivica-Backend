import { Router, Request, Response } from "express";
import api from "../../constants";
import { UserController } from "../../controllers/user.controller";
import {
	ForgotPasswordInput,
	LoginInput,
	RefreshTokenInput,
	RegisterInput,
	ResetPasswordInput,
	UserOutput,
	ValidateTokenInput,
} from "../../models/api/user";
import { match } from "../../utils/either";
import { sendErrorResponse } from "../../utils";
import authenticate from "../../middleware/authenticaton.middleware";
import { deleteUserToken } from "../../db/redis";
import { UserDocument } from "../../models/mongo/user.model";
import { CustomException } from "../../models/exceptions/custom.exception";
import { getErrorMessage } from "../../utils/error";

export const userRouter = (router: Router, controller: UserController): void => {
/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     description: Register a new user
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: User registration information
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Illegal arguments
 */
	router.post(api.USER_REGISTER, async (request: Request, response: Response) => {
		try {
			const registerInput = request.body as RegisterInput;
			const result = await controller.registerUser(registerInput);
			match(
				result,
				(registerOutput) => response.status(201).json(registerOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, new CustomException(getErrorMessage(error)));
		}
	});

	/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     description: Login
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: User login information
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *               example: John
 *             lastName:
 *               type: string
 *               example: Doe
 *             email:
 *               type: string
 *               example: john.doe@example.com
 *             accessToken:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *             refreshToken:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       404:
 *         description: Not found
 */
	router.post(api.USER_LOGIN, async (request: Request, response: Response) => {
		try {
			const loginInput = request.body as LoginInput;
			const result = await controller.loginUser(loginInput);
			match(
				result,
				(loginOutput) => response.json(loginOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, new CustomException(getErrorMessage(error)));
		}
	});

	/**
 * @swagger
 * /api/v1/users/current:
 *   get:
 *     description: Get current user
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: accessToken
 *         in: header
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *               example: John
 *             lastName:
 *               type: string
 *               example: Doe
 *             email:
 *               type: string
 *               example: john.doe@example.com
 *             accessToken:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *             refreshToken:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Unauthorized
 */

	router.get(api.CURRENT_USER, authenticate, (request: Request, response: Response) => {
		try {
			const user: UserOutput = {
				email: response.locals.user.email,
				firstName: response.locals.user.firstName,
				lastName: response.locals.user.lastName,
				image: response.locals.user.image,
			};
			response.json(user);
		} catch (error) {
			sendErrorResponse(response, new CustomException(getErrorMessage(error)));
		}
	});

	/**
 * @swagger
 * /api/v1/users/logout:
 *   delete:
 *     description: Logout
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: access_token
 *         in: header
 *     responses:
 *       200:
 *         description: OK
 */

	router.delete(api.USER_LOGOUT, authenticate, async (request: Request, response: Response) => {
		try {
			const user: UserDocument = response.locals.user;
			const result = await deleteUserToken(user.id);
			if (result instanceof Error) {
				throw result;
			}
			response.json("Successfully logged out!");
		} catch (error) {
			sendErrorResponse(response, new CustomException(getErrorMessage(error)));
		}
	});

	router.post(api.REFRESH_TOKEN, async (request: Request, response: Response) => {
		try {
			const refreshTokenInput: RefreshTokenInput = request.body as RefreshTokenInput;
			const result = await controller.refreshToken(refreshTokenInput);
			match(
				result,
				(refreshTokenOutput) => response.json(refreshTokenOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, new CustomException(getErrorMessage(error)));
		}
	});

	router.post(api.FORGOT_PASSWORD, async (request: Request, response: Response) => {
		try {
			const forgotPasswordInput: ForgotPasswordInput = request.body as ForgotPasswordInput;
			const result = await controller.forgotPassword(forgotPasswordInput);
			match(
				result,
				(forgotPasswordOutput) => response.json(forgotPasswordOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, new CustomException(getErrorMessage(error)));
		}
	});

	router.post(api.VALIDATE_TOKEN, async (request: Request, response: Response) => {
		try {
			const validateTokenInput: ValidateTokenInput = request.body as ValidateTokenInput;
			const result = await controller.validateToken(validateTokenInput);
			match(
				result,
				(validateTokenOutput) => response.json(validateTokenOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, new CustomException(getErrorMessage(error)));
		}
	});

	router.post(api.RESET_PASSWORD, async (request: Request, response: Response) => {
		try {
			const resetPasswordInput: ResetPasswordInput = request.body as ResetPasswordInput;
			const result = await controller.resetPassword(resetPasswordInput);
			match(
				result,
				(resetPasswordOutput) => response.json(resetPasswordOutput),
				(error) => sendErrorResponse(response, error),
			);
		} catch (error) {
			sendErrorResponse(response, new CustomException(getErrorMessage(error)));
		}
	});
};
