module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-closing-bracket-location': ['warn', 'line-aligned'],
    'jsx-quotes': ['warn', 'prefer-double'],
    'no-unused-vars': 'warn',
    'react/prop-types': 'off',
    // Add more rules as needed

    // Additional Rules
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-alert': 'warn',
    'no-shadow': 'warn',
    'no-underscore-dangle': 'warn',
    'comma-dangle': ['warn', 'always-multiline'],
    'eol-last': ['warn', 'always'],
    'no-multiple-empty-lines': ['warn', { max: 2, maxBOF: 1, maxEOF: 1 }],
    'quotes': ['warn', 'single', { avoidEscape: true }],
    'indent': ['warn', 2, { SwitchCase: 1 }],
  },
  
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
};
