import { ContinentDomain } from "../models/domain/continent";
import { ContinentDocument } from "../models/mongo/continent.model";
import { BaseController } from "./base.controller";

export class ContinentController extends BaseController<ContinentDocument, ContinentDomain> {}