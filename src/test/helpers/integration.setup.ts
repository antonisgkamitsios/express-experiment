import { createApp } from '@/server/createApp';
import resetDb from './reset-db';
import request from 'supertest';

beforeAll(async () => {
  const app = await createApp();
  const testRequest = request(app);
  global.testRequest = testRequest;
});

afterEach(async () => {
  await resetDb();
});

