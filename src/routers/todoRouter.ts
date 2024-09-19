import express from 'express';
import { getTodo, getTodos, postTodo } from '../handlers/todoHandler.ts';
import { currentUser, isAuthenticated } from '@/auth.ts';

const router = express.Router();
router.use((req, _res, next) => {
  console.log('request for', req.url);
  next();
});
router.get('/', currentUser, isAuthenticated, getTodos);
router.get('/:id', getTodo);
router.post('/', postTodo);

export { router as todoRouter };
