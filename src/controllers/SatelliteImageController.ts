import { Request, Response, NextFunction } from 'express';
import { SatelliteImageModel } from '../models/SatelliteImage';

export class SatelliteImageController {
    constructor(private model: SatelliteImageModel) {}

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const images = await this.model.getAll();
            res.json(images);
        } catch (error) {
            next(error);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const image = await this.model.getById(req.params.id);
            if (!image) {
                return res.status(404).json({ message: 'Image not found' });
            }
            res.json(image);
        } catch (error) {
            next(error);
        }
    };
}