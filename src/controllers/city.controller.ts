import { CityDomain } from "../models/domain/city";
import { CityDocument } from "../models/mongo/city.model";
import { BaseController } from "./base.controller";

export class CityController extends BaseController<CityDocument, CityDomain> {}