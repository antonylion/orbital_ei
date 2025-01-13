import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';

export function createOrderRouter(controller: OrderController): Router {
    const router = Router();

    router.post('/', controller.createOrder.bind(controller));
    router.get('/', controller.getOrders.bind(controller));

    return router;
}