import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './modules/user/user.routes';
import productRoutes from './modules/product/product.routes';
import orderRoutes from './modules/order/order.routes';
import cartRoutes from './modules/cart/cart.routes';

import { errorHandler } from './modules/middlewares/errorHandler';
import routeNotFoundHandler from './modules/middlewares/routeNotFoundHandler';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Optional root route (but fixed!)
app.get('/', (_req, res) => {
  res.send('🟢 E-Commerce Backend is Running!');
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

// Error Handlers (should come after all routes)
app.use(errorHandler);
app.use(routeNotFoundHandler);

export default app;
