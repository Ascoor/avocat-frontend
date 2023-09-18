module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  settings: {
    react: {
      version: 'detect' // Automatically detect the react version
    }
  },
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.js'
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        sourceType: 'module'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'no-unused-vars': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always']
  }
};
