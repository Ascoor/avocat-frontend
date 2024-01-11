module.exports = {
  parser: '@babel/eslint-parser', // استخدام محلل Babel لدعم جميع ميزات ESNext
  parserOptions: {
    ecmaVersion: 2022, // أحدث إصدار من ECMAScript
    sourceType: 'module', // استخدام نمط الوحدات
    ecmaFeatures: {
      jsx: true, // تمكين دعم JSX
    },
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'], // مجموعة القواعد الأساسية
  plugins: ['react'], // تمكين مكون الإضافات لدعم React
  rules: {
    // يمكنك تكوين القواعد هنا حسب احتياجات المشروع الخاصة بك
    'react/react-in-jsx-scope': 'off', // يتعين عليك تعطيل هذه القاعدة إذا كنت تستخدم React 18
    'react/prop-types': 'off', // تعطيل تحقق من propTypes إذا كنت لا تستخدمها
  },
};
