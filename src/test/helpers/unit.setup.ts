import { mockReset } from 'vitest-mock-extended';

import prisma from './mockedPrisma';
import request from 'supertest';
import { createApp } from '@/server/createApp';

beforeAll(async () => {
  vi.mock('@/db.ts');
  const app = await createApp();
  const testRequest = request(app);
  global.testRequest = testRequest;
});
beforeEach(() => {
  mockReset(prisma);
});
