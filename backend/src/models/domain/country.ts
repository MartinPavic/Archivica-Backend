import { Domain } from "../domain";

export class CountryDomain implements Domain {
    name: string;
    continentId: number;
    yearStart: number;
    yearStartAD: boolean;
    yearEnd?: number;
    yearEndAD?: boolean;
    previousCountryId?: number;
    stillActive: boolean;

    toJson(): string {
        return JSON.stringify(this);
    }
}