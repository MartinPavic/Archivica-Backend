import { UserDocument } from "../mongo/user.model";

export type UserOutput = {
    firstName: string;
    lastName: string;
    email: string;
    image?: string
}

export type LoginInput = {
    email: UserDocument["email"];
    password: string;
}

export type LoginOutput = UserOutput & {
    accessToken: string;
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
	accessToken: string;
    refreshToken: string;
}

export type RefreshTokenInput = {
    refreshToken: string;
}

export type RefreshTokenOutput = {
    accessToken: string;
    refreshToken: string;
}

export type ForgotPasswordInput = {
    email: string
}

export type ForgotPasswordOutput = string;

export type ValidateTokenInput = {
	email: string;
	token: string;
}

export type ValidateTokenOutput = boolean;