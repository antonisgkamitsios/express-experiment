import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import RedisStore from 'connect-redis';

import { ViteDevServer } from 'vite';
import { redis } from '../db.ts';

const isProduction = process.env.NODE_ENV === 'production';
const base = process.env.BASE || '/';

const redisStore = new RedisStore({ client: redis, prefix: 'myApp' });

async function setupMiddlewares(app: Express): Promise<ViteDevServer | undefined> {
  await redis.connect();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(
    session({
      store: redisStore,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: isProduction },
      secret: process.env.SESSION_SECRET,
    })
  );

  let vite;
  if (!isProduction) {
    const { devConfig } = await import('../config/development.ts');
    vite = await devConfig(app, base);
  } else {
    const { productionConfig } = await import('../config/production.ts');
    productionConfig(app, base);
  }

  return vite;
}

export { setupMiddlewares };
