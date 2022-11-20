import { Domain } from "../domain";
import { UserDocument } from "../mongo/user.model";

export class UserDomain implements Domain {

    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    image?: string

    constructor(userDocument: UserDocument) {
        this.firstName = userDocument.firstName;
        this.lastName = userDocument.lastName;
        this.email = userDocument.email;
        this.password = userDocument.password;
        this.image = userDocument.image;
    }

    toJson(): string {
        return JSON.stringify(this);
    }

}