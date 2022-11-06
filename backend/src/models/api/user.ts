import { UserDocument } from "src/models/mongo/user.model";
import { UserDomain } from "../domain/user";

export type LoginInput = {
    email: UserDocument["email"];
    password: string;
}

export type LoginOutput = UserDomain & {
    accessToken: string;
    expiresIn: number;
    expiresOn: Date;
    refreshToken: string;
}

export type RegisterInput = {
    email: UserDocument["email"];
    password: string;
    firstName: string;
    lastName: string;
}

export type RegisterOutput = {
    email: UserDocument["email"];
    firstName: string;
    lastName: string;
}

export type RefreshTokenInput = {
    refreshToken: string;
}

export type RefreshTokenOutput = {
    accessToken: string;
    refreshToken: string;
}