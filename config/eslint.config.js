import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  js.configs.recommended,
  
  // Frontend: src/**/*.tsx only
  {
    name: 'frontend-react',
    files: ['src/**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2024,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        fetch: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
    settings: {
      react: {
        version: 'detect',
        runtime: 'automatic',
      },
    },
  },

  // Backend: node-api/**/*.ts only
  {
    name: 'backend-node',
    files: ['node-api/**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2022,
        sourceType: 'script',
      },
      globals: {
        global: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'writable',
        module: 'writable',
        require: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-var-requires': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },

  // Global ignores
  {
    name: 'global-ignores',
    ignores: [
      'dist/**/*',
      'build/**/*',
      'node_modules/**/*',
      'coverage/**/*',
      '*.min.js',
      'public/**/*',
      'scripts/**/*',     // ← Ignore scripts folder
      'php-api/**/*',     // ← Ignore php-api folder
      '*.config.js',      // ← Ignore config files
      '**/*.js',          // ← Ignore all .js files (only lint .tsx and .ts)
      '**/*.jsx',         // ← Ignore all .jsx files
    ],
  },
];