import { ArchitecturePeriodDomain } from "../domain/architecturePeriod";
import { ArchitecturePeriodDocument } from "../mongo/architecturePeriod.model";

export type CreateArchitecturePeriodInput = ArchitecturePeriodDomain;

export type CreateArchitecturePeriodOutput = ArchitecturePeriodDocument;

export type UpdateArchitecturePeriodInput = ArchitecturePeriodDomain;

export type UpdateArchitecturePeriodOutput = ArchitecturePeriodDocument;