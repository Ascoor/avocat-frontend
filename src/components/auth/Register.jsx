import React, { useState } from 'react';

const Register = ({ toggleLoginForm, handleFormClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين.');
      return;
    }
    // Simulate the register process
    try {
      // Placeholder for actual registration logic
      setTimeout(() => {
        setError('');
      }, 2000);
    } catch {
      setError('حدث خطأ أثناء إنشاء الحساب. حاول مرة أخرى.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-blue-500">
      <div className="w-full max-w-sm bg-gray-900 text-white rounded-3xl p-8 shadow-lg transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-green-400 mb-4">إنشاء حساب</h2>
        {error && <p className="text-red-500 bg-red-100 dark:bg-red-800 p-2 rounded mb-4 text-center">{error}</p>}
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="الاسم الكامل"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full py-3 px-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full py-3 px-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full py-3 px-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="تأكيد كلمة المرور"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full py-3 px-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-lg hover:from-teal-600 hover:to-green-700 transform hover:scale-105 transition-all"
          >
            إنشاء حساب
          </button>
          <button
            onClick={toggleLoginForm}
            className="w-full py-2 bg-transparent text-green-400 border border-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-all transform hover:scale-105"
          >
            لديك حساب؟ تسجيل الدخول
          </button>
          <button
            onClick={handleFormClose}
            className="w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all transform hover:scale-105"
          >
            إلغاء
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
