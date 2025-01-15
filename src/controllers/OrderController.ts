import { Request, Response, NextFunction } from 'express';
import { OrderModel } from '../models/Order';
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

            const filters: OrderFilters = req.query;
            let query = 'SELECT * FROM orders WHERE 1=1';
            const params: any[] = [];
            let paramCount = 1;

            // Customer email filter
            if (filters.customerEmail) {
                query += ` AND customer_email = $${paramCount}`;
                params.push(filters.customerEmail);
                paramCount++;
            }

            // Date filter
            if (filters.createdAt) {
                query += ` AND DATE(created_at) = DATE($${paramCount})`;
                params.push(filters.createdAt);
                paramCount++;
            }

            // Payment method filter
            if (filters.paymentMethod) {
                query += ` AND payment_method = $${paramCount}`;
                params.push(filters.paymentMethod);
                paramCount++;
            }

            // Image id filter
            if (filters.imageId !== undefined) {
                query += ` AND image_id = $${paramCount}`;
                params.push(filters.imageId);
                paramCount++;
            }

            const orders = await this.model.getAll(query, params);
            res.json(orders);
        } catch (error) {
            next(error);
        }
    };
}