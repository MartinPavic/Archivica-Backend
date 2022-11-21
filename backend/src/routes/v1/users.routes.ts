import { Router, Request, Response } from "express";
import api from "../../constants";
import { UserController } from "src/controllers/user.controller";
import { LoginInput, RefreshTokenInput, RegisterInput, UserOutput } from "src/models/api/user";
import { match } from "src/utils/either";
import { sendErrorResponse } from "src/utils";
import authenticate from "src/middleware/authenticaton.middleware";
import { deleteUserToken } from "src/db/redis";
import { UserDocument } from "src/models/mongo/user.model";

export const userRouter = (router: Router, controller: UserController): void => {
    router.post(api.USER_REGISTER, async (request: Request, response: Response) => {
        try {
            const registerInput = request.body as RegisterInput;
            const result = await controller.registerUser(registerInput);
            match(
                result,
                (registerOutput) => response.json(registerOutput),
                (error) => sendErrorResponse(response, error)
            );
        } catch (error) {
            sendErrorResponse(response, error);
        }
    });

    router.post(api.USER_LOGIN, async (request: Request, response: Response) => {
        try {
            const loginInput = request.body as LoginInput;
            const result = await controller.loginUser(loginInput);
            match(
                result,
                (loginOutput) => response.json(loginOutput),
                (error) => sendErrorResponse(response, error)
            );
        } catch (error) {
            sendErrorResponse(response, error);
        }
    });

    router.get(api.CURRENT_USER, authenticate, (request: Request, response: Response) => {
        try {
            const user: UserOutput = {
                email: response.locals.user.email,
                firstName: response.locals.user.firstName,
                lastName: response.locals.user.lastName,
                image: response.locals.user.image
            };
            response.json(user);
        } catch (error) {
            sendErrorResponse(response, error);
        }
    });

    router.delete(api.USER_LOGOUT, authenticate, async (request: Request, response: Response) => {
        try {
            const user: UserDocument = response.locals.user;
            await deleteUserToken(user.id!);
            response.json("Successfully logged out!");
        } catch (error) {
            sendErrorResponse(response, error);
        }
    });

    router.post(api.REFRESH_TOKEN, async (request: Request, response: Response) => {
        try {
            const refreshTokenInput: RefreshTokenInput = request.body as RefreshTokenInput;
            const result = await controller.refreshToken(refreshTokenInput);
            match(
                result,
                (refreshTokenOutput) => response.json(refreshTokenOutput),
                (error) => sendErrorResponse(response, error)
            );
        } catch (error) {
            sendErrorResponse(response, error);
        }
    });
};
