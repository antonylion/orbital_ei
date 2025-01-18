import { Router } from 'express';
import { SatelliteImageController } from '../controllers/SatelliteImageController';
import { validateId, validateSatelliteImageFilters } from '../middlewares/SatelliteImageValidator'

export function createSatelliteImageRouter(controller: SatelliteImageController): Router {
    const router = Router();

    router.get('/', validateSatelliteImageFilters, controller.getAll.bind(controller));
    router.get('/:id', validateId, controller.getById.bind(controller));

    return router;
}