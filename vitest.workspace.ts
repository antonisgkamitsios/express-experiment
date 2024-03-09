import { defineWorkspace } from 'vitest/config';

// defineWorkspace provides a nice type hinting DX
export default defineWorkspace([
  'packages/*',
  {
    // add "extends" to merge two configs together
    extends: './vite.config.ts',
    test: {
      include: ['spec/client/**/*.spec.{ts,tsx}'],
      name: 'happy-dom',
      environment: 'happy-dom',
    }
  },
  {
    extends: './vite.config.ts',
    test: {
      include: ['spec/**/*.spec.{ts,tsx}'],
      exclude: ['spec/client/**/*.spec.{ts,tsx}'],
      name: 'node',
      environment: 'node',
    }
  }
]);
