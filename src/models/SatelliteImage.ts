import { Pool } from 'pg';
import { SatelliteImage } from '../types';

export class SatelliteImageModel {
    constructor(private pool: Pool) {}

    async getAll(): Promise<SatelliteImage[]> {
        const result = await this.pool.query(
            'SELECT *, ST_AsGeoJSON(geometry)::json as geometry FROM images'
        );
        return result.rows;
    }

    async getById(id: string): Promise<SatelliteImage | null> {
        const result = await this.pool.query(
            'SELECT *, ST_AsGeoJSON(geometry)::json as geometry FROM images WHERE catalog_id = $1',
            [id]
        );
        return result.rows[0] || null;
    }
}