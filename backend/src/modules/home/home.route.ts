import { Router } from 'express';
import { HomeController } from './home.controller';

const router = Router();

router.get('/', HomeController.getHomeStats);

export { router as HomeRoutes };
