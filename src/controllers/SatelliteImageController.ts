import { Request, Response, NextFunction } from 'express';
import { SatelliteImageModel } from '../models/SatelliteImage';
import { SatelliteImageFilters } from '../types';

export class SatelliteImageController {
    constructor(private model: SatelliteImageModel) {}

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const filters: SatelliteImageFilters = req.query;
            const images = await this.model.getAll(filters);
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