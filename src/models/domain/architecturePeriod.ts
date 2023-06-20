/* eslint-disable no-mixed-spaces-and-tabs */
import { ObjectId } from "mongodb";
import { Domain } from ".";

export class ArchitecturePeriodDomain implements Domain {
	_id!: ObjectId;
	name!: string;
	synonyms: string[] = [];
	start!: {
		year: number;
		unit: "AD" | "BC";
	};

	end!: {
		year: number;
		unit: "AD" | "BC";
	};

	stillActive: boolean = false;

	toJson(): string {
    	return JSON.stringify(this);
	}

}