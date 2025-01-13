import { Request, Response, NextFunction } from 'express';
import { OrderModel } from '../models/Order';
import { validationResult } from 'express-validator';

export class OrderController {
    constructor(private model: OrderModel) {}
    
    createOrder = async (req: Request, res: Response, next: NextFunction) => {
        const { image_id, customer_email, payment_method } = req.body;
        // image_id must exist
        //customer_email.isEmail().withMessage('Valid email required');
        // paymentMethod -> isValidPaymentMethod
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const order = await this.model.create(
                image_id,
                customer_email,
                payment_method
            );
            res.status(201).json(order);
        } catch (error) {
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