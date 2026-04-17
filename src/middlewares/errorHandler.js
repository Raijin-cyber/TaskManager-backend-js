//  how should a custom error handler work?
// if any error occured in any of the route handler then forward it to this error handler

const errorHandler = (err, req, res, next) => {
    if(err.headersSent) {
        // if res is sent then and an error has occured then let express's error handler to handle the error
        return next(err);
    }
    console.error(err.stack);
    
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
}

export default errorHandler;