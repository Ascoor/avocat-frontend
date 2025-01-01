import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import useAuth from './AuthUser';
import { useNavigate } from 'react-router-dom';

const Login = ({ handleCloseForm }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <FaSignInAlt className="text-4xl text-blue-500 mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-gray-800">تسجيل الدخول</h2>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block mb-1 text-gray-700 font-semibold"
          >
            عنوان البريد الإلكتروني
          </label>
          <input
            id="email"
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-1 text-gray-700 font-semibold"
          >
            كلمة المرور
          </label>
          <input
            id="password"
            type="password"
            placeholder="أدخل كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <p className="text-center text-red-500 text-sm mt-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 rounded-lg text-white font-semibold ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? '...جارى الدخول' : 'تسجيل الدخول'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={handleCloseForm}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          العودة للرئيسية
        </button>
      </div>
    </div>
  );
};

export default Login;
