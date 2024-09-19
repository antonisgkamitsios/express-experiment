import { ViteDevServer, createServer } from 'vite';
import { Express } from 'express';
import morgan from 'morgan';

async function devConfig(app: Express, base: string): Promise<ViteDevServer> {
  const vite: ViteDevServer = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });
  
  
  app.use(morgan('dev'));

  app.use(vite.middlewares);

  return vite;
}

export { devConfig };
