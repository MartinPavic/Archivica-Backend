export interface Filter {
    property: string;
    operator: "lt" | "eq" | "gt";
    value: string | number;
}