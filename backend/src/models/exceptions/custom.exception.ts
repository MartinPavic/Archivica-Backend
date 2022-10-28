/* eslint-disable no-unused-vars */
enum ExceptionType {
    NOT_AUTHORIZED,
    ALREADY_EXISTS,
}

abstract class CustomException extends Error {
    type: ExceptionType;
}

export { ExceptionType, CustomException };