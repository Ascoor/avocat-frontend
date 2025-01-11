import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import useAuth from '../AuthTool/AuthUser';

const Login = ({ toggleRegisterForm, handleFormClose, setLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      } else {
        setError('فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      setError('حدث خطأ أثناء تسجيل الدخول.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-avocat-blue-dark via-avocat-blue to-avocat-orange-light">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-avocat-blue-dark dark:text-white mb-6">
          تسجيل الدخول
        </h2>

        {error && (
          <p className="text-red-500 bg-red-100 dark:bg-red-800 p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}
<form onSubmit={onSubmit} className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
  <h2 className="text-2xl font-bold text-avocat-blue-dark dark:text-white">تسجيل الدخول</h2>

  {error && (
    <p className="text-red-500 bg-red-100 dark:bg-red-800 p-2 rounded text-center">
      {error}
    </p>
  )}

  <input
    type="email"
    placeholder="البريد الإلكتروني"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-avocat-blue focus:outline-none transition"
  />

  <input
    type="password"
    placeholder="كلمة المرور"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    className="w-full py-3 px-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-avocat-blue focus:outline-none transition"
  />

  <button
    type="submit"
    className="w-full bg-gradient-to-r from-avocat-blue to-avocat-orange text-white py-3 rounded-lg shadow-md hover:shadow-lg transform transition hover:scale-105"
  >
    تسجيل الدخول
  </button>

  <button
    onClick={toggleRegisterForm}
    className="text-avocat-blue-dark dark:text-avocat-orange hover:underline mt-4 block"
  >
    ليس لديك حساب؟ سجل الآن
  </button>
</form>

        {/* روابط إضافية */}
        <div className="mt-6 text-center">
          <button
            onClick={toggleRegisterForm}
            className="text-avocat-blue-dark dark:text-avocat-orange hover:underline"
          >
            لا تملك حساب؟ أنشئ حسابًا جديدًا
          </button>
          <br />
          <button
            onClick={handleFormClose}
            className="mt-2 text-gray-500 hover:underline"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
