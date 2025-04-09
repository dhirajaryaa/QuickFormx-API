export class ApiError extends Error {
    constructor(
        statusCode = 400,
        message = "something went wrong!",
        data = null,
        isError = true,
        success = false,
        error = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
        this.isError = isError;
        this.success = success;
        this.error = error;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}