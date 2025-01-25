import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import useAuth from './AuthUser';
import { useSpinner } from '../../context/SpinnerContext';

const Login = ({ toggleRegisterForm, handleFormClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const { showSpinner, hideSpinner } = useSpinner();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(''); // إعادة تعيين الخطأ
      showSpinner(); // عرض التحميل المستمر

      const success = await login(email, password);

      if (success) {
        hideSpinner(); // إخفاء التحميل عند النجاح
        navigate('/'); // الانتقال إلى الصفحة الرئيسية
      } else {
        throw new Error('فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.'); // عرض الخطأ في حالة الفشل
      }
    } catch (error) {
      setError(error.message || 'حدث خطأ أثناء تسجيل الدخول.'); // تحديث رسالة الخطأ
      hideSpinner(); // إخفاء التحميل عند الخطأ
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700">
      <div className="w-full max-w-sm bg-gray-900 text-white rounded-3xl p-8 shadow-lg transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center mb-4">تسجيل الدخول</h2>
        {error && (
          <p className="text-red-500 bg-red-100 dark:bg-red-800 p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full py-3 pl-10 pr-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full py-3 pl-10 pr-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all"
          >
            تسجيل الدخول
          </button>
          <button
            onClick={toggleRegisterForm}
            type="button"
            className="w-full py-2 bg-transparent text-indigo-500 border border-indigo-500 rounded-lg hover:bg-indigo-500 hover:text-white transition-all transform hover:scale-105"
          >
            ليس لديك حساب؟ سجل الآن
          </button>
          <button
            onClick={handleFormClose}
            type="button"
            className="w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all transform hover:scale-105"
          >
            إلغاء
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
