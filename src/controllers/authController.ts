import { Request, Response } from 'express';
import { hashString, comparePassword, persistUser, remember, forget } from '../auth.ts';
import prisma from '../db.ts';

import { body, validationResult } from 'express-validator';
import { validate } from '@/validators/validate.ts';

export const loginValidator = validate([
  body('username', 'username cannot be empty').not().isEmpty(),
  body('password', 'password cannot be empty').not().isEmpty()
]);
export async function login(req: Request, res: Response) {
  const username = req.body.username;
  const password = req.body.password;

  const rememberMe = req.body.rememberMe || false;

  if (req.currentUser) {
    res.status(400).send('already logged in?');
    return;
  }

  const testUsers = await prisma.user.count();
  console.log('uers: ', testUsers);

  const user = await prisma.user.findFirst({ where: { username: { equals: username } } });
  if (!user) {
    res.status(400).send('username or password wrong');
    return;
  }
  const hashedPassword = user.password;

  const passwordMatches = comparePassword(password, hashedPassword);

  if (passwordMatches) {
    persistUser(req, res, user);
    rememberMe ? await remember(req, res, user) : await forget(req, res, user);
    res.status(200).send('ok!');
  } else {
    res.status(400).send('username or password wrong');
  }
}

export const registerValidator = validate([
  body('username', 'username cannot be empty').not().isEmpty(),
  body('password', 'password cannot be empty').not().isEmpty(),
  body('password', 'password length must be greater than 8 characters').isLength({ min: 8 }),
  body('passwordRepeat', 'passwords do not match').custom((value, { req }) => value === req.body.password),
  body('username', 'user with this username already exists').custom(async (value, { req }) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const user = await prisma.user.findFirst({ where: { username: { equals: value } } });
      if (user) {
        throw new Error('Username already in use');
      }
    }
  })
]);

export async function register(req: Request, res: Response) {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const hashedPassword = await hashString(password);
    await prisma.user.create({ data: { username: username, password: hashedPassword } });
    res.status(200).send('created');
  } catch (e) {
    res.status(500).send('something went wrong');
  }
}

export async function logout(req: Request, res: Response) {
  if (req.currentUser) {
    await forget(req, res, req.currentUser);
    req.session.destroy((err) => {
      if (err) {
        res.status(500).send('something went wrong');
        return;
      } else {
        res.clearCookie('connect.sid');
        res.sendStatus(200);
      }
    });
  } else {
    res.status(400).send('are you already logged out maybe?');
  }
}
