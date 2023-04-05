import { Domain } from ".";

export class ArchitecturePeriodDomain implements Domain {
    name: string;
    synonyms: string[];
    start: {
        year: number;
        unit: "AD" | "BC";
    }

    end: {
        year: number;
        unit: "AD" | "BC";
    }

    stillActive: boolean;

    toJson(): string {
        return JSON.stringify(this);
    }
}