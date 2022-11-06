import { CustomException, ExceptionType } from "./custom.exception";

export const DatabaseError: (msg: string, type?: ExceptionType) => CustomException = (message, type = ExceptionType.DATABASE) => ({
    name: "Database error",
    type,
    message
});