import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
  log: ['query', 'info', 'warn', 'error']
});

type ModelNames = Uncapitalize<Prisma.ModelName>;

const modelNames = Prisma.dmmf.datamodel.models.map((model) => model.name.toLowerCase() as ModelNames);

export default async () => {
  if (process.env.NODE_ENV !== 'test' || process.env.ENV !== 'test') {
    throw new Error('environment is not test, aborting..');
  }
  // @ts-expect-error because of model being union type i cannot use deleteMay
  await prisma.$transaction(modelNames.map((model) => prisma[model].deleteMany()));
};
