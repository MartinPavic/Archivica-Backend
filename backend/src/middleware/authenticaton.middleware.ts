import { Response, NextFunction, Request } from "express";
import { getUserToken } from "src/db/redis";
import { UserModel } from "src/models/mongo/user.model";
import { sendErrorResponse, TokenType } from "src/utils";
import jwt from "jsonwebtoken";
import { CustomException, ExceptionType } from "src/models/exceptions/custom.exception";
import logger from "src/utils/logger";

const UserNotAuthorized: CustomException = {
    name: "Not authorized",
    message: "User is not authorized.",
    type: ExceptionType.NOT_AUTHORIZED
};

export type JwtUser = {
    id: string;
    type: TokenType;
    iat: number;
    exp: number;
}

const authenticate = async (
    req: Request,
    res: Response<any, Record<string, any>>,
    next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
        const bearerToken = req.header("Authorization");
        if (!bearerToken || bearerToken === "null") {
            sendErrorResponse(res, UserNotAuthorized);
            return;
        }
        const rawToken = bearerToken.replace("Bearer ", "");
        const jwtUser = jwt.verify(rawToken, process.env.JWT_SECRET as jwt.Secret) as JwtUser;
        const cacheToken = await getUserToken(jwtUser.id);
        if (cacheToken === rawToken) {
            const user = await UserModel.findById(jwtUser.id);
            if (!user) {
                sendErrorResponse(res, UserNotAuthorized);
                return;
            }
            res.locals.user = user;
            next();
        } else {
            sendErrorResponse(res, UserNotAuthorized);
        }
    } catch (error) {
        logger.error(error.name);
        sendErrorResponse(res, UserNotAuthorized);
    }
};

export default authenticate;
