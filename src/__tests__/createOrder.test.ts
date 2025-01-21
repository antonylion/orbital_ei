import { Pool } from 'pg';
import request from 'supertest';
import { app } from '../app';
import { createPool } from '../config/db';
import { PaymentMethod } from "../types/types";

/**
 * The following unit tests have been created with ChatGPT.
 */
describe('Orders API Integration Tests', () => {
    let pool: Pool;

    beforeAll(async () => {
        if (!process.env.DB_USER || !process.env.DB_PSWD || !process.env.DB_HOST) {
            throw new Error('Database connection variables are missing');
        }

        pool = createPool();
        // Test the connection
        try {
            await pool.query('SELECT NOW()');
        } catch (err) {
            console.error('Database connection failed:', {
                error: err.message,
                code: err.code,
                errno: err.errno,
                syscall: err.syscall,
                hostname: err.hostname,
            });
            throw err;
        }
    });

    afterAll(async () => {
        // Close the pool
        await pool.end();
    });

    describe('POST /api/orders/', () => {
        it('should return newly inserted order', async () => {
            // Prepare the data for the order
            const orderData = {
                image_id: 12,
                customer_email: 'test@example.com',
                payment_method: 'Credit Card',
            };

            // Send the POST request
            const response = await request(app)
                .post('/api/orders')
                .send(orderData)
                .expect(201); // Expect a 201 response for successful creation

            // Verify the response body
            expect(response.body.message).toBe("Correctly purchased image :)");
            expect(response.body.order).toHaveProperty('order_id');
            expect(response.body.order).toHaveProperty('image_id', orderData.image_id);
            expect(response.body.order).toHaveProperty('customer_email', orderData.customer_email);
            expect(response.body.order).toHaveProperty('payment_method', orderData.payment_method);
        });

        it('should return 400 if image does not exist', async () => {
            // Prepare the data for the order with a non-existent image_id
            const orderData = {
                image_id: 67,
                customer_email: 'test@example.com',
                payment_method: 'Credit Card',
            };

            // Send the POST request
            const response = await request(app)
                .post('/api/orders')
                .send(orderData)
                .expect(400); // Expect a 400 response for invalid order (image not found)

            // Verify the error message
            expect(response.body.errors[0].msg).toBe("The image you are trying to order does not exist in our database");
            expect(response.body.errors[0].path).toBe("image_id");
        });

        it('should return 400 if paymenth method is not accepted', async () => {
            // Prepare the data for the order with an invalid payment method
            const orderData = {
                image_id: 2,
                customer_email: 'me@example.com',
                payment_method: 'bitcoin',
            };

            // Send the POST request
            const response = await request(app)
                .post('/api/orders')
                .send(orderData)
                .expect(400); // Expect a 400 response for invalid order (image not found)

            // Verify the error message
            expect(response.body.errors[0].msg).toBe(`Invalid payment method. Allowed values are: ${Object.values(PaymentMethod).join(", ")}`);
            expect(response.body.errors[0].path).toBe("payment_method");
        });

        it('should return 400 if email adress is not well formatted', async () => {
            // Prepare the data for the order with an invalid email address
            const orderData = {
                image_id: 2,
                customer_email: 'me#example.com',
                payment_method: 'PayPal',
            };

            // Send the POST request
            const response = await request(app)
                .post('/api/orders')
                .send(orderData)
                .expect(400); // Expect a 400 response for invalid order (image not found)

            // Verify the error message
            expect(response.body.errors[0].msg).toBe("Valid email address is required");
            expect(response.body.errors[0].path).toBe("customer_email");
        });
    });
});