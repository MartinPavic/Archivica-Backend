import { ParsedQs } from "qs";
import { CreatePostInput, CreatePostOutput, GetAllOutput, GetByIdOutput, UpdatePostInput, UpdatePostOutput } from "src/models/api/post";
import { CustomException } from "src/models/exceptions/custom.exception";
import { PostRepository } from "src/repositories/post.repository";
import { PaginateFilterSortService } from "src/services/paginateFilterSort.service";
import { Either, makeLeft } from "src/utils/either";
import logger from "src/utils/logger";

export class PostController {
    private postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    public async getAll(reqQuery: ParsedQs): Promise<Either<CustomException, GetAllOutput>> {
        try {
            const [page, limit, filters, sort] = PaginateFilterSortService.getParamsFromQuery(reqQuery);
            const mongoFilter = PaginateFilterSortService.convertToMongoFilter(filters);
            const mongoSort = PaginateFilterSortService.convertToMongoSort(sort);
            const result = await this.postRepository.getAll(mongoFilter, mongoSort, (page - 1) * limit, limit);
            return result;
        } catch (error) {
            logger.error(error, "[PostController] getAll failed");
            return makeLeft(error);
        }
    }

    public async getById(id: string): Promise<Either<CustomException, GetByIdOutput>> {
        try {
            const result = await this.postRepository.getById(id);
            return result;
        } catch (error) {
            logger.error(error, "[PostController] getById failed");
            return makeLeft(error);
        }
    }

    public async create(input: CreatePostInput): Promise<Either<CustomException, CreatePostOutput>> {
        try {
            const result = await this.postRepository.create<CreatePostInput>(input);
            return result;
        } catch (error) {
            logger.error(error, "[PostController] create failed");
            return makeLeft(error);
        }
    }

    public async update(id: string, input: UpdatePostInput): Promise<Either<CustomException, UpdatePostOutput>> {
        try {
            const result = await this.postRepository.update<UpdatePostInput>(id, input);
            return result;
        } catch (error) {
            logger.error(error, "[PostController] update failed");
            return makeLeft(error);
        }
    }

    public async delete(id: string): Promise<Either<CustomException, string>> {
        try {
            const result = await this.postRepository.delete(id);
            return result;
        } catch (error) {
            logger.error(error, "[PostController] delete failed");
            return makeLeft(error);
        }
    }
}