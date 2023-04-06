import { Response } from "express";
import bcrypt from "bcryptjs";
import { Either, makeRight, makeLeft } from "./either";
import jwt from "jsonwebtoken";
import { CustomException } from "../models/exceptions/custom.exception";
import logger from "./logger";

const sendErrorResponse = (response: Response, exception: CustomException): Response<any, Record<string, any>> => {
	return response.status(exception.statusCode || 500).json({ name: exception.name, message: exception.message });
};

const convertSecondsToTime = (seconds: number): string => {
	const h = Math.floor(seconds / 3600);
	const m = Math.floor(seconds % 3600 / 60);
	const s = Math.floor(seconds % 3600 % 60);

	const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
	const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
	const sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
	return hDisplay + mDisplay + sDisplay;
};

const convertBytesToMB = (bytes: number): string => {
	return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};

const generateHashedPassword = (password: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(10, (err, salt) => {
			if (err) {
				reject(err);
			}
			bcrypt.hash(password, salt, (hashErr, hash) => {
				if (hashErr) {
					reject(hashErr);
				}

				resolve(hash);
			});
		});
	});
};

const checkPassword = (password: string, hashedPassword: string): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, hashedPassword, (err, found) => {
			if (err) {
				reject(err);
			}

			if (found) {
				resolve(true);
			}
			resolve(false);
		});
	});
};

// eslint-disable-next-line no-unused-vars
enum TokenType {
    // eslint-disable-next-line no-unused-vars
    ACCESS = "ACCESS",
    // eslint-disable-next-line no-unused-vars
    REFRESH = "REFRESH"
}

const generateAccessAndRefreshTokens = (userId: string): Either<CustomException, { accessToken: string, refreshToken: string }> => {
	try {
		const accessToken = jwt.sign(
			{ id: userId, type: TokenType.ACCESS },
            process.env.JWT_SECRET as jwt.Secret,
            { expiresIn: Number(process.env.REDIS_EXPIRE_TOKEN) },
		).toString();

		const refreshToken = jwt.sign(
			{ id: userId, type: TokenType.REFRESH },
            process.env.JWT_SECRET as jwt.Secret,
            { expiresIn: Number(process.env.REDIS_EXPIRE_REFRESH_TOKEN) },
		).toString();

		return makeRight({ accessToken, refreshToken });
	} catch (e) {
		logger.error(e);
		return makeLeft(e);
	}
};

export {
	TokenType,
	sendErrorResponse,
	convertBytesToMB,
	convertSecondsToTime,
	generateHashedPassword,
	checkPassword,
	generateAccessAndRefreshTokens,
};