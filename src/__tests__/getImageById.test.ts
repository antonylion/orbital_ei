import { Pool } from 'pg';
import request from 'supertest';
import { app } from '../app';
import { createPool } from '../config/db';

/**
 * The following unit tests have been created with ChatGPT.
 */
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

  describe('GET /api/images/:id', () => {
    it('should return the correct satellite image data', async () => {
      const response = await request(app)
        .get('/api/images/1')
        .expect(200);

      // Verify the response structure matches the expected format
      expect(response.body).toMatchObject({
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
      expect(response.body).toEqual({
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
          coordinates: [[[11.410587274, 48.212623997], [11.410587274, 48.065735887], [11.676255132, 48.065735887], [11.676255132, 48.212623997], [11.410587274, 48.212623997]]]
        }
      });
    });

    it('should return 404 for non-existent image', async () => {
      await request(app)
        .get('/api/images/999')
        .expect(404);
    });
  });
});