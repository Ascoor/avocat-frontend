import React, { useState } from 'react';

import useAuth from '../AuthTool/AuthUser';
import { useNavigate } from 'react-router-dom';

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
        setError('فشل تسجيل الدخول. يرجى المحاولة مرة أخرى لاحقًا.');
      }
    } catch (error) {
      setError('فشل تسجيل الدخول. يرجى المحاولة مرة أخرى لاحقًا.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 p-4">
      <h2 className="text-2xl font-bold text-blue-800">تسجيل الدخول</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="البريد الإلكتروني"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <input
        type="password"
        placeholder="كلمة المرور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <button
        type="submit"
        className="w-full bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-600 transition-transform transform hover:scale-105"
      >
        تسجيل الدخول
      </button>
      <button
        onClick={toggleRegisterForm}
        className="text-blue-600 hover:underline mt-4 block"
      >
        لا تملك حسابًا؟ إنشاء حساب
      </button>
      <button
        onClick={handleFormClose}
        className="text-gray-500 hover:underline mt-2 block"
      >
        إلغاء
      </button>
    </form>
  );
};

export default Login;
