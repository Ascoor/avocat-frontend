import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button, FormGroup } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaKey, FaSignInAlt } from 'react-icons/fa';
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

  const submitForm = async () => {
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
      console.log(error);
    }
  };

  const loginUser = async () => {
    try {
      const response = await http.post('/api/login', { email, password });
      setToken(response.data.user, response.data.access_token);
      navigate('/');
    } catch (error) {
      setError('Failed to login. Please try again later.');
      console.log(error);
    }
  };

  return (
    <>
      <Card.Header>
        <div className="auth-setting-card-header">
          <Card.Title className="auth-login-title">
            <FaSignInAlt className="welcome-page-icon m-2" />
            تسجيل إشتراك جديد
          </Card.Title>
        </div>
      </Card.Header>

      <Card.Body>
        <Form>
          <FormGroup>
            <Form.Label className="form-label m-2">
              <FaUser className="form-icon" /> الاسم:
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="ادخل الاسم"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label className="form-label m-2">
              <FaEnvelope className="form-icon" /> البريد الإلكتروني:
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="ادخل البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label className="form-label m-2">
              <FaKey className="form-icon" /> كلمة المرور:
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="ادخل كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Form.Label className="form-label m-2">
              <FaKey className="form-icon" /> إعادة إدخال كلمة المرور:
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="إعادة إدخال كلمة المرور"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </FormGroup>
        </Form>
      </Card.Body>

      <Card.Footer>
        <Button type="button" onClick={submitForm} className="btn-danger-guest">
          تسجيل اشتراك
        </Button>
        {loading ? (
          <Button type="button" disabled className="btn-loading">
            جاري التحميل...
          </Button>
        ) : null}
        {error && <p className="text-danger-guest mt-1">{error}</p>}
        <Button
          type="button"
          onClick={handleCloseForm}
          className="btn-danger login-guest"
        >
          العودة للرئيسية
        </Button>
      </Card.Footer>
    </>
  );
};

export default Register;
