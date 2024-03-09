import { beforeEach } from 'vitest';
import { mockReset } from 'vitest-mock-extended';

import prisma from './mockedPrisma';

beforeAll(() => {
  vi.mock('@/db.ts');
});
beforeEach(() => {
  mockReset(prisma);
});
