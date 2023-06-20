/* eslint-disable no-mixed-spaces-and-tabs */
import { ObjectId } from "mongodb";
import { Domain } from "../domain";

export class ArchitectureStyleDomain implements Domain {
	_id!: ObjectId;
	name!: string;
	synonyms: string[] = [];
	yearStart!: number;
	yearStartAD: boolean = false;
	yearEnd?: number;
	yearEndAD?: boolean;
	stillActive: boolean = false;

	toJson(): string {
    	return JSON.stringify(this);
	}
}