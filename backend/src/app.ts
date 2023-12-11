import express from 'express';
import cors from 'cors';
import { errorHandler, wrongEndpointHandler } from './middlewares';
import { CategoryRoutes } from './modules/category/category.route';

const app = express();

app.use(cors());

// Routes
app.use('/categories', CategoryRoutes);

app.use(wrongEndpointHandler);

app.use(errorHandler);

export default app;
