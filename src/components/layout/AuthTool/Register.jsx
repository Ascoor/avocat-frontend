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
    <Card className="special-register-card">
      <Card.Header className="special-register-header">
        <Card.Title className="special-register-title">
          <FaUser className="special-register-icon" />
          تسجيل اشتراك جديد
        </Card.Title>
      </Card.Header>

      <Card.Body className="special-register-body">
        <Form onSubmit={submitForm}>
          <FormGroup>
            <Form.Label>الاسم</Form.Label>
            <Form.Control
              className="special-register-input"
              type="text"
              placeholder="ادخل اسمك"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Form.Label>البريد الإلكتروني</Form.Label>
            <Form.Control
              className="special-register-input"
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Form.Label>كلمة المرور</Form.Label>
            <Form.Control
              className="special-register-input"
              type="password"
              placeholder="أدخل كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Form.Label>إعادة إدخال كلمة المرور</Form.Label>
            <Form.Control
              className="special-register-input"
              type="password"
              placeholder="أعد إدخال كلمة المرور"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </FormGroup>

          <Button type="submit" className="special-register-button">
            تسجيل الاشتراك
          </Button>

          {error && <p className="text-danger mt-3 text-center">{error}</p>}
        </Form>
      </Card.Body>

      <Card.Footer className="special-register-footer">

      <Button
            onClick={handleCloseForm}
            className="btn-danger login-guest special-register-button"
          >
            العودة للرئيسية
          </Button>
      </Card.Footer>
    </Card>

    );
  };

  export default Register;
