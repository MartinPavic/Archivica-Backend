import { ObjectId } from "mongodb";
import { Domain } from ".";

export class ArchitectDomain implements Domain {
	_id!: string;
	firstName!: string;
	lastName!: string;
	yearBorn!: number;
	yearDied?: number;
	countryId!: ObjectId;

	toJson(): string {
		return JSON.stringify(this);
	}
}