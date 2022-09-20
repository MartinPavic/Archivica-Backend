import { Response } from 'express';
import bcrypt from 'bcryptjs';

const sendErrorResponse = (res: Response, ex: Error): Response<any, Record<string, any>> => {
    if (ex.message) {
        return res.status(400).send({ message: ex.message });
    }

    return res.status(400).send(ex);
};

const convertSecondsToTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 3600 % 60);

    const hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
    const mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
    const sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
    return hDisplay + mDisplay + sDisplay;
};

const convertBytesToMB = (bytes: number): string => {
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};

const generateHashedPassword = (user: any) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject(err);
            }

            bcrypt.hash(user.password, salt, (hashErr, hash) => {
                if (hashErr) {
                    reject(hashErr);
                }

                user.password = hash;
                resolve(user);
            });
        });
    });
};

export {
    sendErrorResponse,
    convertBytesToMB,
    convertSecondsToTime,
    generateHashedPassword
};