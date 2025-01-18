import express from 'express';
import { createPool } from './config/db';
import { errorHandler } from './middlewares/ErrorHandler';
import { SatelliteImageModel } from './models/SatelliteImageModel';
import { OrderModel } from './models/OrderModel';
import { SatelliteImageController } from './controllers/SatelliteImageController';
import { OrderController } from './controllers/OrderController';
import { createSatelliteImageRouter } from './routes/SatelliteImageRoute';
import { createOrderRouter } from './routes/OrderRoute';

const app = express();
const pool = createPool();

// Middleware
app.use(express.json());

// Models
const satelliteImageModel = new SatelliteImageModel(pool);
const orderModel = new OrderModel(pool);

// Controllers
const satelliteImageController = new SatelliteImageController(satelliteImageModel);
const orderController = new OrderController(orderModel);

// Routes
app.use('/api/images', createSatelliteImageRouter(satelliteImageController));
app.use('/api/orders', createOrderRouter(orderController));

// Catch-all route for non-existing API endpoints
app.use((req, res, next) => {
    res.status(404).json({
        error: 'Not Found',
        message: `The route ${req.originalUrl} does not exist.`,
    });
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;