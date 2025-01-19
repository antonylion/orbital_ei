import { Request, Response, NextFunction } from 'express';
import { SatelliteImageModel } from '../models/SatelliteImageModel';
import { validationResult } from 'express-validator';
import { SatelliteImageFilters } from '../types/types';

export class SatelliteImageController {
    constructor(private model: SatelliteImageModel) {}

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Handle pagination parameters separately
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
    
            // Validate pagination parameters
            if (page < 1 || limit < 1) {
                return res.status(400).json({
                    error: 'Invalid pagination parameters',
                    message: 'Page and limit must be positive integers'
                });
            }
    
            // Extract only the filter properties for SatelliteImageFilters
            const { page: _, limit: __, ...filterParams } = req.query;
            const filters: SatelliteImageFilters = filterParams;
            
            // handle errors from validateGetOrder
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { data, total } = await this.model.getAll(filters, page, limit);
            
            res.json({
                data,
                pagination: {
                    currentPage: page,
                    pageSize: limit,
                    totalItems: total,
                    totalPages: Math.ceil(total / limit)
                }
            });
        } catch (error) {
            next(error);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id);
            // handle errors from validateGetOrder
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            const image = await this.model.getById(id);
    
            if (!image) {
                return res.status(404).json({
                    errors: [
                        {
                            type: "custom",
                            value: id,
                            msg: "The image you are trying to retrieve does not exist in our database",
                            path: "image_id",
                            location: "body"
                        }
                    ]
                });
            }
    
            res.json(image);
        } catch (error) {
            next(error);
        }
    };    
}