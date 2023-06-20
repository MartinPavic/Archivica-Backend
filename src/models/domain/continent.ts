/* eslint-disable no-mixed-spaces-and-tabs */
import { ObjectId } from "mongodb";
import { Domain } from "../domain";

export class ContinentDomain implements Domain {
	_id!: ObjectId;
	name!: string;

	toJson(): string {
    	return JSON.stringify(this);
	}
}