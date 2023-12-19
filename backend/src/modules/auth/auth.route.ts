import { Router } from 'express';
import { AuthController } from './auth.contoller';
import { validate } from '../../middlewares';
import { loginValidation } from './auth.validation';
import { authenticateUser } from '../../middlewares/auth';

const router = Router();

router.get('/me', authenticateUser, AuthController.getCurrentUser);
router.post('/login', validate(loginValidation), AuthController.login);
router.post('/logout', AuthController.logout);

export { router as AuthRoutes };
