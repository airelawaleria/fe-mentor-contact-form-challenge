import globals from 'globals';
import pluginJs from '@eslint/js';
import tsParser from '@typescript-eslint/parser'; // TypeScript parser
import pluginReact from 'eslint-plugin-react';
import tsPlugin from '@typescript-eslint/eslint-plugin'; // TypeScript plugin

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['**/*.config.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: tsParser, // Use TypeScript parser
      globals: globals.browser,
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
    plugins: {
      react: pluginReact, // Use React plugin
      '@typescript-eslint': tsPlugin, // Use TypeScript ESLint plugin
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Include JavaScript recommended rules
      ...tsPlugin.configs.recommended.rules, // Include TypeScript recommended rules
      ...pluginReact.configs.flat.recommended.rules, // Include React recommended rules
      'react/react-in-jsx-scope': 'off', // Disable if using React 17+
      '@typescript-eslint/no-unused-vars': 'warn', // Custom rule for TypeScript
      'react/prop-types': 'off', // Disable prop-types check if using TypeScript
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
];
