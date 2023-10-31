import { CountryDocument } from "../models/mongo/country.model";
import { BaseRepository } from "./base.repository";

export class CountryRepository extends BaseRepository<CountryDocument> {}