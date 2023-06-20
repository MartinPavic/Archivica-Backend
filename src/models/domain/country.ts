/* eslint-disable no-mixed-spaces-and-tabs */
import { ObjectId } from "mongodb";
import { Domain } from "../domain";

export class CountryDomain implements Domain {
	_id!: ObjectId;
	name!: string;
	continentId!: ObjectId;

	toJson(): string {
    	return JSON.stringify(this);
	}
}