import express from 'express';

import { setupMiddlewares } from '@/middlewares';

import { renderReact } from '@/renderReact';

import { apiRouter } from '@/routers/apiRouter';
import { authRouter } from '@/routers/authRouter';

export async function createApp() {
  const app = express();

  const vite = await setupMiddlewares(app);
  console.log('env: ', process.env.ENV);

  const reactController = renderReact(vite);
  app.use('/auth', authRouter);
  app.use('/api', apiRouter);

  app.get('/*', reactController);

  return app;
}
