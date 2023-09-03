/* eslint-disable no-mixed-spaces-and-tabs */
import { ObjectId } from "mongodb";
import { Domain } from "../domain";

export class CityDomain implements Domain {
	_id!: ObjectId;
	id!: number;
	name!: string;
	countryId!: number;
	latitude!: string;
	longitude!: string;

	toJson(): string {
    	return JSON.stringify(this);
	}
}