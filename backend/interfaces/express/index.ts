import { Request } from 'express';
const User = require('models/mongo/user');

export interface IRequest extends Request {
    user: typeof User,
    token: string
}