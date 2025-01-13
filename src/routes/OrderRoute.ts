import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';
import { validateCreateOrder } from '../middlewares/OrderValidator'

export function createOrderRouter(controller: OrderController): Router {
    const router = Router();

    router.post('/', validateCreateOrder, controller.createOrder.bind(controller));
    router.get('/', controller.getOrders.bind(controller));

    return router;
}