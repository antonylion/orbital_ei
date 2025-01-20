import { Pool } from 'pg';
import request from 'supertest';
import { app } from '../app';
import { createPool } from '../config/db';

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

    describe('GET /api/orders/', () => {
        it('should return the correct filtered orders', async () => {
            const response = await request(app)
                .get('/api/orders?paymentMethod=PayPal')
                .expect(200);

            // Extract the 'data' array from the response and ensure it has a proper type
            const responseData: Array<{
                order_id: number;
                image_id: number;
                customer_email: string;
                created_at: string;
                payment_method: string;
            }> = response.body.data;

            // Verify the response contains exactly 3 records
            expect(responseData).toHaveLength(3);

            // Define the expected structure for validation
            const expectedStructure = {
                order_id: expect.any(Number),
                image_id: expect.any(Number),
                customer_email: expect.any(String),
                created_at: expect.any(String),
                payment_method: expect.any(String),
            };

            // Verify each record matches the expected structure
            responseData.forEach((record) => {
                expect(record).toMatchObject(expectedStructure);
            });

            // Verify specific values for all records
            expect(responseData[0]).toEqual({
                order_id: 3,
                image_id: 7,
                customer_email: "antony.zappacosta@oulook.com",
                created_at: "2025-01-19T15:53:40.281Z",
                payment_method: "PayPal",
            });

            expect(responseData[1]).toEqual({
                order_id: 5,
                image_id: 13,
                customer_email: "antony.zappacosta@gmail.com",
                created_at: "2025-01-19T15:53:40.287Z",
                payment_method: "PayPal",
            });

            expect(responseData[2]).toEqual({
                order_id: 7,
                image_id: 5,
                customer_email: "antony@zappacosta.com",
                created_at: "2023-09-22T11:14:26.000Z",
                payment_method: "PayPal",
            });

        });

        it('should return an empty data array when no records match the filter', async () => {
            const response = await request(app)
                .get('/api/orders?customerEmail=nonexistent@email.it')
                .expect(200);
    
            // Extract the 'data' array from the response
            const responseData = response.body.data;
    
            // Verify the response contains an empty array
            expect(responseData).toEqual([]);
        });

    });
});