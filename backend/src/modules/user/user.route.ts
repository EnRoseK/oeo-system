import { Router } from 'express';
import { UserController } from './user.controller';
import { validate, validateMongoId } from '../../middlewares';
import { createUserValidation, updateUserInfoValidation, updateUserPasswordValidation } from './user.validation';
import { checkUserPermission } from '../../middlewares/auth';

const router = Router();

router.patch('/info', validate(updateUserInfoValidation), UserController.changeUserInfo);
router.patch('/password', validate(updateUserPasswordValidation), UserController.changeUserPassword);
router.get('/', checkUserPermission('users', 'read'), UserController.getFilterdUsers);
router.post('/', checkUserPermission('users', 'create'), validate(createUserValidation), UserController.createUser);
router.patch('/:id', checkUserPermission('users', 'update'), validateMongoId, UserController.updateUserPermission);
router.delete('/:id', checkUserPermission('users', 'delete'), validateMongoId, UserController.removeUser);

export { router as UserRoutes };
