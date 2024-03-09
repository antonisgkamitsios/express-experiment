import express from 'express';
import { login, logout, register } from '../controllers/authController.ts';
import { currentUser } from '../auth.ts';

const router = express.Router();

router.use(currentUser)

router.post('/login', login);
router.post('/logout', logout)
router.post('/register', register);

export { router as authRouter };
