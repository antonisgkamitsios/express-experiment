import { PrismaClient } from '@prisma/client';

import { createClient } from 'redis';

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
  log: ['query', 'info', 'warn', 'error']
});

const redis = await createClient()
  .on('error', (err) => console.log('Redis client error', err))
  .connect();

export { redis };
export default prisma;
