import express from 'express';
import cors from 'cors';
import { errorHandler, wrongEndpointHandler } from './middlewares';

const app = express();

app.use(cors());

app.use(wrongEndpointHandler);

app.use(errorHandler);

export default app;
