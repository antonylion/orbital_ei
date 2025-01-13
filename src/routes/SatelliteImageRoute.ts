import { Router } from 'express';
import { SatelliteImageController } from '../controllers/SatelliteImageController';

export function createSatelliteImageRouter(controller: SatelliteImageController): Router {
    const router = Router();

    router.get('/', controller.getAll.bind(controller));
    router.get('/:id', controller.getById.bind(controller));

    return router;
}