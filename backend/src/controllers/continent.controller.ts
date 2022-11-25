import { ContinentDomain } from "src/models/domain/continent";
import { ContinentDocument } from "src/models/mongo/continent.model";
import { BaseController } from "./base.controller";

export class ContinentController extends BaseController<ContinentDocument, ContinentDomain> {}