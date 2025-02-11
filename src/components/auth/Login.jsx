import { useState } from 'react';

import { FaEnvelope, FaLock } from 'react-icons/fa';
import useAuth from '../../components/auth/AuthUser';

const Login = ({
  onAuthStart,
  onAuthComplete,
  handleFormClose,
  toggleRegisterForm,
}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    onAuthStart(); // ✅ بدء التحميل
    const success = await login(email, password);
    if (success) {
      onAuthComplete(true, 'تم تسجيل الدخول بنجاح!');
    } else {
      onAuthComplete(false, 'فشل تسجيل الدخول. تحقق من البيانات.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700">
      <div className="w-full max-w-sm bg-gray-900 text-white rounded-3xl p-8 shadow-lg transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center mb-4">تسجيل الدخول</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="البريد الإلكتروني"
              required
              className="w-full py-3 pl-10 pr-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              required
              className="w-full py-3 pl-10 pr-4 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all"
          >
            تسجيل الدخول
          </button>{' '}
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
