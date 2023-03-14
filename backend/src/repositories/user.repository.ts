import { ForgotPasswordInput, LoginInput } from "src/models/api/user";
import { CustomException } from "src/models/exceptions/custom.exception";
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
					const error = CustomException.unauthorized("Password not valid");
					logger.error(`[UserRepository] ${error}`);
					return makeLeft(error);
				}
			}
			const error = CustomException.notFound(`User with email: ${input.email} not found`);
			logger.error(`[UserRepository] ${error}`);
			return makeLeft(error);
		} catch (error) {
			logger.error(error, "[UserRepository] getByCredentials failed");
			return error;
		}
	}

	async getByEmail(input: ForgotPasswordInput): Promise<Either<CustomException, UserDocument>> {
		try {
			const user = await UserModel.findOne({ email: input.email });
			if (!user) {
				const error = CustomException.notFound(`User with email: ${input.email} not found`);
				logger.error(`[UserRepository] ${error}`);
				return makeLeft(error);
			}
			return makeRight(user);
		} catch (error) {
			logger.error(error, "[UserRepository] getByEmail failed");
			return makeLeft(error);
		}
	}

}
