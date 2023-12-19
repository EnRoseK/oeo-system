import { Router } from 'express';
import { UserController } from './user.controller';
import { validate, validateMongoId } from '../../middlewares';
import { createUserValidation } from './user.validation';
import { authorizeAdmin } from '../../middlewares/auth';

const router = Router();

router.get('/', authorizeAdmin, UserController.getFilterdUsers);
router.post('/', authorizeAdmin, validate(createUserValidation), UserController.createUser);
router.delete('/:id', authorizeAdmin, validateMongoId, UserController.removeUser);

export { router as UserRoutes };
