import { Router } from 'express';
import { SatelliteImageController } from '../controllers/SatelliteImageController';
import { validateId, validateSatelliteImageFilters } from '../middlewares/SatelliteImageValidator'

/**
 * Creates an Express router for SatelliteImage-related routes.
 * @param controller - The SatelliteImageController instance to handle order logic.
 * @returns An Express Router with configured SatelliteImage routes.
 */
export function createSatelliteImageRouter(controller: SatelliteImageController): Router {
    const router = Router();

    /**
     * GET / - Retrieve all satellite images optionally matching SatelliteImageFilters.
     * Middleware: validateSatelliteImageFilters
     * Controller: controller.getAll
     */
    router.get('/', validateSatelliteImageFilters, controller.getAll.bind(controller));
    
    /**
     * GET / - Retrieve the SatelliteImage uniquely identified by id.
     * Middleware: validateId
     * Controller: controller.getById
     */
    router.get('/:id', validateId, controller.getById.bind(controller));

    return router;
}