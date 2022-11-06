import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { CustomException, ExceptionType } from "src/models/exceptions/custom.exception";
import { DatabaseError } from "src/models/exceptions/db.exception";
import { Either, makeLeft, makeRight } from "src/utils/either";
import logger from "src/utils/logger";

export class BaseRepository<T> {
    name: string;
    private model: Model<T>;

    constructor(name: string, model: Model<T>) {
        this.model = model;
        this.name = name;
    }

    async getAll(): Promise<Either<CustomException, T[]>> {
        try {
            const data = await this.model.find();
            return makeRight(data);
        } catch (error) {
            logger.error(error, `[${this.name}Repository] getAll failed`);
            return makeLeft(error);
        }
    }

    async getById(id: string): Promise<Either<CustomException, T>> {
        try {
            const data = await this.model.findById(id);
            if (!data) {
                const error = `${this.name} with id ${id} not found`;
                logger.error(`[${this.name}Repository] ${error}`);
                return makeLeft(DatabaseError(error, ExceptionType.NOT_FOUND));
            }
            return makeRight(data);
        } catch (error) {
            logger.error(error, `[${this.name}Repository] getById failed`);
            return makeLeft(error);
        }
    }

    async create<I>(input: I): Promise<Either<CustomException, T>> {
        try {
            const model = await this.model.create(input);
            if (!model) {
                const error = `Couldn't create ${this.name} with this data: ${input}`;
                logger.error(`[${this.name}Repository] ${error}`);
                return makeLeft(DatabaseError(error));
            }
            return makeRight(model);
        } catch (error) {
            logger.error(error, `[${this.name}Repository] create failed`);
            return makeLeft(error);
        }
    }

    async update<I>(id: string, input: I): Promise<Either<CustomException, T>> {
        try {
            const model = await this.model.findByIdAndUpdate(id, input as UpdateQuery<T>, { new: true });
            if (!model) {
                const error = `Couldn't update ${this.name} with id: ${id} with this data: ${input}`;
                logger.error(`[${this.name}Repository] ${error}`);
                return makeLeft(DatabaseError(error));
            }
            return makeRight(model);
        } catch (error) {
            logger.error(error, `[${this.name}Repository] update failed`);
            return makeLeft(error);
        }
    }

    async delete(id: string): Promise<Either<CustomException, string>> {
        try {
            const model = await this.model.deleteOne({ id } as FilterQuery<T>);
            if (!model) {
                const error = `Couldn't delete ${this.name} with id: ${id}`;
                logger.error(`[${this.name}Repository] ${error}`);
                return makeLeft(DatabaseError(error));
            }
            return makeRight(`${this.name} with id: ${id} successfully deleted`);
        } catch (error) {
            logger.error(error, `[${this.name}Repository] update failed`);
            return makeLeft(error);
        }
    }
}