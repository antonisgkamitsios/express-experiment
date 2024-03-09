import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import RedisStore from 'connect-redis';

import { ViteDevServer } from 'vite';
import { redis } from '../db.ts';

const env = process.env.NODE_ENV;

const base = process.env.BASE || '/';

async function setupMiddlewares(app: Express): Promise<ViteDevServer | undefined> {
  const redisStore = new RedisStore({ client: redis, prefix: 'myApp' });
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(
    session({
      store: redisStore,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: env === 'production' },
      secret: process.env.SESSION_SECRET
    })
  );

  let vite;
  if (env === 'development') {
    const { devConfig } = await import('../config/development.ts');
    vite = await devConfig(app, base);
  } else if (env === 'production') {
    const { productionConfig } = await import('../config/production.ts');
    productionConfig(app, base);
  } else {
    const { testConfig } = await import('../config/test.ts');
    testConfig(app);
  }

  return vite;
}

export { setupMiddlewares };
