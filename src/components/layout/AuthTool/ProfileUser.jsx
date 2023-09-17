import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import API_CONFIG from '../../../config';
import { useParams } from 'react-router-dom';

const ProfileUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const { userId } = useParams();
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('success');

  useEffect(() => {
    axios
      .get(`${API_CONFIG.baseURL}/api/user/${userId}`)
      .then((response) => {
        const userData = response.data;
        setName(userData.name);
        setEmail(userData.email);
        setRole(userData.role);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [userId]);

  const handleUpdateProfile = () => {
    const updatedData = {};

    if (name !== '') {
      updatedData.name = name;
    }

    if (email !== '') {
      updatedData.email = email;
    }

    if (role !== '') {
      updatedData.role = role;
    }

    if (password && confirmPassword && password === confirmPassword) {
      updatedData.password = password;
    }

    axios
      .put(`${API_CONFIG.baseURL}/api/user/${userId}`, updatedData)
      .then((response) => {
        console.log(response.data);
        setAlertMessage('تم التحديث بنجاح');
        setAlertVariant('success');
        setShowAlert(true);
      })
      .catch((error) => {
        console.log(error.response.data);
        setAlertMessage('لم يتم تحديث البيانات');
        setAlertVariant('danger');
        setShowAlert(true);
      });
  };

  const generateUniqueId = (fieldName) => `${fieldName}-${userId}`;
  useEffect(() => {
    let timer;
    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showAlert]);

  return (
    <>
      <Card className="card">
        <div className="custom-card-header">
          <Card.Header>تحديث الملف الشخصي</Card.Header>
        </div>
        {showAlert && (
          <Alert
            variant={alertVariant}
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {alertMessage}
          </Alert>
        )}
        <Card.Body>
          <form>
            <Row>
              <Col>
                <div className="mb-3 p-2">
                  <label htmlFor={generateUniqueId('name')}>الاسم</label>
                  <input
                    type="text"
                    className="form-control"
                    id={generateUniqueId('name')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="mb-3 p-2">
                  <label htmlFor={generateUniqueId('email')}>
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id={generateUniqueId('email')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="mb-3 p-2">
                  <label htmlFor={generateUniqueId('password')}>
                    كلمة المرور
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id={generateUniqueId('password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </Col>
              <Col>
                <div className="mb-3 p-2">
                  <label htmlFor={generateUniqueId('confirmPassword')}>
                    تأكيد كلمة المرور
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id={generateUniqueId('confirmPassword')}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="mb-3 p-2">
                  <label htmlFor={generateUniqueId('role')}>الدور</label>
                  <select
                    className="form-control"
                    id={generateUniqueId('role')}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">اختر الدور</option>
                    <option value="1">مدير</option>
                    <option value="2">محامي</option>
                    <option value="3">مساعد</option>
                  </select>
                </div>
              </Col>
            </Row>
            <Card.Footer>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdateProfile}
              >
                تحديث الملف الشخصي
              </button>
            </Card.Footer>
          </form>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProfileUser;
