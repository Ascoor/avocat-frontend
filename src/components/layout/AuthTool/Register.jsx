import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import AuthUser from './AuthUser';
import API_CONFIG from '../../../config';
import axios from 'axios';

const Register = ({ handleCloseForm }) => {
  const navigate = useNavigate();
  const { http, setToken } = AuthUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (password !== rePassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      await axios.post(`${API_CONFIG.baseURL}/api/register`, {
        name,
        email,
        password,
      });

      // Registration successful
      setLoading(false);

      // Perform login after successful registration
      await loginUser();
    } catch (error) {
      setLoading(false);
      setError('Failed to register. Please try again later.');
      console.error(error);
    }
  };

  const loginUser = async () => {
    try {
      const response = await http.post('/api/login', { email, password });
      setToken(response.data.user, response.data.access_token);
      navigate('/');
    } catch (error) {
      setError('Failed to login. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <FaUser className="text-4xl text-blue-500 mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-gray-800">تسجيل اشتراك جديد</h2>
      </div>

      <form onSubmit={submitForm} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 text-gray-700 font-medium">
            الاسم
          </label>
          <input
            id="name"
            type="text"
            placeholder="ادخل اسمك"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 text-gray-700 font-medium">
            البريد الإلكتروني
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
          <label htmlFor="password" className="block mb-1 text-gray-700 font-medium">
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

        <div>
          <label
            htmlFor="rePassword"
            className="block mb-1 text-gray-700 font-medium"
          >
            إعادة إدخال كلمة المرور
          </label>
          <input
            id="rePassword"
            type="password"
            placeholder="أعد إدخال كلمة المرور"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 rounded-lg font-semibold text-white ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? '...جارى التسجيل' : 'تسجيل الاشتراك'}
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

export default Register;
