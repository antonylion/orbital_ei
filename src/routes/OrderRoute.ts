import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';
import { validateCreateOrder, validateGetOrders } from '../middlewares/OrderValidator';

/**
 * Creates an Express router for order-related routes.
 * @param controller - The OrderController instance to handle order logic.
 * @returns An Express Router with configured order routes.
 */
export function createOrderRouter(controller: OrderController): Router {
    const router = Router();

    /**
     * POST / - Create a new order.
     * Middleware: validateCreateOrder
     * Controller: controller.createOrder
     */
    router.post('/', validateCreateOrder, controller.createOrder.bind(controller));

    /**
     * GET / - Retrieve all orders optionally matching OrderFilters.
     * Middleware: validateGetOrders
     * Controller: controller.getOrders
     */
    router.get('/', validateGetOrders, controller.getOrders.bind(controller));

    return router;
}