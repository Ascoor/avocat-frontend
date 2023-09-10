import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button, Row } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa';
import AuthUser from './AuthUser';
import API_CONFIG from '../../config';
import axios from 'axios';

const Login = ({ handleCloseForm }) => {
  const navigate = useNavigate();
  const { setToken } = AuthUser();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;

      // Determine if the input is an email or username
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
      navigate('/'); // Replace "/" with the desired route after successful login
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
        <div className="court-setting-card-header">
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
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>كلمة المرور</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Row className="mt-4 justify-content-center">
            {loading ? (
              <Button type="button" disabled className="btn-warning login-btn">
                ...جارى الدخول
              </Button>
            ) : (
              <Button type="submit" className="btn-success login-btn">
                تسجيل الدخول
              </Button>
            )}
          </Row>
        </Form>

        {error && <p className="text-danger mt-3 text-center">{error}</p>}
      </Card.Body>

      <Card.Footer>
        <Button
          type="button"
          onClick={handleCloseForm}
          className="btn-danger login-back"
        >
          العودة للرئيسية
        </Button>
      </Card.Footer>
    </>
  );
};

export default Login;
