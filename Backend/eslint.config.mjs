import globals from 'globals';
import js from '@eslint/js';

export default [
  {
    files: ['**/*.js'], // Проверяем все .js файлы
    languageOptions: {
      sourceType: 'commonjs', // Поддержка require/exports
      globals: {
        ...globals.node // Node.js окружение
      }
    },
    rules: {
      ...js.configs.recommended.rules, // Базовые правила
      'semi': ['error', 'always'],     // Требуем ;
      'quotes': ['error', 'single'],   // Одинарные кавычки
      'no-unused-vars': ['warn']       // Предупреждение о неиспользуемых переменных
    }
  }
];