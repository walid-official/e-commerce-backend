import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './modules/user/user.routes';

// import productRoutes from './modules/product/product.routes';
// import orderRoutes from './modules/order/order.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// app.use('/', () => {
//     console.log("This is Main server")
// });
app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);

export default app;
