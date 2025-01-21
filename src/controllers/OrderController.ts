import { Request, Response, NextFunction } from 'express';
import { OrderModel } from '../models/OrderModel';
import { validationResult } from 'express-validator';
import { OrderFilters } from '../types/types';

/**
 * Controller for handling operations related to orders.
 */
export class OrderController {
    constructor(private model: OrderModel) {}

    /**
     * Creates a new order.
     * @param req - The Express request object containing the order details in the body.
     * @param res - The Express response object for sending the response.
     * @param next - The next middleware function in the chain.
     */
    createOrder = async (req: Request, res: Response, next: NextFunction) => {
        const { image_id, customer_email, payment_method } = req.body;

        // Validate incoming request using express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Create a new order in the database
            const order = await this.model.create(
                image_id,
                customer_email,
                payment_method
            );
            res.status(201).json({
                message: "Correctly purchased image :)",
                order: order,
            });
        } catch (error) {
            if (error.message === 'IMAGE_NOT_FOUND') {
                return res.status(400).json({
                    errors: [
                        {
                            type: "custom",
                            value: image_id,
                            msg: "The image you are trying to order does not exist in our database",
                            path: "image_id",
                            location: "body",
                        },
                    ],
                });
            }
            // Pass other errors to the error handler middleware
            next(error);
        }
    };

    /**
     * Retrieves a paginated list of orders based on provided filters.
     * @param req - The Express request object containing query parameters for filters, page, and limit.
     * @param res - The Express response object for sending the response.
     * @param next - The next middleware function in the chain.
     */
    getOrders = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Handle pagination parameters
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            if (page < 1 || limit < 1) {
                return res.status(400).json({
                    error: "Invalid pagination parameters",
                    message: "Page and limit must be positive integers",
                });
            }

            // Extract and type-cast validated filters
            const { page: _, limit: __, ...filterParams } = req.query;
            const filters: OrderFilters = filterParams;

            // Validate incoming request using express-validator
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Fetch data using filters and pagination
            const { data, total } = await this.model.getAll(filters, page, limit);

            res.json({
                data,
                pagination: {
                    currentPage: page,
                    pageSize: limit,
                    totalItems: total,
                    totalPages: Math.ceil(total / limit),
                },
            });
        } catch (error) {
            next(error);
        }
    };
}