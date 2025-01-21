import { Request, Response, NextFunction } from 'express';
import { SatelliteImageModel } from '../models/SatelliteImageModel';
import { validationResult } from 'express-validator';
import { SatelliteImageFilters } from '../types/types';

/**
 * Controller for handling operations related to satellite images.
 */
export class SatelliteImageController {
    constructor(private model: SatelliteImageModel) {}

    /**
     * Retrieves a paginated list of satellite images based on provided filters.
     * @param req - The Express request object containing query parameters for filters, page, and limit.
     * @param res - The Express response object for sending the response.
     * @param next - The next middleware function in the chain.
     */
    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            // Validate pagination parameters
            if (page < 1 || limit < 1) {
                return res.status(400).json({
                    error: 'Invalid pagination parameters',
                    message: 'Page and limit must be positive integers'
                });
            }

            // Extract filter properties from query parameters
            const { page: _, limit: __, ...filterParams } = req.query;
            const filters: SatelliteImageFilters = filterParams;

            // Validate incoming request using express-validator
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Retrieve data and total count from the model
            const { data, total } = await this.model.getAll(filters, page, limit);

            // Send response with data and pagination information
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

    /**
     * Retrieves a specific satellite image by its ID.
     * @param req - The Express request object containing the ID in the route parameters.
     * @param res - The Express response object for sending the response.
     * @param next - The next middleware function in the chain.
     */
    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id);

            // Validate incoming request using express-validator
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Retrieve the satellite image by ID
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