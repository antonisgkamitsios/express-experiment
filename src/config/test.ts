import { Express } from 'express';
import morgan from 'morgan';

async function testConfig(app: Express) {
  app.use(morgan('dev'));
}

export { testConfig };
