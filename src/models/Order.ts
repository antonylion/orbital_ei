import { Pool } from 'pg';
import { Order, PaymentMethod } from '../types';

export class OrderModel {
    constructor(private pool: Pool) {}

    async create(imageId: Number, customerEmail: string, paymentMenthod: PaymentMethod): Promise<Order> {
        const result = await this.pool.query(
            'INSERT INTO orders (image_id, customer_email, payment_method) VALUES ($1, $2, $3)',
            [imageId, customerEmail, paymentMenthod]
        );
        return result.rows[0];
    }

    async getAll(queryWithFilters: string, params: any[]): Promise<Order[]> {
        const result = await this.pool.query(queryWithFilters, params);
        return result.rows;
    }
}