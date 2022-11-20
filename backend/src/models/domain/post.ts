import { Domain } from ".";

export class PostDomain implements Domain {
    name: string;
    date: Date;
    photoPath: string;
    description: string;
    architect: string;
    city: string;
    subAge: string;
    owner: string;
    gallery: [
        {
            name: string,
            imagePath: string,
            width: number,
            height: number
        }
    ];

    comments: [
        {
            owner: string,
            comment: string
        }
    ];

    likes: [
        {
            owner: string,
            liked: boolean
        }
    ];

    toJson(): string {
        return JSON.stringify(this);
    }
}