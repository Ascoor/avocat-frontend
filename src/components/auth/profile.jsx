import  { useState, useEffect } from 'react';
import { Card, Row, Col,Alert } from 'react-bootstrap';
import axios from 'axios';
import API_CONFIG from '../../config';
import { useParams } from 'react-router-dom';

const ProfileUpdateComponent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    // const [email_verified_at, setEmail_verified_at] = useState('');
    const { userId } = useParams();
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const [alertVariant, setAlertVariant] = useState('success');

    useEffect(() => {
        axios
            .get(`${API_CONFIG.baseURL}/api/user/${userId}`)
            .then(response => {
                const userData = response.data;
                setName(userData.name);
                setEmail(userData.email);
                setRole(userData.role);
                // setEmail_verified_at(userData.email_verified_at);
                // تحقق من قيمة "email_verified_at" وتعيين قيمة "لا يوجد" إذا كانت "null"
                const emailVerified = userData.email_verified_at === null ? 'لا يوجد' : userData.email_verified_at;
                // استخدم القيمة المحدثة لـ "email_verified_at"
                console.log(emailVerified);
            })
            .catch(error => {
                console.log(error.response.data);
                // التعامل مع الخطأ وعرض رسالة خطأ أو إعادة التوجيه
            });
    }, [userId]);


    const handleUpdateProfile = () => {
        const updatedData = {};

        // Check if name field has been modified
        if (name !== '') {
            updatedData.name = name;
        }

        // Check if email field has been modified
        if (email !== '') {
            updatedData.email = email;
        }

        // Check if role field has been modified
        if (role !== '') {
            updatedData.role = role;
        }

        // Check if password field has been modified and it's not empty
        if (password && confirmPassword && password === confirmPassword) {
            updatedData.password = password;
        }

        axios
            .put(`${API_CONFIG.baseURL}/api/user/${userId}`, updatedData)
            .then(response => {
                console.log(response.data);
                // Handle success
                setAlertMessage('قد تم التحديث بنجاح');
                setAlertVariant('success');
                setShowAlert(true);
            })
            .catch(error => {
                console.log(error.response.data);
                // Handle error
                setAlertMessage('لم يتم تحديث البيانات');
                setAlertVariant('danger');
                setShowAlert(true);
            });
        };

    const generateUniqueId = fieldName => `${fieldName}-${userId}`;
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
            <Card className="card ">

                <div className="custom-card-header">
                    <Card.Header>

                        تحديث الملف الشخصي
                    </Card.Header>
                </div>
        
            {showAlert && (
                <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                    {alertMessage}
                </Alert>
            )}
   

                <Card.Body>
                    <form>
                        <Row>
                            <Col>
                                <div className="mb-3 p-2 ">
                                    <label htmlFor={generateUniqueId('name')}>الاسم</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={generateUniqueId('name')}
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>

                                <div className="mb-3 p-2 ">
                                    <label htmlFor={generateUniqueId('email')}>البريد الإلكتروني</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id={generateUniqueId('email')}
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                            </Col>

                        </Row>
                        {/* <Row>
                            <Col>
                                <div className="mb-3 p-2 ">
                                    <label htmlFor={generateUniqueId('email_verified_at')}>البريد الإلكتروني لإسترجاع الحساب</label>
                                    <input
                                        type="email_verified_at"
                                        className="form-control"
                                        id={generateUniqueId('email_verified_at')}
                                        value={email_verified_at}
                                        onChange={e => setEmail_verified_at(e.target.value)}
                                    />
                                </div>
                            </Col>

                        </Row> */}
                        <Row>
                            <Col>
                                  <div className="mb-3 p-2 ">
                                    <label htmlFor={generateUniqueId('password')}>كلمة المرور</label>
                                    {/* Render the password field */}
                                    <input
                                        type="password"
                                        className="form-control"
                                        id={generateUniqueId('password')}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <div className="mb-3 p-2 ">
                                    <label htmlFor={generateUniqueId('confirmPassword')}>تأكيد كلمة المرور</label>
                                    {/* Render the confirmPassword field */}
                                    <input
                                        type="password"
                                        className="form-control"
                                        id={generateUniqueId('confirmPassword')}
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>

                                <div className="mb-3 p-2 ">
                                    <label htmlFor={generateUniqueId('role')}>الدور</label>
                                    <select
    className="form-control"
    id={generateUniqueId('role')}
    value={role}
    onChange={e => setRole(e.target.value)}
>
    <option value="">اختر الدور</option>
    <option value="1">مدير</option>
    <option value="2">مستخدم</option>
    <option value="3">مساعد</option>
</select>

                                </div>
                            </Col>
                        </Row>
                        <Card.Footer>
                            <button type="button" className="btn btn-primary" onClick={handleUpdateProfile}>
                                تحديث الملف الشخصي
                            </button>
                        </Card.Footer>
                    </form>
                </Card.Body>
            </Card>
        </>
    );
};

export default ProfileUpdateComponent;
