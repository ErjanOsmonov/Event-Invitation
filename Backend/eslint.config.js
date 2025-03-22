// eslint-disable-next-line import/no-extraneous-dependencies
import { FlatCompat } from '@eslint/eslintrc';

// Use FlatCompat to support "extends" and other legacy configurations
const compat = new FlatCompat();

export default [
  {
    // Define parser options explicitly
    files: ['**/*.js'], // Apply to all JavaScript files
    languageOptions: {
      ecmaVersion: '2021',
      sourceType: 'module',
      globals: {
        // Add environment-specific globals
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    rules: {
      // Add custom rules if needed
    },
  },
  ...compat.extends('airbnb-base'),
  {
    // Override for specific files
    files: ['.eslintrc.{js,cjs}'],
    languageOptions: {
      sourceType: 'script',
    },
  },
];
