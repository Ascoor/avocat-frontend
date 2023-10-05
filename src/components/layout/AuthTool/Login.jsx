import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
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
        // Navigate to the home page after successful login
        navigate('/');
      } else {
        setError('فشل تسجيل الدخول. يرجى المحاولة مرة أخرى لاحقًا.');
      }
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
        <div className="auth-setting-card-header">
          <Card.Title className="auth-login-title">
            <FaSignInAlt className="welcome-page-icon m-2" />
            تسجيل الدخول
          </Card.Title>
        </div>
      </Card.Header>

      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="form-label m-2">
              عنوان البريد الإلكتروني
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter an email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="form-label m-2">كلمة المرور</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>

        {error && <p className="text-danger mt-3 text-center">{error}</p>}
      </Card.Body>

      <Card.Footer>
        {loading ? (
          <Button type="button" disabled className="btn-warning login-btn">
            ...جارى الدخول
          </Button>
        ) : (
          <Button onClick={onSubmit} className="btn-success login-btn">
            تسجيل الدخول
          </Button>
        )}

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
