import { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';

import { ar } from 'date-fns/locale'; // Import Arabic locale
import 'react-datepicker/dist/react-datepicker.css';

const LawyerAddEdit = ({ onSubmit, initialValues }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUser, setIsUser] = useState(!!initialValues?.user_id);
  const [name, setName] = useState(initialValues?.name || '');
  const [birthdate, setBirthdate] = useState(initialValues?.birthdate || null);
  const [identityNumber, setIdentityNumber] = useState(
    initialValues?.identity_number || '',
  );
  const [lawRegNumber, setLawRegNumber] = useState(
    initialValues?.law_reg_num || '',
  );
  const [lawyerClass, setLawyerClass] = useState(
    initialValues?.lawyer_class || '',
  );
  const [email, setEmail] = useState(initialValues?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(
    initialValues?.phone_number || '',
  );
  const [religion, setReligion] = useState(initialValues?.religion || '');
  const [gender, setGender] = useState(initialValues?.gender || '');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const isValidDate = (date) => {
    return date !== null && date.toString() !== 'Invalid Date';
  };

  useEffect(() => {
    setIsEditing(!!initialValues);
    setIsUser(!!initialValues?.user_id);
    if (initialValues?.user_id) {
      setPassword('********');
      setConfirmPassword('********');
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setShowAlert(true);
      return;
    }
    setShowAlert(false);

    // تحويل تاريخ الولادة إلى التنسيق الصحيح (YYYY-MM-DD)
    const formattedBirthdate = moment(birthdate).format('YYYY-MM-DD');

    const formData = {
      name,
      birthdate: formattedBirthdate,
      identity_number: identityNumber,
      law_reg_num: lawRegNumber,
      lawyer_class: lawyerClass,
      email,
      phone_number: phoneNumber,
      religion,
      gender,
    };

    if (isUser && password !== '********') {
      formData.password = password;
      if (password !== confirmPassword) {
        // إظهار خطأ إذا كانت كلمتا المرور غير متطابقتين
        return;
      }
    }

    onSubmit(formData);
  };

  const validateForm = () => {
    if (
      !name ||
      !isValidDate(birthdate) ||
      !identityNumber ||
      !lawRegNumber ||
      !email ||
      !phoneNumber ||
      !religion ||
      !gender
    ) {
      return false;
    }
    if (
      isUser &&
      showPasswordInput &&
      (password !== confirmPassword || password === '********')
    ) {
      return false;
    }
    return true;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // If editing, clear confirmPassword only when password is changed
    if (isEditing) {
      setConfirmPassword('');
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      {showAlert && (
        <Alert variant="danger">يرجى ملء جميع الحقول المطلوبة.</Alert>
      )}
      <Form.Check
        type="radio"
        label="User"
        checked={isUser}
        onChange={() => setIsUser(true)}
      />
      <Form.Check
        type="radio"
        label="Not User"
        checked={!isUser}
        onChange={() => setIsUser(false)}
      />
      {isUser && (
        <>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Re-type Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
        </>
      )}

      <Form.Group>
        <Form.Label>الاسم</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>
          <FaCalendarAlt /> تاريخ الميلاد
        </Form.Label>
        <DatePicker
          selected={isValidDate(birthdate) ? birthdate : null}
          onChange={(date) => setBirthdate(date)}
          locale={ar} // Set Arabic locale
          dateFormat="yyyy-MM-dd"
          className="form-control"
          placeholderText="اختر تاريخ الميلاد"
          isInvalid={!isValidDate(birthdate) || birthdate === null}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>رقم التسجيل القانوني</Form.Label>
        <Form.Control
          type="text"
          value={lawRegNumber || ''}
          onChange={(e) => setLawRegNumber(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>فئة المحامي</Form.Label>
        <Form.Control
          as="select"
          value={lawyerClass || ''}
          onChange={(e) => setLawyerClass(e.target.value)}
          required
        >
          <option value="">إختر</option>
          <option value="نقض">نقض</option>
          <option value="إستئناف">إستئناف</option>
          <option value="إبتدائي">إبتدائي</option>
          <option value="جدول عام">جدول عام</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>البريد الإلكتروني</Form.Label>
        <Form.Control
          type="email"
          value={email || ''}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>الجنس</Form.Label>
        <Form.Control
          as="select"
          value={gender || ''}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">اختر</option>
          <option value="ذكر">ذكر</option>
          <option value="أنثى">أنثى</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>الديانة</Form.Label>
        <Form.Control
          as="select"
          value={religion || ''}
          onChange={(e) => setReligion(e.target.value)}
        >
          <option value="">اختر</option>
          <option value="مسلم">مسلم</option>
          <option value="مسيحى">مسيحى</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>رقم الهاتف</Form.Label>
        <Form.Control
          type="tel"
          placeholder="أدخل رقم الهاتف"
          value={phoneNumber || ''}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>رقم الهوية</Form.Label>
        <Form.Control
          type="text"
          placeholder="أدخل رقم الهويةالمكون من 14 رقم"
          value={identityNumber}
          onChange={(e) => setIdentityNumber(e.target.value)}
          maxLength={14}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        حفظ
      </Button>
    </Form>
  );
};

export default LawyerAddEdit;
