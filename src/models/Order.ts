import { Pool } from 'pg';
import { Order, PaymentMethod } from '../types';

export class OrderModel {
    constructor(private pool: Pool) {}

    async create(imageId: Number, customerEmail: string, createdAt: string, paymentMenthod: PaymentMethod): Promise<Order> {
        const result = await this.pool.query(
            'INSERT INTO orders (image_id, customer_email, created_at, payment_method) VALUES ($1, $2, $3, $4)',
            [imageId, customerEmail, createdAt, paymentMenthod]
        );
        return result.rows[0];
    }

    async getAllByCustomer(customerEmail: string): Promise<Order[]> {
        const result = await this.pool.query(
            'SELECT o.*, si.catalog_id FROM orders o JOIN satellite_images si ON o.image_id = si.id WHERE customer_email = $1',
            [customerEmail]
        );
        return result.rows;
    }

    async getAll(): Promise<Order[]> {
        const result = await this.pool.query(
            'SELECT o.* FROM orders o',
        );
        return result.rows;
    }
}