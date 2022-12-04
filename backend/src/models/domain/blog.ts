import { ObjectId } from "mongodb";
import { Domain } from "../domain";

export class BlogDomain implements Domain {
    name: string;
    description: string;
    photoPath: string;
    readingTime: {
        duration: number;
        unit: string;
    };

    date: Date;
    owner: ObjectId;
    comments: [
        {
            id: ObjectId;
            owner: ObjectId;
            comment: string;
        }
    ];

    likes: [
        {
            owner: ObjectId;
            liked: boolean;
        }
    ];

    gallery: [
        {
            name: string;
            imagePath: string;
            width: number,
            height: number
        }
    ];

    connectedPosts: [
        {
            post: ObjectId
        }
    ]

    toJson(): string {
        return JSON.stringify(this);
    }

}