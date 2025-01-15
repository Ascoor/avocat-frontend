import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import useAuth from '../AuthTool/AuthUser';
import { useSpinner } from '../../context/SpinnerContext'; // ✅ استدعاء Spinner

const Login = ({ toggleRegisterForm, handleFormClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const { showSpinner, hideSpinner } = useSpinner(); // ✅ استخدام Spinner
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      showSpinner(); // ✅ إظهار الـ Spinner عند بدء تسجيل الدخول
      const success = await login(email, password);
      hideSpinner(); // ✅ إخفاء الـ Spinner بعد انتهاء العملية

      if (success) {
        navigate('/'); // ✅ التوجيه إلى الصفحة الرئيسية بعد نجاح تسجيل الدخول
      } else {
        setError('فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      hideSpinner(); // ✅ التأكد من إخفاء الـ Spinner عند حدوث خطأ
      setError('حدث خطأ أثناء تسجيل الدخول.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-80 h-96 rounded-3xl bg-gray-900 shadow-2xl transform hover:scale-105 transition-transform duration-500 p-6 flex flex-col justify-between">
        <h2 className="text-3xl font-bold text-center text-white mb-4">تسجيل الدخول</h2>
        {error && <p className="text-red-500 bg-red-100 dark:bg-red-800 p-2 rounded mb-4 text-center">{error}</p>}
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full py-2 pl-10 pr-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
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
              className="w-full py-2 pl-10 pr-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-700 transform hover:scale-105 transition-transform"
          >
            تسجيل الدخول
          </button>
          <button
            onClick={toggleRegisterForm}
            type="button"
            className="w-full py-2 bg-transparent text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-transform transform hover:scale-105"
          >
            ليس لديك حساب؟ سجل الآن
          </button>
          <button
            onClick={handleFormClose}
            type="button"
            className="w-full py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-transform transform hover:scale-105"
          >
            إلغاء
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
