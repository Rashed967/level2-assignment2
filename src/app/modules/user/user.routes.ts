import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

// user routes
router.post('/', userControllers.createUser);
router.get('/', userControllers.getAllUser);
router.get('/:userId', userControllers.getAUserById);
router.put('/:userId', userControllers.updateSingleUserById);

export const userRoutes = router;
