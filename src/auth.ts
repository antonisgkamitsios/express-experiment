import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import * as bcrypt from 'bcrypt';

import prisma  from './db.ts';
import { User } from '@prisma/client';

function generateToken() {
  return crypto.randomUUID();
}

export const comparePassword = (password: string | undefined | null, hash: string | undefined | null) => {
  if (!password || !hash) {
    return false;
  }
  return bcrypt.compareSync(password, hash);
};

export const hashString = (password: string) => {
  return bcrypt.hash(password, 5);
};

export function persistUser(req: Request, _res: Response, user: User) {
  req.session.userId = user.id;
}

export async function remember(_req: Request, res: Response, user: User) {
  const rememberToken = generateToken();

  try {
    await prisma.user.update({ where: { id: user.id }, data: { rememberDigest: await hashString(rememberToken) } });
    res.cookie('userId', user.id, { signed: true, httpOnly: true, maxAge: 365 * 24 * 60 * 60 * 1000 });
    res.cookie('rememberToken', rememberToken, { signed: true, httpOnly: true, maxAge: 365 * 24 * 60 * 60 * 1000 });
  } catch (e) {
    console.log(e);
  }
}

export async function forget(_req: Request, res: Response, user: User) {
  try {
    await prisma.user.update({ where: { id: user.id }, data: { rememberDigest: null } });
    res.clearCookie('userId');
    res.clearCookie('rememberToken');
    // res.send('ok!');
  } catch (e) {
    console.log(e);
  }
}

export async function currentUser(req: Request, _res: Response, next: NextFunction) {
  let currentUser;

  const sessionUserId = req.session.userId;
  const cookieUserId = req.signedCookies.userId;

  if (sessionUserId) {
    currentUser = await prisma.user.findFirst({ where: { id: sessionUserId } });
  } else if (cookieUserId) {
    currentUser = await prisma.user.findFirst({ where: { id: cookieUserId } });
    const rememberToken = req.signedCookies.rememberToken;
    if (comparePassword(rememberToken, currentUser?.rememberDigest)) {
      req.session.userId = currentUser?.id;
    }
  }
  req.currentUser = currentUser;
  next();
}
