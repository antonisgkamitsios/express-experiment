import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import App from './client/App';

export type RenderFn = typeof render;

const path = 'http://localhost:42069';

export function render(url: string, opts?: ReactDOMServer.RenderToPipeableStreamOptions) {
  const stream = ReactDOMServer.renderToPipeableStream(
    <StaticRouter location={url}>
      <App path={path} />
    </StaticRouter>,
    opts
  );

  return stream;
}
