/* eslint-disable no-mixed-spaces-and-tabs */
import { ObjectId } from "mongodb";
import { Domain } from "../domain";

export class BlogDomain implements Domain {
	_id!: ObjectId;
	name!: string;
	description!: string;
	photoPath!: string;
	readingTime!: {
		duration: number;
		unit: string;
	};

	date!: Date;
	owner!: ObjectId;
	comments!: [
		{
			owner: ObjectId;
			comment: string;
			date: Date;
		}
	];

	likes!: [
		{
			owner: ObjectId;
			liked: boolean;
		}
	];

	gallery!: [
		{
			name: string;
			imagePath: string;
			width: number;
			height: number;
		}
	];

	connectedPosts!: [
		{
			post: ObjectId;
		}
	];

	toJson(): string {
    	return JSON.stringify(this);
	}

}