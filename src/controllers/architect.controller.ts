import { ArchitectDomain } from "../models/domain/architect";
import { ArchitectDocument } from "../models/mongo/architect.model";
import { BaseController } from "./base.controller";

export class ArchitectController extends BaseController<ArchitectDocument, ArchitectDomain> {}