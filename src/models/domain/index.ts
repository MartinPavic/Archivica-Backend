import { ObjectId } from "mongodb";

export interface Domain {
	_id: ObjectId;

    toJson(): string;
}