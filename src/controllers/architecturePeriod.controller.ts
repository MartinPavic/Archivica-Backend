import { ArchitecturePeriodDomain } from "../models/domain/architecturePeriod";
import { ArchitecturePeriodDocument } from "../models/mongo/architecturePeriod.model";
import { ArchitecturePeriodRepository } from "../repositories/architecturePeriod.repository";
import { BaseController } from "./base.controller";

export class ArchitecturePeriodController extends BaseController<ArchitecturePeriodDocument, ArchitecturePeriodDomain> {

	constructor(ArchitecturePeriodRepository: ArchitecturePeriodRepository) {
		super(ArchitecturePeriodRepository);
	}

}