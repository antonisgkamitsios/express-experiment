import express from 'express';
import { login, loginValidator, logout, register, registerValidator } from '../controllers/authController.ts';
import { currentUser } from '../auth.ts';

const router = express.Router();

router.use(currentUser);

router.post('/login', loginValidator, login);
router.post('/logout', logout);
router.post('/register', registerValidator, register);

export { router as authRouter };
