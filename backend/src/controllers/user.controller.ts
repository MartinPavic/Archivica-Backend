import { UserRepository } from "src/repositories/user.repository";
import { Either, makeLeft, map, flatMapAsync, mapAsync } from "utils/either";
import { generateHashedPassword, generateAccessAndRefreshTokens } from "utils";
import { LoginInput, LoginOutput, RegisterInput, RegisterOutput } from "src/models/api/user";
import logger from "utils/logger";
import { UserDomain } from "src/models/domain/user";
import { setUserToken } from "src/db/redis";

export class UserController {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async registerUser(registerInput: RegisterInput): Promise<Either<Error, RegisterOutput>> {
        try {
            const hashedPassword = await generateHashedPassword(registerInput.password!);
            logger.info("[UserController] Successfully generated hashed password");
            const userOrError = await this.userRepository.create({ ...registerInput, password: hashedPassword });
            return map(userOrError, (user) => ({ email: user.email, firstName: user.firstName, lastName: user.lastName }));
        } catch (error) {
            logger.error(error, "[UserController] registerUser failed");
            return makeLeft(error);
        }
    }

    public async loginUser(loginInput: LoginInput): Promise<Either<Error, LoginOutput>> {
        try {
            const userOrError = await this.userRepository.getByCredentials(loginInput);
            return await flatMapAsync(userOrError, async (user) => {
                const tokensOrError = generateAccessAndRefreshTokens(user.id);
                return await mapAsync(tokensOrError, async (tokens) => {
                    const userDomain = UserDomain.fromDocument(user);
                    const expiresIn = Number(process.env.REDIS_EXPIRE_LOGIN) || 1800;
                    await setUserToken(user.id!, expiresIn, tokens.accessToken);
                    logger.info("[UserController] Successfully logged in");
                    return {
                        ...userDomain,
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
}
