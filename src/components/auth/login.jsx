import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Card,
  CardContent,
  Box,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import { FaSignInAlt } from 'react-icons/fa';
import API_CONFIG from '../../config';
import AuthUser from "./AuthUser";

const Login = ({ handleCloseForm }) => {
  const navigate = useNavigate();
  const { setToken } = AuthUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_CONFIG.baseURL}/api/login`, {
        email,
        password,
      });
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
    <Card variant="outlined">
      <CardContent>
        <div className="court-setting-card-header">
          <h2>
            تسجيل الدخول
            <FaSignInAlt style={{ marginRight: '5px' }} className="welcome-page-icon" />
          </h2>
        </div>

        <form onSubmit={onSubmit}>
          <Box mb={3}>
            <TextField
              fullWidth
              id="email"
              label="عنوان البريد الإلكتروني"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              id="password"
              label="كلمة المرور"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box display="flex" justifyContent="center">
            {loading ? (
              <Button disabled variant="contained" color="warning" className="login-btn">
                <CircularProgress size={20} style={{ marginRight: '8px' }} />
                جارى الدخول
              </Button>
            ) : (
              <Button type="submit" variant="contained" color="success" className="login-btn">
                تسجيل الدخول
              </Button>
            )}
          </Box>
        </form>
        {error && (
          <Box mt={3} textAlign="center">
            <p className="text-danger">{error}</p>
          </Box>
        )}
      </CardContent>

      <Box display="flex" justifyContent="center" mt={2}>
        <Button onClick={handleCloseForm} variant="contained" color="error" className="login-back">
          العودة للرئيسية
        </Button>
      </Box>
    </Card>
  );
};

Login.propTypes = {
  handleCloseForm: PropTypes.func.isRequired,
};

export default Login;
