import express from 'express';
import cors from 'cors';
import { errorHandler, wrongEndpointHandler } from './middlewares';
import { CategoryRoutes } from './modules/category/category.route';
import { ProductRoutes } from './modules/product/product.route';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/categories', CategoryRoutes);
app.use('/products', ProductRoutes);

app.use(wrongEndpointHandler);

app.use(errorHandler);

export default app;
