module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    // Define ESLint rules here
    'react/jsx-uses-react': 'off', // Disable the 'react/jsx-uses-react' rule
    'react/react-in-jsx-scope': 'off', // Disable the 'react/react-in-jsx-scope' rule
    'no-console': 'error', // Display console.log() as an error
  },
};
