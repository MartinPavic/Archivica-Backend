import { Response, NextFunction } from 'express';
import { IRequest } from 'interfaces/express';
import { setUserToken } from 'redis/client';
const User = require('models/mongo/user');
const USER_NOT_AUTHORIZED = 'User is not authorized.';

const authenticate = async (req: IRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> => {
    const token = req.header('x-auth');
    if (token && token !== 'null') {
        const user = await User.findByToken(token)
            .catch((err: Error): void => next(err));

        if (!user) {
            return res.status(401).send(USER_NOT_AUTHORIZED);
        }

        req.user = user._doc;
        req.token = token;
        const expiresIn = (Number(process.env.REDIS_EXPIRE_LOGIN) || 1800) * 1000;
        setUserToken(user.id, expiresIn, token);
        res.setHeader('Expires', expiresIn);
        next();
    } else {
        return res.status(401).send(USER_NOT_AUTHORIZED);
    }
};

export default authenticate;
