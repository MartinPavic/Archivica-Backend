import { CountryDomain } from "src/models/domain/country";
import { CountryDocument } from "src/models/mongo/country.model";
import { BaseController } from "./base.controller";

export class CountryController extends BaseController<CountryDocument, CountryDomain> {}