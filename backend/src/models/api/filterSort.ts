import { SortValues } from "mongoose";

export type FilterOperator = "$lt" | "$eq" | "$gt" | "$lte" | "$gte";
type Value = string;

export interface IFilter {
    property: string;
    operator: FilterOperator
    value: string;
}

type OperatorValue = {
    // eslint-disable-next-line no-unused-vars
    [operator in FilterOperator]: Value;
};

export interface MongoFilter {
    [property: string]: OperatorValue
}

export type SortOperator = "asc" | "desc";

export interface ISort {
    property: string;
    operator: SortOperator;
}

export interface MongoSort {
    [property: string]: SortValues
}