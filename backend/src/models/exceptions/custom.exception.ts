/* eslint-disable no-unused-vars */
enum ExceptionType {
    NOT_AUTHORIZED,
    ALREADY_EXISTS,
    BAD_REQUEST,
    DATABASE,
    NOT_FOUND,
    NOT_OWNER
}

interface CustomException extends Error {
    type: ExceptionType;
    statusCode?: number;
}

export { ExceptionType, CustomException };