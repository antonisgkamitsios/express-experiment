import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
  log: ['query', 'info', 'warn', 'error']
});

const tables = Prisma.dmmf.datamodel.models.map((model) => model.name);
const clearPostgres = async () => {
  console.log('TABLES', tables);
  await prisma.$transaction([...tables.map((table) => prisma.$executeRawUnsafe(`TRUNCATE "${table}" CASCADE;`))]);
};

export default async () => {
  if (process.env.NODE_ENV !== 'test' || process.env.ENV !== 'test') {
    throw new Error('environment is not test, aborting..');
  }
  await clearPostgres();
};
