import { ParsedQs } from "qs";
import { IFilter, ISort, MongoFilter, MongoSort, FilterOperator, SortOperator } from "src/models/api/filterSort";
import { foldr } from "src/utils/fp";

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;

export class PaginateFilterSortService {

    static convertToMongoFilter(filters: IFilter[] | undefined): MongoFilter {
        if (filters === undefined || filters.length < 1) {
            return {};
        }
        const mongoFilters = foldr((filter: IFilter, acc: MongoFilter) => {
            return Object.assign(acc, {
                [filter.property]: {
                    [filter.operator]: filter.value
                }
            });
        }, {}, filters);
        return mongoFilters;
    }

    static convertToMongoSort(sort: ISort | undefined): MongoSort {
        if (sort === undefined) {
            return {};
        }
        return { [sort.property]: sort.operator };
    }

    static getParamsFromQuery(reqQuery: ParsedQs): [number, number, IFilter[]?, ISort?] {
        const page = reqQuery.page ? parseInt(reqQuery.page as string) : DEFAULT_PAGE;
        const limit = reqQuery.limit ? parseInt(reqQuery.limit as string) : DEFAULT_LIMIT;
        const filters = reqQuery.filter && typeof reqQuery.filter !== "string" ? (reqQuery.filter as string[]).map(this.convertStringToIFilter) : undefined;
        const filter = filters === undefined && typeof reqQuery.filter === "string" ? this.convertStringToIFilter(reqQuery.filter as string) : undefined;
        const [sortProperty, sortOperator] = reqQuery.sort ? (reqQuery.sort as string).split(",") : [undefined, undefined];
        const sort = sortProperty && sortOperator ? { property: sortProperty, operator: sortOperator as SortOperator } : undefined;
        return [page, limit, filters || (filter ? [filter] : []), sort];
    }

    private static convertStringToIFilter(string: string): IFilter {
        const [property, operator, value] = string.split(",");
        return { property, operator: operator as FilterOperator, value };
    }
}
