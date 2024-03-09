import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'vitest-mock-extended';

const prisma = mockDeep<PrismaClient>();
const redis = mockDeep();
export { redis };
export default prisma;
