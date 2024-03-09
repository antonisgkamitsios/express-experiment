declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'production' | 'test' | 'develop';
    PORT: string; // Environment variables are always strings
    DATABASE_URL: string;
    JWT_SECRET: string;
    SESSION_SECRET: string;
    COOKIE_SECRET: string;
    // Define other variables as needed
  }
}
