import { ArchitectureStyleDomain } from "../models/domain/architectureStyle";
import { ArchitectureStyleDocument } from "../models/mongo/architectureStyle.model";
import { ArchitectureStyleRepository } from "../repositories/architectureStyle.repository";
import { BaseController } from "./base.controller";

export class ArchitectureStyleController extends BaseController<ArchitectureStyleDocument, ArchitectureStyleDomain> {

	constructor(architectureStyleRepository: ArchitectureStyleRepository) {
		super(architectureStyleRepository);
	}

}