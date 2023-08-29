module.exports = {
  root: true,
  env: {
    browser: true,
    es2023: true,
    jest: true, // Assuming you might use Jest for testing
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'airbnb',
    'airbnb/hooks',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: ['dist'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': 'off', // Allow spreading props
    'import/prefer-default-export': 'off', // Allow single exports
    'react/prop-types': 'off', // You can remove this if using TypeScript
    'no-unused-vars': 'warn', // Show warnings for unused variables
    'no-shadow': 'off', // Allow shadowing of variables within functions
    'jsx-a11y/click-events-have-key-events': 'off', // Allow click events without key events
    'jsx-a11y/no-static-element-interactions': 'off', // Allow static elements without interactions
    'no-console': 'off', // Allow console.log, you might want to remove this for production
  },
};
