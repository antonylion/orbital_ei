import { Pool } from 'pg';
import { SatelliteImage, SatelliteImageFilters } from '../types';

export class SatelliteImageModel {
    constructor(private pool: Pool) {}

    async getAll(filters: SatelliteImageFilters): Promise<SatelliteImage[]> {

        let query = 'SELECT *, ST_AsGeoJSON(geometry)::json as geometry FROM images WHERE 1=1';
        const params: any[] = [];
        let paramCount = 1;

        // Sensor filter
        if (filters.sensor) {
            query += ` AND sensor = $${paramCount}`;
            params.push(filters.sensor);
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
        // Date range filter
        if (filters.acquisitionDate) {
            query += ` AND DATE(acquisition_date_start) = DATE($${paramCount})`;
            params.push(filters.acquisitionDate);
            paramCount++;
        }

        const result = await this.pool.query(query, params);
        return result.rows;
    }

    async getById(id: number): Promise<SatelliteImage | null> {
        const result = await this.pool.query(
            'SELECT *, ST_AsGeoJSON(geometry)::json as geometry FROM images WHERE catalog_id = $1',
            [id]
        );
        return result.rows[0] || null;
    }
}