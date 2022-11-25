import { Domain } from "../domain";

export class ArchitectureStyleDomain implements Domain {
    name: string;
    synonyms: string[];
    yearStart: number;
    yearStartAD: boolean;
    yearEnd?: number;
    yearEndAD?: boolean;
    stillActive: boolean;

    toJson(): string {
        return JSON.stringify(this);
    }
}