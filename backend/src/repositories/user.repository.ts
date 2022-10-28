import { LoginInput, RegisterInput } from "src/models/api/user";
import { DbError } from "src/models/exceptions/db.exception";
import { UserModel, UserDocument } from "src/models/mongo/user.model";
import { checkPassword } from "utils";
import { Either, makeLeft, makeRight } from "utils/either";
import logger from "utils/logger";

export class UserRepository {

    async getById(id: string): Promise<Either<DbError, UserDocument>> {
        try {
            const user = await UserModel.findById(id);
            if (!user) {
                const error = `User with id ${id} not found`;
                logger.error(`[UserRepository] ${error}`);
                return makeLeft(new Error(error));
            }
            return makeRight(user);
        } catch (error) {
            logger.error(error, "[UserRepository] getById failed");
            return makeLeft(error);
        }
    }

    async create(input: RegisterInput): Promise<Either<DbError, UserDocument>> {
        try {
            const user = await UserModel.create(input);
            if (!user) {
                const error = `Couldn't create user with this data: ${input}`;
                logger.error(`[UserRepository] ${error}`);
                return makeLeft(new Error(error));
            }
            return makeRight(user);
        } catch (error) {
            logger.error(error, "[UserRepository] create failed");
            return makeLeft(error);
        }
    }

    async getByCredentials(input: LoginInput): Promise<Either<DbError, UserDocument>> {
        try {
            const user = await UserModel.findOne({ email: input.email });
            if (user) {
                const isPasswordValid = await checkPassword(input.password, user.password!);
                if (isPasswordValid) {
                    return makeRight(user);
                } else {
                    const error = "Password not valid";
                    logger.error(`[UserRepository] ${error}`);
                    return makeLeft(new Error(error));
                }
            }
            const error = `User with email: ${input.email} not found`;
            logger.error(`[UserRepository] ${error}`);
            return makeLeft(new Error(error));
        } catch (e) {
            logger.error(e, "[UserRepository] getByCredentials failed");
            return e;
        }
    }

}
