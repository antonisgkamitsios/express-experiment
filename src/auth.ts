import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import * as bcrypt from 'bcrypt';

import prisma from './db.ts';
import { Prisma, User } from '@prisma/client';

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
    currentUser = await prisma.user.findUnique({ where: { id: sessionUserId } });
  } else if (cookieUserId) {
    currentUser = await prisma.user.findUnique({ where: { id: cookieUserId } });
    const rememberToken = req.signedCookies.rememberToken;
    if (comparePassword(rememberToken, currentUser?.rememberDigest)) {
      req.session.userId = currentUser?.id;
    }
  }
  req.currentUser = currentUser;
  next();
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.currentUser) {
    next();
  } else {
    res.status(401).json({ error: "You don't have permission to access this resource" });
  }
}

export async function findUserComments(user: Prisma.UserCreateInput) {
  const comments = await prisma.comment.findMany({
    // relationLoadStrategy: 'join',
    where: {Post: {userId: user.id}},
    // include:{comments: true},
    // select: { comments: true }
  });
  // const comments = await prisma.$executeRaw`
  // SELECT c.id FROM "Comment" c
  // JOIN "Post" p ON c."postId" = p.id
  // WHERE p."userId" = ${user.id}
  // `
  // const test = comments.flatMap((c) => c.comments);
  console.log(comments);
}
