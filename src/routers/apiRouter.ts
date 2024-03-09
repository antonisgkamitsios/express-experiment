import express from 'express';
import { todoRouter } from './todoRouter.ts';
import { currentUser } from '@/auth.ts';
const router = express.Router();
router.use(currentUser);
router.use('/todos', todoRouter);

export { router as apiRouter };
