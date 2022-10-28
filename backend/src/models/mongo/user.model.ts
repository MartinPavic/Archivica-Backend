import { model, Document, Schema, Model } from "mongoose";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import { IJWTUser } from "models/postgres/interfaces";
import validator from "validator";
import { UserDomain } from "../domain/user";

// import { setUserToken, deleteUserToken, getUserToken } from "../../db/redis";

type UserDocument = Document & UserDomain

const UserSchema: Schema = new Schema({
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
            message: "{VALUE} is not valid email."
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

const UserModel: Model<UserDocument> = model<UserDocument>("User", UserSchema);

export { UserDocument, UserModel };

// UserSchema.methods.toJSON = function() {
//     const values = Object.assign({}, this.get());
//     delete values.password;
//     return values;
// };

// UserSchema.statics.findByToken = async function(token) {
//     let decodedUser: IJWTUser;

//     if (!token) {
//         throw new Error("Missing token");
//     }

//     try {
//         decodedUser = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as IJWTUser;
//     } catch (err) {
//         throw new Error(err);
//     }
//     const cacheToken = await getUserToken(decodedUser._id);

//     if (cacheToken === token) {
//         const user = await this.findById(decodedUser._id);
//         return user;
//     }
//     throw new Error("Missing token");
// };

// UserSchema.statics.findByCredentials = async function(email: string, password: string) {
//     const existingUser = await this.findOne({ email }).catch((error: any) => Promise.reject(error));

//     if (existingUser) {
//         return new Promise((resolve, reject) => {
//             bcrypt.compare(password, existingUser.password, (err, found) => {
//                 if (err) {
//                     reject(err);
//                 }

//                 if (found === true) {
//                     resolve(existingUser);
//                 }
//                 reject(new Error("Unknown user"));
//             });
//         });
//     }

//     return Promise.reject(new Error("Unknown user"));
// };

// UserSchema.methods.generateAuthToken = async function() {
//     const access = "auth";

//     const token = jwt
//         .sign({ _id: this._id.toHexString(), access }, process.env.JWT_SECRET as jwt.Secret)
//         .toString();
//     await setUserToken(this._id.toHexString(), Number(process.env.REDIS_EXPIRE_LOGIN), token).catch((err: any) => new Error(err));
//     return token;
// };

// UserSchema.methods.getAuthToken = async function() {
//     const token = await getUserToken(this._id.toHexString());
//     return token;
// };

// UserSchema.methods.removeToken = async function() {
//     const result = await deleteUserToken(this._id.toHexString());
//     return result;
// };
