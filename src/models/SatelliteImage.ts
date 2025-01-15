import { Pool } from 'pg';
import { SatelliteImage } from '../types';

export class SatelliteImageModel {
    constructor(private pool: Pool) {}

    async getAll(queryWithFilters: string, params: any[]): Promise<SatelliteImage[]> {
        const result = await this.pool.query(queryWithFilters, params);
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