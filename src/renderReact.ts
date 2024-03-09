import fs from 'node:fs/promises';
import { Request, Response } from 'express';
import { base, isProduction } from './environment/index.ts';
import { ViteDevServer } from 'vite';
import { RenderFn } from './entry-server.tsx';

// Cached production assets
const templateHtml = isProduction ? await fs.readFile('./dist/client/index.html', 'utf-8') : '';

// const ssrManifest = isProduction ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8') : undefined;

// split the html into two chunks, one is the head up until the div#root and the other is the rest including the client script
const htmlParts = isProduction ? templateHtml.split('<!--app-html-->') : [];

function renderReact(vite: ViteDevServer | undefined) {
  async function renderReactController(req: Request, res: Response) {
    try {
      const url = req.originalUrl.replace(base, '');
      let template: string;
      let render: RenderFn;
      let htmlPartsArray: string[];
      if (!isProduction) {
        // Always read fresh template in development
        if (!vite) {
          res.status(500).end('Could not find vite dev server');
          return;
        }
        template = await fs.readFile('./index.html', 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        htmlPartsArray = template.split('<!--app-html-->');
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        template = templateHtml;
        htmlPartsArray = htmlParts;
        render = (await import('./entry-server.js')).render;
      }

      res.write(htmlPartsArray[0]);
      console.log('url:', req.url);

      const stream = render(req.url, {
        onShellReady() {
          stream.pipe(res);
        },
        onAllReady() {
          res.write(htmlPartsArray[1]);
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  return renderReactController;
}

export { renderReact };
