import { Response } from "express";
import bcrypt from "bcryptjs";
import { Either, makeRight, makeLeft } from "./either";
import jwt from "jsonwebtoken";

const sendErrorResponse = (res: Response, ex: Error): Response<any, Record<string, any>> => {
    if (ex.message) {
        return res.status(400).json({ message: ex.message });
    }

    return res.status(400).json(JSON.parse(ex.toString()));
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
                reject(false);
            }

            if (found === true) {
                resolve(true);
            }
            reject(false);
        });
    });
};

const generateAccessAndRefreshTokens = (userId: string): Either<Error, { accessToken: string, refreshToken: string }> => {
    try {
        const accessToken = jwt.sign(
            { id: userId },
            process.env.JWT_SECRET as jwt.Secret,
            { expiresIn: Number(process.env.REDIS_EXPIRE_TOKEN) }
        ).toString();

        const refreshToken = jwt.sign(
            { id: userId },
            process.env.JWT_SECRET as jwt.Secret,
            { expiresIn: Number(process.env.REDIS_EXPIRE_TOKEN) }
        ).toString();

        return makeRight({ accessToken, refreshToken });
    } catch (e) {
        return makeLeft(e);
    }
};

export {
    sendErrorResponse,
    convertBytesToMB,
    convertSecondsToTime,
    generateHashedPassword,
    checkPassword,
    generateAccessAndRefreshTokens
};