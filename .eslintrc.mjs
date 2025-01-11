export default {
  root: true,
  env: {
    browser: true,
    es6: true, // Updated to es6 for simplicity, consider using es2021 for more recent features
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist/', 'node_modules/'],
  parserOptions: {
    ecmaVersion: 2021, // or latest, depending on your preference
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
  plugins: [
    // 'react-refresh' is removed if not used, ensuring only necessary plugins are included
  ],
  rules: {
    // Best practices and code quality
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'react/prop-types': 'off', // Disabled if not using TypeScript
    'react/react-in-jsx-scope': 'off', // Not needed for React 17+ with the new JSX transform

    // React Hooks rules
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies

    // Add more custom rules based on your project's coding standards
  },
};
