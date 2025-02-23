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
      handleFormClose();
      onAuthStart(); // ✅ بدء التحميل
      const success = await login(email, password);
      if (success) {
        onAuthComplete(true, 'تم تسجيل الدخول بنجاح!');
      } else {
        onAuthComplete(false, 'فشل تسجيل الدخول. تحقق من البيانات.');
      }
    };


    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-sm bg-gray-900 text-white rounded-3xl p-8 shadow-lg shadow-green-200/30 transform hover:scale-105 transition-all duration-300">
          <h2 className="text-3xl font-bold text-center text-green-200/70  mb-4">
            تسجيل الدخول
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="البريد الإلكتروني"
                required
                className="w-full py-3 pl-10 pr-4 bg-gray-800 text-white border border-green-300/50 rounded-lg focus:ring-2 focus:ring-green-400/50"
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
                className="w-full py-3 pl-10 pr-4 bg-gray-800 text-white border border-green-300/50 rounded-lg focus:ring-2 focus:ring-green-400/50"
              />
            </div>
            <button
              type="submit"
              className="w-full font-bold py-2 bg-gradient-to-r from-green-300/50 to-green-200/50  text-white rounded-lg shadow-lg hover:from-green-300/60 hover:to-green-400/50 transform hover:scale-105 transition-all"
            >
              تسجيل الدخول
            </button>
            <button
              onClick={toggleRegisterForm}
              className="w-full py-2 bg-transparent text-green-300/80 border border-green-200/80 rounded-lg hover:bg-green-300/70 hover:text-white transition-all transform hover:scale-105"
            >
              ليس لديك حساب؟ سجل الآن
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

  export default Login;
