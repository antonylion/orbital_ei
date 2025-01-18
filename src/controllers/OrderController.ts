import { Request, Response, NextFunction } from 'express';
import { OrderModel } from '../models/OrderModel';
import { validationResult } from 'express-validator';
import { OrderFilters } from '../types/types';

export class OrderController {
    constructor(private model: OrderModel) { }

    createOrder = async (req: Request, res: Response, next: NextFunction) => {
        const { image_id, customer_email, payment_method } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            await this.model.create(
                image_id,
                customer_email,
                payment_method
            );
            res.status(201).json({
                message: "Correctly purchased image :)"
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
                            location: "body"
                        }
                    ]
                });
            }
            // Pass other errors to the error handler middleware
            next(error);
        }

    }

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

            // handle errors from validateGetOrder
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