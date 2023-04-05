import { ArchitectureStyleDomain } from "src/models/domain/ArchitectureStyle";
import { ArchitectureStyleDocument } from "src/models/mongo/ArchitectureStyle.model";
import { ArchitectureStyleRepository } from "src/repositories/ArchitectureStyle.repository";
import { BaseController } from "./base.controller";

export class ArchitectureStyleController extends BaseController<ArchitectureStyleDocument, ArchitectureStyleDomain> {

	constructor(architectureStyleRepository: ArchitectureStyleRepository) {
		super(architectureStyleRepository);
	}

}