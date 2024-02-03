import { useState } from 'react';
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
    <Card className="special-login-card">
      <Card.Header className="special-login-header">
        <Card.Title className="special-login-title">
          <FaSignInAlt className="special-login-icon" />
          تسجيل الدخول
        </Card.Title>
      </Card.Header>

      <Card.Body className="special-login-body">
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="form-label m-2">
              عنوان البريد الإلكتروني
            </Form.Label>
            <Form.Control
              className="special-login-input"
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="form-label m-2">كلمة المرور</Form.Label>
            <Form.Control
              className="special-login-input"
              type="password"
              placeholder="أدخل كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {loading ? (
            <Button disabled className="btn-warning special-login-button">
              ...جارى الدخول
            </Button>
          ) : (
            <Button
              onClick={onSubmit}
              className="btn-success special-login-button"
            >
              تسجيل الدخول
            </Button>
          )}

          {error && <p className="text-danger mt-3 text-center">{error}</p>}
        </Form>
      </Card.Body>

      <Card.Footer className="special-login-footer">
        <Button
          type="button"
          onClick={handleCloseForm}
          className="btn-danger special-login-button"
        >
          العودة للرئيسية
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default Login;
