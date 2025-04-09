export const ErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        statusCode,
        message: err.message || "something went wrong!",
        ...err
    })
}