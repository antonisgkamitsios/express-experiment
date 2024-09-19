import compression from 'compression';
import sirv from 'sirv';
import { Express } from 'express';
import morgan from 'morgan';

function productionConfig(app:Express, base: string){
  app.use(morgan('common'))
  app.use(compression());
  app.use(base, sirv("./dist/client", {extensions: []}))
}


export {productionConfig}