/* eslint-disable no-mixed-spaces-and-tabs */
import { BaseRepository } from "../repositories/base.repository";
import { ParsedQs } from "qs";
import { CustomException } from "../models/exceptions/custom.exception";
import { Either, makeLeft, map } from "../utils/either";
import logger from "../utils/logger";
import { PaginateFilterSortService } from "../services/paginateFilterSort.service";
import { Domain } from "../models/domain";
import { Document } from "mongoose";
import { getErrorMessage } from "../utils/error";

export class BaseController<T extends Document, D extends Domain> {
	private repository: BaseRepository<T>;

	constructor(repository: BaseRepository<T>) {
    	this.repository = repository;
	}

	public async getAll(reqQuery: ParsedQs): Promise<Either<CustomException, D[]>> {
    	try {
    		const [page, limit, filters, sort] = PaginateFilterSortService.getParamsFromQuery(reqQuery);
    		const mongoFilter = PaginateFilterSortService.convertToMongoFilter(filters);
    		const mongoSort = PaginateFilterSortService.convertToMongoSort(sort);
    		const either = await this.repository.getAll(mongoFilter, mongoSort, (page - 1) * limit, limit);
    		const result = map(either, (documents) => documents.map(document => document as unknown as D));
    		return result;
    	} catch (error) {
    		logger.error(error, `[${this.repository.name}Controller] getAll failed`);
    		return makeLeft(new CustomException(getErrorMessage(error)));
    	}
	}

	public async getById(id: string): Promise<Either<CustomException, D>> {
    	try {
    		const either = await this.repository.getById(id);
    		const result = map(either, (document) => document as unknown as D);
    		return result;
    	} catch (error) {
    		logger.error(error, `[${this.repository.name}Controller] getById failed`);
    		return makeLeft(new CustomException(getErrorMessage(error)));
    	}
	}

	public async create(input: D): Promise<Either<CustomException, T>> {
    	try {
    		const result = await this.repository.create<D>(input);
    		return result;
    	} catch (error) {
    		logger.error(error, `[${this.repository.name}Controller] create failed`);
    		return makeLeft(new CustomException(getErrorMessage(error)));
    	}
	}

	public async update(id: string, input: D): Promise<Either<CustomException, T>> {
    	try {
    		const result = await this.repository.update<D>(id, input);
    		return result;
    	} catch (error) {
    		logger.error(error, `[${this.repository.name}Controller] update failed`);
    		return makeLeft(new CustomException(getErrorMessage(error)));
    	}
	}

	public async delete(id: string): Promise<Either<CustomException, string>> {
    	try {
    		const result = await this.repository.delete(id);
    		return result;
    	} catch (error) {
    		logger.error(error, `[${this.repository.name}Controller] delete failed`);
    		return makeLeft(new CustomException(getErrorMessage(error)));
    	}
	}
}