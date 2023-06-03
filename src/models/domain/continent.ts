/* eslint-disable no-mixed-spaces-and-tabs */
import { Domain } from "../domain";

export class ContinentDomain implements Domain {
	name!: string;

	toJson(): string {
    	return JSON.stringify(this);
	}
}