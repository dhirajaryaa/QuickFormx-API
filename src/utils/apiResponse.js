export class ApiResponse {
    constructor(
        statusCode = 200,
        message = "Successful",
        data = null,
        success = true,
        error = false,
    ) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.error = error;
        this.success = success;
    }
}