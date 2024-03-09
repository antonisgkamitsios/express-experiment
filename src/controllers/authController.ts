import { Request, Response } from 'express';
import { hashString, comparePassword, persistUser, remember, forget } from '../auth.ts';
import prisma from '../db.ts';

export async function login(req: Request, res: Response) {
  const username = req.body.username;
  const password = req.body.password;

  const rememberMe = req.body.rememberMe || false;

  if (req.currentUser) {
    res.status(400).send('already logged in?');
    return;
  }

  if (!username || !password) {
    res.status(400).send('oops');
    return;
  }

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

export async function register(req: Request, res: Response) {
  const username = req.body.username;
  const password = req.body.password;
  const passwordRepeat = req.body.passwordRepeat;

  if (!username || !password || !passwordRepeat) {
    res.status(400).end('add fields noob');
    return;
  }

  if (password !== passwordRepeat) {
    res.status(400).send('passwords dont match');
    return;
  }
  const user = await prisma.user.findFirst({ where: { username: { equals: username } } });
  console.log(user);

  if (user) {
    res.status(400).send('user already exist');
    return;
  }

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
