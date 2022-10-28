import { UserDocument } from "../mongo/user.model";

export class UserDomain {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    image?: string

    static fromDocument(userDocument: UserDocument): UserDomain {
        return {
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            password: userDocument.password,
            image: userDocument.image
        };
    }
}