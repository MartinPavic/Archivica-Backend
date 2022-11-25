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
    owner: string;
    comments: [
        {
            id: string;
            owner: string;
            comment: string;
            date: Date;
        }
    ];

    likes: [
        {
            owner: string;
            liked: boolean;
            date: Date;
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
            post: string
        }
    ]

    toJson(): string {
        return JSON.stringify(this);
    }

}