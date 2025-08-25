import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    name: 'base',
    linterOptions: { reportUnusedDisableDirectives: true },
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.vinxi/**',
      '**/coverage/**',
      '**/storybook-static/**',
      '**/*.gen.ts',
      '**/*.gen.js',
      '**/routeTree.gen.ts',
      'pnpm-lock.yaml',
      '.turbo/**',
      '**/.turbo/**',
      '**/tsconfig.tsbuildinfo',
    ],
  },
  {
    name: 'javascript',
    files: ['**/*.{js,jsx,cjs,mjs}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node, ...globals.es2023 },
    },
    plugins: { import: importPlugin, react: reactPlugin, 'react-hooks': reactHooksPlugin },
    rules: { ...js.configs.recommended.rules, 'react/react-in-jsx-scope': 'off' },
    settings: {
      react: { version: 'detect' },
      'import/resolver': { typescript: { project: ['packages/*/tsconfig.json', 'apps/*/tsconfig.json'] } },
    },
  },
  ...tseslint.configs.recommended,
  {
    name: 'typescript-overrides',
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: { projectService: true, tsconfigRootDir: process.cwd(), allowDefaultProject: true },
      globals: { ...globals.browser, ...globals.node, ...globals.es2023 },
    },
    plugins: { import: importPlugin, react: reactPlugin, 'react-hooks': reactHooksPlugin },
    settings: {
      react: { version: 'detect' },
      'import/resolver': { typescript: { project: ['packages/*/tsconfig.json', 'apps/*/tsconfig.json'] } },
    },
    rules: {
      'import/order': [
        'warn',
        {
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'type', 'object'],
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
  },
  eslintConfigPrettier,
);
