import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Row } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa';
import AuthUser from './AuthUser';
import API_CONFIG from '../../../config';
import axios from 'axios';

const Login = ({ handleCloseForm }) => {
  const navigate = useNavigate();
  const { setToken } = AuthUser();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      let routeToNavigate = '/';

      if (username.includes('@')) {
        response = await axios.post(`${API_CONFIG.baseURL}/api/login`, {
          email: username,
          password,
        });
      } else {
        response = await axios.post(`${API_CONFIG.baseURL}/api/lawyer/login`, {
          username,
          password,
        });
      }

      setToken(response.data.user, response.data.access_token);

      // Role-based routing
      if (response.data.role === '1') {
        routeToNavigate = '/user-dashboard';
      } else if (response.data.role === '2') {
        routeToNavigate = '/lawyer-dashboard';
      } else {
        // Default to root if role is not determined
        routeToNavigate = '/';
      }

      navigate(routeToNavigate); // Navigate to respective dashboard based on role
    } catch (error) {
      setError('فشل تسجيل الدخول. يرجى المحاولة مرة أخرى لاحقًا.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card.Header>
        <div className="special-card-header">
          <Card.Title>
            تسجيل الدخول
            <FaSignInAlt
              style={{ marginRight: '5px' }}
              className="welcome-page-icon"
            />
          </Card.Title>
        </div>
      </Card.Header>

      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>اسم المستخدم أو البريد الإلكتروني</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username or email"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="username-input" // Add the class here
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>كلمة المرور</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="password-input" // Add the class here
            />
          </Form.Group>
          <Row className="mt-4 justify-content-center">
            {loading ? (
              <button type="button" disabled className="btn-loading">
                ...جارى الدخول
              </button>
            ) : (
              <button type="submit" className="btn-success-special">
                تسجيل الدخول
              </button>
            )}
          </Row>
          {error && (
            <p className="text-danger-special mt-3 text-center">{error}</p>
          )}
        </Form>
      </Card.Body>

      <Card.Footer className="special-card-footer">
        <button
          type="button"
          onClick={handleCloseForm}
          className="btn-danger login-back"
        >
          العودة للرئيسية
        </button>
      </Card.Footer>
    </>
  );
};

export default Login;
