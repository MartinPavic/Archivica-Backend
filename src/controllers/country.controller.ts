import { CountryDomain } from "../models/domain/country";
import { CountryDocument } from "../models/mongo/country.model";
import { BaseController } from "./base.controller";

export class CountryController extends BaseController<CountryDocument, CountryDomain> {}