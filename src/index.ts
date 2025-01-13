import express from 'express';
import { createPool } from './config/db';
import { errorHandler } from './middlewares/ErrorHandler';
import { SatelliteImageModel } from './models/SatelliteImage';
import { OrderModel } from './models/Order';
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

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;