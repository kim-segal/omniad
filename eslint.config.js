import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  // 1️⃣  Front-end / browser code  ───────────────
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,          // browser globals only
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },

  // 2️⃣  Node-only files (build scripts, mailer, etc.) ─────────
  {
    files: [
      // build / tool configs
      'vite.config.*',
      'tailwind.config.*',
      'postcss.config.*',
      '*.config.js',

      // any server-side helpers that live in src/
      'src/**/mailer.js',
      'src/**/server/**/*.{js,ts}',
    ],
    languageOptions: {
      env: { node: true },              // adds process, module, __dirname, …
    },
  },
]);
