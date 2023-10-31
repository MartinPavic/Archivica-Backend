/* eslint-disable no-mixed-spaces-and-tabs */
class CustomException<E extends Error = Error> extends Error {
	name: string;
	originalError?: E;
    statusCode?: number;

    constructor(msg: string, originalError?: E, name: string = "Internal Server Error", statusCode?: number) {
    	super(msg);
    	this.originalError = originalError;
    	this.name = name;
    	this.statusCode = statusCode;
    }

    static fromString(msg: string): CustomException {
    	return new CustomException(msg);
    }

    static fromError<E extends Error = Error>(e: E): CustomException<E> {
    	return new CustomException<E>(e.message, e);
    }

    static badRequest(msg: string, originalError?: Error): CustomException {
    	return new CustomException(msg, originalError, "Bad Request", 400);
    }

    static notFound(msg: string, originalError?: Error): CustomException {
    	return new CustomException(msg, originalError, "Not Found", 404);
    }

    static unauthorized(msg: string, originalError?: Error): CustomException {
    	return new CustomException(msg, originalError, "Unauthorized", 401);
    }

    setStatusCode(statusCode: number): void {
    	this.statusCode = statusCode;
    }

    toString() {
    	return;
    }
}

export { CustomException };