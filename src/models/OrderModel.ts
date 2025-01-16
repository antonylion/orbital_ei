import { Pool } from 'pg';
import { Order, OrderFilters, PaymentMethod } from '../types';

export class OrderModel {
    constructor(private pool: Pool) { }

    async create(imageId: Number, customerEmail: string, paymentMenthod: PaymentMethod) {

        try {
            await this.pool.query(
                'INSERT INTO orders (image_id, customer_email, payment_method) VALUES ($1, $2, $3)',
                [imageId, customerEmail, paymentMenthod]
            );
        } catch (error) {
            if (error.code === '23503' && error.constraint === 'orders_image_id_fkey') {
                throw new Error('IMAGE_NOT_FOUND');
            }
            //TODO: understand which OTHER errors may come from DB, catch, process and send them accordingly to the controller
            // database not reachable? because off?
            // unique constraint violation when inserting an order
            // not null constraint violation
            // violating a check -> e.g. payment method
            // invalid input type? e.g. characters not accepted
            // invalid input type -> json fields not accepted
            // data length vilations
            throw error; // Re-throw other errors
        }
    }


    /**
     * Retrieve all orders with optional filters, pagination, and total count
     * @param filters - Filtering options (customer email, date, payment method, etc.)
     * @param page - Page number for pagination
     * @param limit - Number of items per page
     * @returns An object containing an array of orders and the total count
     */
    async getAll(filters: OrderFilters, page: number, limit: number): Promise<{ data: Order[], total: number }> {

        try {
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


            // Pagination
            const offset = (page - 1) * limit;
            const countQuery = query.replace('SELECT *', 'SELECT COUNT(*)');
            query += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
            params.push(limit, offset);

            // Execute both queries
            const [countResult, dataResult] = await Promise.all([
                this.pool.query(countQuery, params.slice(0, -2)),
                this.pool.query(query, params)
            ]);

            return {
                data: dataResult.rows,
                total: parseInt(countResult.rows[0].count)
            };
        } catch (error) {
            // Log error if needed and rethrow
            //TODO: understand which OTHER errors may come from DB, catch, process and send them accordingly to the controller
            // database not reachable? because off?
            // violating a check -> e.g. payment method for filtering
            // invalid input type? e.g. characters not accepted
            // invalid input type -> json fields not accepted
            // data length vilations
            console.error('Error in getAll:', error);
            throw new Error('DATABASE_ERROR');
        }
    }
}