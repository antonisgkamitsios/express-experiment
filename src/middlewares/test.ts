import { Express } from 'express';
import morgan from 'morgan';

function testConfig(app: Express) {
  app.use(morgan('dev'));
}

export { testConfig };
