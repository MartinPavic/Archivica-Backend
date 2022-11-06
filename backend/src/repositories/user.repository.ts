import { LoginInput } from "src/models/api/user";
import { CustomException } from "src/models/exceptions/custom.exception";
import { DatabaseError } from "src/models/exceptions/db.exception";
import { UserModel, UserDocument } from "src/models/mongo/user.model";
import { checkPassword } from "src/utils";
import { Either, makeLeft, makeRight } from "src/utils/either";
import logger from "src/utils/logger";
import { BaseRepository } from "./base.repository";

export class UserRepository extends BaseRepository<UserDocument> {

    async getByCredentials(input: LoginInput): Promise<Either<CustomException, UserDocument>> {
        try {
            const user = await UserModel.findOne({ email: input.email });
            if (user) {
                const isPasswordValid = await checkPassword(input.password, user.password!);
                if (isPasswordValid) {
                    return makeRight(user);
                } else {
                    const error = "Password not valid";
                    logger.error(`[UserRepository] ${error}`);
                    return makeLeft(DatabaseError(error));
                }
            }
            const error = `User with email: ${input.email} not found`;
            logger.error(`[UserRepository] ${error}`);
            return makeLeft(DatabaseError(error));
        } catch (e) {
            logger.error(e, "[UserRepository] getByCredentials failed");
            return e;
        }
    }

}
