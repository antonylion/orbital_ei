import { Request, Response, NextFunction } from 'express';

/**
 * Express error-handling middleware.
 * Logs the error and sends a standardized JSON response.
 * @param error - The error object representing the encountered error.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the chain.
 */
export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(error);
    res.status(500).json({
        /** Error message sent only in development mode for security reasons. */
        message: 'An unexpected error occurred',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
};