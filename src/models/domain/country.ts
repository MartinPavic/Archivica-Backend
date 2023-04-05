import { ObjectId } from "mongodb";
import { Domain } from "../domain";

export class CountryDomain implements Domain {
    name: string;
    continentId: ObjectId;
    yearStart: number;
    yearStartAD: boolean;
    yearEnd?: number;
    yearEndAD?: boolean;
    previousCountryId?: ObjectId;
    stillActive: boolean;

    toJson(): string {
        return JSON.stringify(this);
    }
}