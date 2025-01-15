import { Request, Response, NextFunction } from 'express';
import { OrderModel } from '../models/OrderModel';
import { validationResult } from 'express-validator';
import { OrderFilters } from '../types';

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
            // Check for foreign key violation (Postgres error code 23503)
            if (error.code === '23503' && error.constraint === 'orders_image_id_fkey') {
                return res.status(400).json({
                    message: "The image you are trying to order does not exist in our database"
                });
            }

            // Pass other errors to the error handler middleware
            next(error);
        }

    }

    getOrders = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Handle pagination parameters separately
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
    
            // Validate pagination parameters
            if (page < 1 || limit < 1) {
                return res.status(400).json({
                    error: 'Invalid pagination parameters',
                    message: 'Page and limit must be positive integers'
                });
            }
            // Extract only the filter properties for OrderFilters
            const { page: _, limit: __, ...filterParams } = req.query;
            const filters: OrderFilters = filterParams;
            const { data, total } = await this.model.getAll(filters, page, limit);
            res.json({
                data,
                pagination: {
                    currentPage: page,
                    pageSize: limit,
                    totalItems: total,
                    totalPages: Math.ceil(total / limit)
                }
            });
        } catch (error) {
            next(error);
        }
    };
}