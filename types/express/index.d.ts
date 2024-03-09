import { User } from '@prisma/client';
import 'express-session';
import 'express';

declare global {
  namespace Express {
    interface Request {
      currentUser: User | null | undefined;
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    userId?: string;
  }
}
declare global {
  interface globalThis {
    customGlobalProperty: string;
  }
}
