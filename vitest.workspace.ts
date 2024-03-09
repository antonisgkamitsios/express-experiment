import { defineWorkspace } from 'vitest/config';

// defineWorkspace provides a nice type hinting DX
export default defineWorkspace([
  'packages/*',

  // client specs
  {
    extends: './vite.config.ts',
    test: {
      include: ['spec/client/**/*.spec.{ts,tsx}'],
      name: 'happy-dom',
      environment: 'happy-dom'
    }
  },

  // unit specs
  {
    extends: './vite.config.ts',
    test: {
      include: ['spec/unit/**/*.spec.{ts,tsx}'],
      exclude: ['spec/client/**/*.spec.{ts,tsx}'],
      name: 'unit node',
      environment: 'node',
      setupFiles: ['src/test/helpers/unit.setup.ts'],
    }
  },
  // integration specs
  {
    extends: './vite.config.ts',
    test: {
      include: ['spec/integration/**/*.spec.{ts,tsx}'],
      exclude: ['spec/client/**/*.spec.{ts,tsx}'],
      name: 'integration node',
      environment: 'node',
      setupFiles: ['src/test/helpers/integration.setup.ts']
    }
  }
]);
