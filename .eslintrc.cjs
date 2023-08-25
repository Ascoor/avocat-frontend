module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'airbnb', 'airbnb/hooks',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2023, // تحديد إصدار ECMAScript المستخدم
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // تمكين دعم JSX
    },
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  settings: { react: { version: '18.2' } },
  rules: {

  },
};
