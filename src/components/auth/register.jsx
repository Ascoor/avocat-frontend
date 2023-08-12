import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, TextField, Button, Box, CircularProgress, CardContent } from "@mui/material";
import { FaSignInAlt } from "react-icons/fa";
import AuthUser from "./AuthUser";
import API_CONFIG from "../../config";
import axios from "axios";

const Register = ({ handleCloseForm }) => {
  const navigate = useNavigate();
  const { http, setToken } = AuthUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitForm = async () => {
    setLoading(true);
    setError("");

    try {
      if (password !== rePassword) {
        setError("Passwords do not match");
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
      setError("Failed to register. Please try again later.");
      console.log(error);
    }
  };

  const loginUser = async () => {
    try {
      const response = await http.post("/api/login", { email, password });
      setToken(response.data.user, response.data.access_token);
      navigate("/");
    } catch (error) {
      setError("Failed to login. Please try again later.");
      console.log(error);
    }
  };

  return (
    <Card variant="outlined">
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <h3>اشتراك جديد</h3>
        <FaSignInAlt className="welcome-page-icon" />
      </Box>
       <CardContent>
        <form>
            <Box mb={3}>
              <TextField
                fullWidth
                id="name"
                label="الاسم"
                type="text"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                fullWidth
                id="email"
                label="الإيميل"
                type="text"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                id="password"
                label="كلمة المرور"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                fullWidth
                id="repassword"
                label="تأكيد كلمة المرور"
                type="text"
                variant="outlined"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
            </Box>
{loading ? (
  <Button disabled variant="contained" color="primary" className="btn">
    <CircularProgress size={20} style={{ marginRight: '8px' }} />
    جاري التسجيل
  </Button>
) : (
  <Button
    type="button"
    onClick={submitForm}
    variant="contained"
    color="success"
    className="btn"
  >
    تسجيل اشتراك
  </Button>
)}

{error && (
  <Box mt={3} textAlign="center">
    <p className="text-danger">{error}</p>
  </Box>
)}
</form>

</CardContent>
<Box display="flex" justifyContent="center" p={2}>
<Button
  type="button"
  onClick={handleCloseForm}
  variant="contained"
  color="error"
  className="btn"
>
  العودة للرئيسية
</Button>
</Box>
</Card>
);
};

Register.propTypes = {
handleCloseForm: PropTypes.func.isRequired,
};

export default Register;