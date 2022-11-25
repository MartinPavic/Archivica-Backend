import { UserRepository } from "src/repositories/user.repository";
import { Either, makeLeft, map, flatMapAsync, mapAsync } from "src/utils/either";
import { generateHashedPassword, generateAccessAndRefreshTokens, TokenType } from "src/utils";
import { LoginInput, LoginOutput, RefreshTokenInput, RefreshTokenOutput, RegisterInput, RegisterOutput } from "src/models/api/user";
import logger from "src/utils/logger";
import { getUserToken, setUserToken } from "src/db/redis";
import jwt from "jsonwebtoken";
import { JwtUser } from "src/middleware/authenticaton.middleware";
import { CustomException, ExceptionType } from "src/models/exceptions/custom.exception";

const RefreshTokenError: (m: string) => CustomException = (message: string) => ({
    name: "Refresh token error",
    type: ExceptionType.NOT_AUTHORIZED,
    message
});

export class UserController {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async registerUser(registerInput: RegisterInput): Promise<Either<CustomException, RegisterOutput>> {
        try {
            const hashedPassword = await generateHashedPassword(registerInput.password!);
            logger.info("[UserController] Successfully generated hashed password");
            const userOrError = await this.userRepository.create({ ...registerInput, password: hashedPassword });
            return map(
                userOrError,
                (user) => ({ email: user.email, firstName: user.firstName, lastName: user.lastName })
            );
        } catch (error) {
            logger.error(error, "[UserController] registerUser failed");
            return makeLeft(error);
        }
    }

    public async loginUser(loginInput: LoginInput): Promise<Either<CustomException, LoginOutput>> {
        try {
            const userOrError = await this.userRepository.getByCredentials(loginInput);
            return await flatMapAsync(userOrError, async (user) => {
                const tokensOrError = generateAccessAndRefreshTokens(user.id);
                return await mapAsync(tokensOrError, async (tokens) => {
                    const expiresIn = Number(process.env.REDIS_EXPIRE_LOGIN) || 1800;
                    await setUserToken(user.id!, expiresIn, tokens.accessToken);
                    logger.info(`[UserController] ${user.email} successfully logged in`);
                    return {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        password: user.password,
                        image: user.image,
                        accessToken: tokens.accessToken,
                        expiresIn: expiresIn,
                        expiresOn: new Date(new Date().getTime() + expiresIn * 1000),
                        refreshToken: tokens.refreshToken
                    };
                });
            });
        } catch (error) {
            logger.error(error, "[UserController] loginUser failed");
            return makeLeft(error);
        }
    }

    public async refreshToken(refreshTokenInput: RefreshTokenInput): Promise<Either<CustomException, RefreshTokenOutput>> {
        try {
            const jwtUser = jwt.verify(refreshTokenInput.refreshToken, process.env.JWT_SECRET as jwt.Secret) as JwtUser;
            if (jwtUser.type !== TokenType.REFRESH || !jwtUser.id) {
                const error = "[UserController] Refresh token invalid";
                logger.error(error);
                return makeLeft(RefreshTokenError(error));
            }
            const tokenExists = await getUserToken(refreshTokenInput.refreshToken);
            if (tokenExists) {
                const error = "[UserController] Refresh token already used";
                logger.error(error);
                return makeLeft(RefreshTokenError(error));
            }
            const userExists = await this.userRepository.getById(jwtUser.id);
            return await flatMapAsync(userExists, async (user) => {
                await setUserToken(refreshTokenInput.refreshToken, Number(process.env.REDIS_EXPIRE_REFRESH_TOKEN), "1");
                const newTokens = generateAccessAndRefreshTokens(user.id);
                return mapAsync(newTokens, async (tokens) => {
                    const expiresIn = Number(process.env.REDIS_EXPIRE_LOGIN) || 1800;
                    await setUserToken(user.id, expiresIn, tokens.accessToken);
                    return tokens;
                });
            });
        } catch (error) {
            logger.error(error, "[UserController] refreshToken failed");
            return makeLeft(error);
        }
    }
}
