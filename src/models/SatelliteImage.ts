import { Pool } from 'pg';
import { SatelliteImage, SatelliteImageFilters } from '../types';

export class SatelliteImageModel {
    constructor(private pool: Pool) {}

    async getAll(filters: SatelliteImageFilters): Promise<SatelliteImage[]> {

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