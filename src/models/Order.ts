import { Pool } from 'pg';
import { Order, OrderFilters, PaymentMethod } from '../types';

export class OrderModel {
    constructor(private pool: Pool) {}

    async create(imageId: Number, customerEmail: string, paymentMenthod: PaymentMethod): Promise<Order> {
        const result = await this.pool.query(
            'INSERT INTO orders (image_id, customer_email, payment_method) VALUES ($1, $2, $3)',
            [imageId, customerEmail, paymentMenthod]
        );
        return result.rows[0];
    }

    async getAll(filters: OrderFilters): Promise<Order[]> {

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
        
        const result = await this.pool.query(query, params);
        return result.rows;
    }
}