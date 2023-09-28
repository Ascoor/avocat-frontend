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
    'react/prop-types': 'off'
    // يمكنك إضافة المزيد من القواعد هنا حسب الحاجة
  },
  
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
};
