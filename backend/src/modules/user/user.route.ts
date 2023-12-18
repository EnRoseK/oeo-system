import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();

router.get('/', UserController.getFilterdUsers);
router.post('/', UserController.createUser);
router.delete('/:id', UserController.removeUser);

export { router as UserRoutes };
