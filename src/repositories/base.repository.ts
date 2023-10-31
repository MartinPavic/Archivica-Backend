/* eslint-disable no-mixed-spaces-and-tabs */
import { MongoServerError } from "mongodb";
import { Document, FilterQuery, Model, UpdateQuery } from "mongoose";
import { MongoFilter, MongoSort } from "../models/api/filterSort";
import { CustomException } from "../models/exceptions/custom.exception";
import { Either, isLeft, makeLeft, makeRight } from "../utils/either";
import logger from "../utils/logger";
import { getErrorMessage } from "../utils/error";

export class BaseRepository<T extends Document> {
	public name: string;
	public model: Model<T>;

	constructor(name: string, model: Model<T>) {
		this.model = model;
		this.name = name;
	}

	async getAll(
		filter: MongoFilter,
		sort?: MongoSort,
		skip?: number,
		limit?: number,
	): Promise<Either<CustomException<MongoServerError>, T[]>> {
		try {
			const data = await this.model.find(filter as FilterQuery<T>, [], { skip, limit, sort });
			return makeRight(data);
		} catch (error) {
			logger.error(error, `[${this.name}Repository] getAll failed`);
			return makeLeft(new CustomException(getErrorMessage(error)));
		}
	}

	async getById(id: string): Promise<Either<CustomException<MongoServerError>, T>> {
		try {
			const dataOrError: Either<MongoServerError, T> = await this.model
				.findById(id)
				.then((value) => makeRight(value!))
				.catch((error: MongoServerError) => makeLeft(error));
			if (isLeft(dataOrError)) {
				const error = `${this.name} with id ${id} not found`;
				logger.error(`[${this.name}Repository] ${error}`);
				return makeLeft(CustomException.fromError<MongoServerError>(dataOrError.left));
			}
			return dataOrError;
		} catch (error) {
			logger.error(error, `[${this.name}Repository] getById failed`);
			return makeLeft(new CustomException(getErrorMessage(error)));
		}
	}

	async create<I>(input: I): Promise<Either<CustomException<MongoServerError>, T>> {
		try {
			const modelOrError: Either<MongoServerError, T> = await this.model
				.create(input)
				.then((value) => makeRight(value))
				.catch((error: MongoServerError) => makeLeft(error));
			if (isLeft(modelOrError)) {
				const error = `Couldn't create ${this.name} with this data: ${JSON.stringify(input)}. Got exception: ${JSON.stringify(modelOrError.left)}`;
				logger.error(`[${this.name}Repository] ${error}`);
				return makeLeft(CustomException.fromError<MongoServerError>(modelOrError.left));
			}
			return modelOrError;
		} catch (error) {
			logger.error(error, `[${this.name}Repository] create failed`);
			return makeLeft(new CustomException(getErrorMessage(error)));
		}
	}

	async update<I>(id: string, input: I): Promise<Either<CustomException<MongoServerError>, T>> {
		try {
			const modelOrError: Either<MongoServerError, T> = await this.model
				.findByIdAndUpdate(id, input as UpdateQuery<T>, { new: true })
				.then((value) => makeRight(value))
				.catch((error) => error);
			if (isLeft(modelOrError)) {
				const error = `Couldn't update ${this.name} with id: ${id} with this data: ${JSON.stringify(input)}`;
				logger.error(`[${this.name}Repository] ${error}`);
				return makeLeft(CustomException.fromError<MongoServerError>(modelOrError.left));
			}
			return modelOrError;
		} catch (error) {
			logger.error(error, `[${this.name}Repository] update failed`);
			return makeLeft(new CustomException(getErrorMessage(error)));
		}
	}

	async delete(id: string): Promise<Either<CustomException<MongoServerError>, string>> {
		try {
			const modelOrError: Either<MongoServerError, T> = await this.model.findByIdAndDelete(id).then(value => makeRight(value)).catch(error => error);
			if (isLeft(modelOrError)) {
				const error = `Couldn't delete ${this.name} with id: ${id}`;
				logger.error(`[${this.name}Repository] ${error}`);
				return makeLeft(CustomException.fromError<MongoServerError>(modelOrError.left));
			}
			return makeRight(`${this.name} with id: ${id} successfully deleted`);
		} catch (error) {
			logger.error(error, `[${this.name}Repository] update failed`);
			return makeLeft(new CustomException(getErrorMessage(error)));
		}
	}
}
