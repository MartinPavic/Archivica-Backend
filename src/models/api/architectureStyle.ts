import { ArchitectureStyleDomain } from "../domain/architectureStyle";
import { ArchitectureStyleDocument } from "../mongo/architectureStyle.model";

export type CreateArchitectureStyleInput = ArchitectureStyleDomain;

export type CreateArchitectureStyleOutput = ArchitectureStyleDocument;

export type UpdateArchitectureStyleInput = ArchitectureStyleDomain;

export type UpdateArchitectureStyleOutput = ArchitectureStyleDocument;