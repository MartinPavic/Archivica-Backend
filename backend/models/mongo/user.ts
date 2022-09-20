import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IJWTUser } from 'interfaces/models';
const _ = require('lodash');
const validator = require('validator');

const { setUserToken, deleteUserToken, getUserToken } = require('../../redis/client');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        minlength: 19,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not valid email.'
        }
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: false
    }
});

UserSchema.methods.toJSON = function() {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
};

UserSchema.statics.findByToken = async function(token) {
    const User = this;
    let decodedUser: IJWTUser;

    if (!token) {
        throw new Error('Missing token');
    }

    try {
        decodedUser = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as IJWTUser;
    } catch (err) {
        throw new Error(err);
    }
    const cacheToken = await getUserToken(decodedUser._id);

    if (cacheToken === token) {
        const user = await User.findById(decodedUser._id);
        return user;
    }
    throw new Error('Missing token');
};

UserSchema.statics.findByCredentials = async function(email: string, password: string) {
    const User = this;
    const existingUser = await User.findOne({ email }).catch((error: any) => Promise.reject(error));

    if (existingUser) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, existingUser.password, (err, found) => {
                if (err) {
                    reject(err);
                }

                if (found === true) {
                    resolve(existingUser);
                }
                reject(new Error('Unknown user'));
            });
        });
    }

    return Promise.reject(new Error('Unknown user'));
};

UserSchema.methods.generateAuthToken = async function() {
    const user = this;
    const access = 'auth';

    const token = jwt
        .sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET as jwt.Secret)
        .toString();
    await setUserToken(user._id.toHexString(), Number(process.env.REDIS_EXPIRE_LOGIN), token).catch((err: any) => new Error(err));
    return token;
};

UserSchema.methods.getAuthToken = async function() {
    const user = this;
    const token = await getUserToken(user._id.toHexString());
    return token;
};

UserSchema.methods.removeToken = async function() {
    const user = this;
    const result = await deleteUserToken(user._id.toHexString());
    return result;
};

export = mongoose.model('User', UserSchema);
