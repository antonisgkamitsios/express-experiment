declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'production' | 'test' | 'development';
    PORT: string;
    DATABASE_URL: string;
    SESSION_SECRET: string;
    COOKIE_SECRET: string;
  }
}
