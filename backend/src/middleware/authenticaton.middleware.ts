import { Response, NextFunction, Request } from "express";
import { getUserToken } from "src/db/redis";
import { UserModel } from "src/models/mongo/user.model";
import { sendErrorResponse } from "utils";
import jwt from "jsonwebtoken";
import { CustomException, ExceptionType } from "src/models/exceptions/custom.exception";

export class UserNotAuthorized extends CustomException {
    message: string = "User is not authorized.";
    type: ExceptionType = ExceptionType.NOT_AUTHORIZED;
}

type JWT_USER = {
    id: string;
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
            sendErrorResponse(res, new UserNotAuthorized());
            return;
        }
        const rawToken = bearerToken.replace("Bearer ", "");
        const jwtUser = jwt.verify(rawToken, process.env.JWT_SECRET as jwt.Secret) as JWT_USER;
        const cacheToken = await getUserToken(jwtUser.id);
        if (cacheToken === rawToken) {
            const user = await UserModel.findById(jwtUser.id);
            if (!user) {
                sendErrorResponse(res, new UserNotAuthorized());
                return;
            }
            res.locals.user = user;
            next();
        } else {
            sendErrorResponse(res, new UserNotAuthorized());
        }
    } catch (error) {
        sendErrorResponse(res, error);
    }
};

export default authenticate;
