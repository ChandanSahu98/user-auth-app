const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    // Log the error for the developer
    logger.error({
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method
    });

    // Final response to the client
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message || "Internal Server Error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
};

module.exports = errorHandler;
