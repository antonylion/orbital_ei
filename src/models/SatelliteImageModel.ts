import { Pool } from 'pg';
import { SatelliteImage, SatelliteImageFilters } from '../types';

export class SatelliteImageModel {
    constructor(private pool: Pool) { }

    async getAll(filters: SatelliteImageFilters, page: number, limit: number): Promise<{ data: SatelliteImage[], total: number }> {

        try {
            let query = 'SELECT *, ST_AsGeoJSON(geometry)::json as geometry FROM images WHERE 1=1';
            const params: any[] = [];
            let paramCount = 1;

            // Acquisition date filter
            if (filters.acquisitionDate) {
                query += ` AND DATE(acquisition_date_start) = DATE($${paramCount})`;
                params.push(filters.acquisitionDate);
                paramCount++;
            }
            // off-nadir filter
            if (filters.offNadir !== undefined) {
                query += ` AND off_nadir = $${paramCount}`;
                params.push(filters.offNadir);
                paramCount++;
            }
            // resolution filter
            if (filters.resolution !== undefined) {
                query += ` AND resolution = $${paramCount}`;
                params.push(filters.resolution);
                paramCount++;
            }
            // Cloud coverage filter
            if (filters.minCloudCoverage !== undefined) {
                query += ` AND cloud_coverage >= $${paramCount}`;
                params.push(filters.minCloudCoverage);
                paramCount++;
            }
            if (filters.maxCloudCoverage !== undefined) {
                query += ` AND cloud_coverage <= $${paramCount}`;
                params.push(filters.maxCloudCoverage);
                paramCount++;
            }
            // Sensor filter
            if (filters.sensor) {
                query += ` AND sensor = $${paramCount}`;
                params.push(filters.sensor);
                paramCount++;
            }
            // Scan direction filter
            if (filters.scanDirection) {
                query += ` AND scan_direction = $${paramCount}`;
                params.push(filters.scanDirection);
                paramCount++;
            }
            // Satellite elevation filter
            if (filters.satelliteElevation !== undefined) {
                query += ` AND satellite_elevation = $${paramCount}`;
                params.push(filters.satelliteElevation);
                paramCount++;
            }
            // Image bands filter
            if (filters.imageBands) {
                query += ` AND image_bands = $${paramCount}`;
                params.push(filters.imageBands);
                paramCount++;
            }

            // Geometry bbox filter
            // find images within the boundaries of a specific area of interest
            if (filters.bbox) {
                const [minLon, minLat, maxLon, maxLat] = filters.bbox.split(',').map(Number);
                query += ` AND ST_Intersects(
              geometry,
              ST_MakeEnvelope($${paramCount}, $${paramCount + 1}, $${paramCount + 2}, $${paramCount + 3}, 4326)
            )`;
                params.push(minLon, minLat, maxLon, maxLat);
                paramCount += 4;
            }

            const offset = (page - 1) * limit;

            // Create count query
            const countQuery = query.replace('SELECT *, ST_AsGeoJSON(geometry)::json as geometry', 'SELECT COUNT(*)');

            // Add pagination to the main query
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
            throw new Error('DATABASE_ERROR');
        }
    }

    async getById(id: number): Promise<SatelliteImage> {
        try {
            //TODO: understand which errors may come from DB, catch, process and send them accordingly to the controller
            const result = await this.pool.query(
                'SELECT *, ST_AsGeoJSON(geometry)::json as geometry FROM images WHERE catalog_id = $1',
                [id]
            );
            return result.rows[0];
        } catch(error){
            // Log error if needed and rethrow
            //TODO: understand which OTHER errors may come from DB, catch, process and send them accordingly to the controller
            // database not reachable? because off?
            // violating a check -> e.g. payment method for filtering
            // invalid input type? e.g. characters not accepted
            // invalid input type -> json fields not accepted
            // data length vilations
            throw new Error('DATABASE_ERROR');
        }
    }
}