/* eslint-disable no-mixed-spaces-and-tabs */
import { ObjectId } from "mongodb";
import { Domain } from "../domain";

export class CountryDomain implements Domain {
	name!: string;
	continentId!: ObjectId;
	yearStart!: number;
	yearStartAD: boolean = false;
	yearEnd?: number;
	yearEndAD?: boolean;
	previousCountryId?: ObjectId;
	stillActive: boolean = false;

	toJson(): string {
    	return JSON.stringify(this);
	}
}