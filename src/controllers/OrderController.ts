import { Request, Response, NextFunction } from 'express';
import { OrderModel } from '../models/Order';
import { validationResult } from 'express-validator';
import { PaymentMethod } from '../types';

export class OrderController {
    constructor(private model: OrderModel) {}
    
    createOrder = async (req: Request, res: Response, next: NextFunction) => {
        const { image_id, customer_email, payment_method } = req.body;
        // customer_email.isEmail().withMessage('Valid email required');
        // paymentMethod -> isValidPaymentMethod
        const errors = validationResult(req);

        // Validate payment_method -> Source: ChatGPT
        if (!Object.values(PaymentMethod).includes(payment_method)) {
            return res.status(400).json({
                message: `Invalid payment method. Allowed values are: ${Object.values(PaymentMethod).join(", ")}`,
            });
        }

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const order = await this.model.create(
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
            // Check for invalid payment method


            // Pass other errors to the error handler middleware
            next(error);
        }

    }

    getOrders = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orders = await this.model.getAll();
            res.json(orders);
        } catch (error) {
            next(error);
        }
    };
}