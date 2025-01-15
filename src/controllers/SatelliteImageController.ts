import { Request, Response, NextFunction } from 'express';
import { SatelliteImageModel } from '../models/SatelliteImage';
import { SatelliteImageFilters } from '../types';

export class SatelliteImageController {
    constructor(private model: SatelliteImageModel) {}

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const filters: SatelliteImageFilters = req.query;
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

            const images = await this.model.getAll(query, params);
            res.json(images);
        } catch (error) {
            next(error);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id);
            // Check if id is NaN (which happens if parsing fails)
            if (isNaN(id)) {
                return res.status(400).json({
                    error: 'Invalid ID format',
                    message: 'ID must be a number'
                });
            }
            // Check if id is negative or not an integer
            if (id < 0 || !Number.isInteger(id)) {
                return res.status(400).json({
                    error: 'Invalid ID value',
                    message: 'ID must be a positive integer'
                });
            }
            const image = await this.model.getById(id);
            if (!image) {
                return res.status(404).json({ message: 'Image not found' });
            }
            res.json(image);
        } catch (error) {
            next(error);
        }
    };
}