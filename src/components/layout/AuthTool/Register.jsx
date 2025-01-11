import React, { useState } from 'react';

const Register = ({ toggleLoginForm, handleFormClose, setLoading }) => {
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
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    } catch {
      setError('حدث خطأ أثناء إنشاء الحساب. حاول مرة أخرى.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 p-4">
      <h2 className="text-2xl font-bold text-green-800">إنشاء حساب</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="الاسم الكامل"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <input
        type="email"
        placeholder="البريد الإلكتروني"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <input
        type="password"
        placeholder="كلمة المرور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <input
        type="password"
        placeholder="تأكيد كلمة المرور"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <button
        type="submit"
        className="w-full bg-green-800 text-white py-2 px-4 rounded hover:bg-green-600 transition-transform transform hover:scale-105"
      >
        إنشاء حساب
      </button>
      <button
        onClick={toggleLoginForm}
        className="text-blue-600 hover:underline mt-4 block"
      >
        لديك حساب؟ تسجيل الدخول
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

export default Register;
