import express from 'express';
import * as dotenv from 'dotenv';

import { apiRouter } from './src/routers/apiRouter.ts';
import { setupMiddlewares } from './src/middlewares/index.ts';

import { port } from './src/environment/index.ts';
import { renderReact } from './src/renderReact.ts';
import { authRouter } from './src/routers/authRouter.ts';

async function startServer() {
  dotenv.config();
  const app = express();

  const vite = await setupMiddlewares(app);
  const reactController = renderReact(vite);
  app.use('/auth', authRouter);
  app.use('/api', apiRouter);

  app.get('/*', reactController);

  app.listen(port, () => {
    console.log(`app listening on: http://localhost:${port}`);
  });
}
startServer();
