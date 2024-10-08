import globals from "globals";
import pluginJs from "@eslint/js";
import { eslintRecommended } from '@eslint/js'; // Built-in ESLint recommended config
import reactPlugin from 'eslint-plugin-react'; // React plugin
import prettierPlugin from 'eslint-plugin-prettier'; // Prettier plugin

export default [
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  {
    // Base ESLint recommended config
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    rules: {
      ...eslintRecommended.rules,  // Spread the recommended ESLint rules
      ...reactPlugin.configs.recommended.rules,  // Spread the React recommended rules
      ...prettierPlugin.configs.recommended.rules,  // Spread the Prettier recommended rules
    },
  },
  {
    // React-specific config
    files: ['**/*.jsx'],
    languageOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    settings: {
      react: {
        version: 'detect',  // Automatically detect the version of React
      },
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,  // React recommended rules
    },
  },
  {
    // Prettier-specific config
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',  // Ensure Prettier formatting errors are highlighted as ESLint errors
    },
  },
];