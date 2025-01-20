import { Pool } from 'pg';
import request from 'supertest';
import { app } from '../app';
import { createPool } from '../config/db';

describe('Satellite Images API Integration Tests', () => {
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

    describe('GET /api/images/', () => {
        it('should return the correct filtered satellite image data', async () => {
            const response = await request(app)
                .get('/api/images?acquisitionDate=2024-01-18')
                .expect(200);

            // Extract the 'data' array from the response
            const responseData = response.body.data;

            // Verify that the 'data' array contains the expected object
            expect(responseData[0]).toMatchObject({
                catalog_id: expect.any(Number),
                acquisition_date_start: expect.any(String),
                acquisition_date_end: expect.any(String),
                off_nadir: expect.any(String),
                resolution: expect.any(String),
                cloud_coverage: expect.any(String),
                sensor: expect.any(String),
                scan_direction: expect.any(String),
                satellite_elevation: expect.any(String),
                image_bands: expect.any(String),
                geometry: {
                    type: "Polygon",
                    coordinates: expect.arrayContaining([
                        expect.arrayContaining([
                            expect.arrayContaining([expect.any(Number)])
                        ])
                    ])
                }
            });

            // Verify specific values from your example
            expect(responseData[0]).toEqual({
                catalog_id: 11,
                acquisition_date_start: "2024-01-18T11:14:26.000Z",
                acquisition_date_end: "2024-01-18T11:14:33.000Z",
                off_nadir: "12.59",
                resolution: "0.33",
                cloud_coverage: "31.02",
                sensor: "SEN2",
                scan_direction: "Reverse",
                satellite_elevation: "76.17",
                image_bands: "8-BANDS",
                geometry: {
                    type: "Polygon",
                    coordinates: [
                        [
                            [
                                126.968901225,
                                37.572971567
                            ],
                            [
                                126.968901225,
                                37.558001436
                            ],
                            [
                                126.988083699,
                                37.558001436
                            ],
                            [
                                126.988083699,
                                37.572971567
                            ],
                            [
                                126.968901225,
                                37.572971567
                            ]
                        ]
                    ]
                }
            });
        });

        it('should return the correct filtered satellite image data for two records', async () => {
            const response = await request(app)
                .get('/api/images?sensor=WV03&scanDirection=Forward')
                .expect(200);

            // Extract the 'data' array from the response and ensure it has a proper type
            const responseData: Array<{
                catalog_id: number;
                acquisition_date_start: string;
                acquisition_date_end: string;
                off_nadir: string;
                resolution: string;
                cloud_coverage: string;
                sensor: string;
                scan_direction: string;
                satellite_elevation: string;
                image_bands: string;
                geometry: {
                    type: string;
                    coordinates: number[][][][];
                };
            }> = response.body.data;

            // Verify the response contains exactly 2 records
            expect(responseData).toHaveLength(2);

            // Define the expected structure for validation
            const expectedStructure = {
                catalog_id: expect.any(Number),
                acquisition_date_start: expect.any(String),
                acquisition_date_end: expect.any(String),
                off_nadir: expect.any(String),
                resolution: expect.any(String),
                cloud_coverage: expect.any(String),
                sensor: expect.any(String),
                scan_direction: expect.any(String),
                satellite_elevation: expect.any(String),
                image_bands: expect.any(String),
                geometry: {
                    type: "Polygon",
                    coordinates: expect.arrayContaining([
                        expect.arrayContaining([
                            expect.arrayContaining([expect.any(Number)])
                        ])
                    ])
                }
            };

            // Verify each record matches the expected structure
            responseData.forEach((record) => {
                expect(record).toMatchObject(expectedStructure);
            });

            // Verify specific values for both records
            expect(responseData[1]).toEqual({
                catalog_id: 24,
                acquisition_date_start: "2024-01-12T08:18:50.000Z",
                acquisition_date_end: "2024-01-12T08:18:57.000Z",
                off_nadir: "10.50",
                resolution: "0.32",
                cloud_coverage: "10.60",
                sensor: "WV03",
                scan_direction: "Forward",
                satellite_elevation: "79.35",
                image_bands: "4-BANDS",
                geometry: {
                    type: "Polygon",
                    coordinates: [
                        [
                            [
                                115.78593906,
                                -31.879539135
                            ],
                            [
                                115.78593906,
                                -32.05974165
                            ],
                            [
                                115.993824152,
                                -32.05974165
                            ],
                            [
                                115.993824152,
                                -31.879539135
                            ],
                            [
                                115.78593906,
                                -31.879539135
                            ]
                        ]
                    ]
                }
            });

            expect(responseData[0]).toEqual({
                catalog_id: 19,
                acquisition_date_start: "2023-11-22T13:45:40.000Z",
                acquisition_date_end: "2023-11-22T13:45:47.000Z",
                off_nadir: "9.25",
                resolution: "0.28",
                cloud_coverage: "32.80",
                sensor: "WV03",
                scan_direction: "Forward",
                satellite_elevation: "76.12",
                image_bands: "4-BANDS",
                geometry: {
                    type: "Polygon",
                    coordinates: [
                        [
                            [
                                -123.33651826,
                                49.3691538
                            ],
                            [
                                -123.33651826,
                                49.070895348
                            ],
                            [
                                -122.809741353,
                                49.070895348
                            ],
                            [
                                -122.809741353,
                                49.3691538
                            ],
                            [
                                -123.33651826,
                                49.3691538
                            ]
                        ]
                    ]
                }
            });
        });

        it('should return the correct filtered satellite image data when filtering by bounding box (spatial query)', async () => {
            const response = await request(app)
                .get('/api/images?bbox=11.41,48.06,11.67,48.21')
                .expect(200);

            // Extract the 'data' array from the response and ensure it has a proper type
            const responseData: Array<{
                catalog_id: number;
                acquisition_date_start: string;
                acquisition_date_end: string;
                off_nadir: string;
                resolution: string;
                cloud_coverage: string;
                sensor: string;
                scan_direction: string;
                satellite_elevation: string;
                image_bands: string;
                geometry: {
                    type: string;
                    coordinates: number[][][][];
                };
            }> = response.body.data;

            // Verify the response contains exactly 2 records
            expect(responseData).toHaveLength(1);

            // Define the expected structure for validation
            const expectedStructure = {
                catalog_id: expect.any(Number),
                acquisition_date_start: expect.any(String),
                acquisition_date_end: expect.any(String),
                off_nadir: expect.any(String),
                resolution: expect.any(String),
                cloud_coverage: expect.any(String),
                sensor: expect.any(String),
                scan_direction: expect.any(String),
                satellite_elevation: expect.any(String),
                image_bands: expect.any(String),
                geometry: {
                    type: "Polygon",
                    coordinates: expect.arrayContaining([
                        expect.arrayContaining([
                            expect.arrayContaining([expect.any(Number)])
                        ])
                    ])
                }
            };

            // Verify each record matches the expected structure
            responseData.forEach((record) => {
                expect(record).toMatchObject(expectedStructure);
            });

            // Verify specific values for both records
            expect(responseData[0]).toEqual({
                catalog_id: 1,
                acquisition_date_start: "2023-09-22T11:14:26.000Z",
                acquisition_date_end: "2023-09-22T11:14:33.000Z",
                off_nadir: "12.59",
                resolution: "0.33",
                cloud_coverage: "31.02",
                sensor: "WV03",
                scan_direction: "Reverse",
                satellite_elevation: "76.17",
                image_bands: "8-BANDS",
                geometry: {
                    type: "Polygon",
                    coordinates: [
                        [
                            [
                                11.410587274,
                                48.212623997
                            ],
                            [
                                11.410587274,
                                48.065735887
                            ],
                            [
                                11.676255132,
                                48.065735887
                            ],
                            [
                                11.676255132,
                                48.212623997
                            ],
                            [
                                11.410587274,
                                48.212623997
                            ]
                        ]
                    ]
                }
            });
        });

        it('should return an empty data array when no records match the filter', async () => {
            const response = await request(app)
                .get('/api/images?sensor=NonExistentSensor')
                .expect(200);
    
            // Extract the 'data' array from the response
            const responseData = response.body.data;
    
            // Verify the response contains an empty array
            expect(responseData).toEqual([]);
        });

    });
});