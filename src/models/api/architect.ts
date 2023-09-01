import { ArchitectDomain } from "../domain/architect";
import { ArchitectDocument } from "../mongo/architect.model";

export type CreateArchitectInput = ArchitectDomain;

export type CreateArchitectOutput = ArchitectDocument;

export type UpdateArchitectInput = ArchitectDomain;

export type UpdateArchitectOutput = ArchitectDocument;