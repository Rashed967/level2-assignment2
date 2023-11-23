import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

// user routes
router.post('/', userControllers.createUser);
router.get('/', userControllers.getAllUser);

export const userRoutes = router;
