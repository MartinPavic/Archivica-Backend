import { Router } from 'express';
import { pick } from 'lodash';
import { sendErrorResponse, generateHashedPassword } from 'utils';
import { IRequest } from 'interfaces/express';
import authenticate from 'middleware/authenticate';
import api from '../../../constants';

const User = require('models/mongo/user');
const router = Router();

router.post(api.USER_REGISTER, async (req, res) => {
    try {
        const body = pick(req.body, [
            'email',
            'password',
            'firstName',
            'lastName'
        ]);

        const hashedUser = await generateHashedPassword(body);
        const user = await User.create(hashedUser);
        const token = await user.generateAuthToken();
        res.header('Authorization', token).send({
            message: "User successfully registered",
            data: { ...user._doc }
        });
    } catch (error) {
        sendErrorResponse(res, error);
    }
});

router.post(api.USER_LOGIN, async (req, res) => {
    try {
        const body = pick(req.body, ['email', 'password']);
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        res.header('Authorization', token).send({
            message: "User successfully logged in",
            data: { ...user._doc }
        });
    } catch (error) {
        sendErrorResponse(res, error);
    }
});

router.get(api.USER_AUTHENTICATE, authenticate, (req: IRequest, res) => {
    res.send({ ...req.user });
});

router.delete(api.USER_LOGOUT, async (req: IRequest, res) => {
    try {
        const token = req.header('x-auth');
        if (token) {
            const user = await User.findByToken(token)
                .catch((err: Error) => res.status(200).send({ message: 'User token already removed'}));
            const result = await user.removeToken();
            res.status(200).send({ message: 'Token removed'});
        }
        res.status(200).send({ message: 'Missing token' });
    } catch {
        res.status(200).send();
    }
});

export default router;
