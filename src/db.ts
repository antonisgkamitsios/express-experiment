import { PrismaClient } from '@prisma/client';

import { createClient } from 'redis';

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

export const redis = createClient();
redis.on('error', (err) => console.log('Redis client error', err));

export default prisma;
