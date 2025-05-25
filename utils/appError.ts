class AppError extends Error {
    statusCode: number;


    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;


        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AppError);
        }


        return this
    }
}

export default AppError;
