import express from 'express';
import { getTodo, getTodos, postTodo } from '../controllers/todoController.ts';

const router = express.Router();
router.use((req, _res, next) => {
  console.log('request for', req.url);
  next();
});
router.get('/', getTodos);
router.get('/:id', getTodo);
router.post('/', postTodo);

export { router as todoRouter };
