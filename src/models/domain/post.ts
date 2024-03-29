/* eslint-disable no-mixed-spaces-and-tabs */
import { ObjectId } from "mongodb";
import { Domain } from ".";

export class PostDomain implements Domain {
	_id!: ObjectId;
	// name: string;
	date!: Date;
	// photoPath: string;
	description!: string;
	architect?: string;
	city?: string;
	subAge?: string;
	owner!: ObjectId;
	gallery?: [
        {
            name: string,
            imagePath: string,
            width: number,
            height: number
        }
    ];

	comments!: [
		{
			owner: ObjectId;
			comment: string;
		}
	];

	likes!: [
		{
			owner: ObjectId;
			liked: boolean;
		}
	];

	toJson(): string {
    	return JSON.stringify(this);
	}
}