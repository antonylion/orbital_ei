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
            const orders = await this.model.getAll(filters);
            res.json(orders);
        } catch (error) {
            next(error);
        }
    };
}