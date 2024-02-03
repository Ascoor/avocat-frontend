import { useState, useEffect } from 'react';
import { Modal, Alert, Form, Row, Col, Button } from 'react-bootstrap';
import {
  FaOrcid,
  FaUserEdit,
  FaIdCard,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaPray,
} from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import API_CONFIG from '../../../config';
import '../../../assets/css/Models.css';

function AddEditUnclient({ unclient = {}, isOpen, onClose, onSaved }) {
  const isEditMode = unclient && unclient.id;
  const [validationErrors, setValidationErrors] = useState('');

  const initialFormData = {
    name: '',
    gender: '',
    identity_number: '',
    date_of_birth: '',
    address: '',
    religion: '',
    work: '',
    email: '',
    phone_number: '',
    emergency_number: '',
    slug: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const resetFormData = () => {
    setFormData(initialFormData);
    setValidationErrors({});
  };

  useEffect(() => {
    if (unclient) {
      setFormData({
        name: unclient.name || '',
        gender: unclient.gender || '',
        identity_number: unclient.identity_number || '',
        date_of_birth: unclient.date_of_birth || '',
        address: unclient.address || '',
        religion: unclient.religion || '',
        work: unclient.work || '',
        email: unclient.email || '',
        phone_number: unclient.phone_number || '',
        emergency_number: unclient.emergency_number || '',
        slug: unclient.slug || '', // Handle slug similarly
      });
    } else {
      resetFormData();
    }
  }, [unclient]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDateChange = (date) => {
    setFormData({ ...formData, date_of_birth: date || new Date() });
  };

  const formatDateForBackend = (date) => {
    if (!date) return '';
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toISOString().split('T')[0];
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      date_of_birth: formatDateForBackend(formData.date_of_birth),
    };
    try {
      let successMessage = '';
      if (isEditMode) {
        await axios.put(
          `${API_CONFIG.baseURL}/api/unclients/${unclient.id}`,
          formattedData,
        );
        successMessage = 'تم تحديث بيانات العميل بنجاح'; // Update success message
      } else {
        await axios.post(`${API_CONFIG.baseURL}/api/unclients`, formattedData);
        successMessage = 'تم إضافة العميل بنجاح'; // Create success message
      }
      resetFormData();
      onSaved(successMessage); // Pass success message to parent component
      onClose();
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Set the validation errors from the server's response
        setValidationErrors(error.response.data.errors);
      } else {
        console.error(error);
        // Handle other types of errors (optional)
      }
    }
  };

  return (
    // JSX for the component
    <Modal show={isOpen} onHide={onClose} centered dir="rtl">
      <Modal.Header closeButton>
        <Modal.Title>
          {unclient?.id ? (
            <>
              <FaIdCard /> تعديل بيانات العميل بدون توكيل
            </>
          ) : (
            <>
              <FaIdCard /> إضافة عميل بدون توكيل
            </>
          )}
        </Modal.Title>
      </Modal.Header>
      {validationErrors.non_field_errors && (
        <Alert variant="danger">
          {validationErrors.non_field_errors.join(', ')}
        </Alert>
      )}

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row}>
            <Form.Label column xs={12} md={6} htmlFor="inputSlug">
              <FaOrcid /> رقم العميل بدون توكيل بالمكتب
            </Form.Label>
            <Col xs={12} md={6}>
              <Form.Control
                type="text"
                placeholder="أدخل رقم العميل بدون توكيل بالمكتب"
                value={formData.slug}
                onChange={handleChange}
                name="slug"
                id="inputSlug"
                isInvalid={!!validationErrors.slug}
                required
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.slug ? validationErrors.slug[0] : ''}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* Repeat similar structure for other fields */}
          <Form.Group as={Row}>
            <Form.Label column xs={12} md={6} htmlFor="inputName">
              <FaUserEdit /> الاسم
            </Form.Label>
            <Col xs={12} md={6}>
              <Form.Control
                type="text"
                placeholder="أدخل الاسم"
                value={formData.name}
                onChange={handleChange}
                name="name"
                id="inputName"
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column xs={12} md={6} htmlFor="inputGender">
              <FaIdCard /> الجنس
            </Form.Label>
            <Col xs={12} md={6}>
              <Form.Control
                as="select"
                value={formData.gender}
                onChange={handleChange}
                name="gender"
                id="inputGender"
                required
              >
                <option value="">اختر الجنس</option>
                <option value="ذكر">ذكر</option>
                <option value="أنثى">أنثى</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column xs={12} md={6} htmlFor="inputIdentityNumber">
              <FaIdCard /> رقم الهوية
            </Form.Label>
            <Col xs={12} md={6}>
              <Form.Control
                type="number"
                min="0"
                placeholder="أدخل رقم الهوية"
                value={formData.identity_number}
                onChange={handleChange}
                name="identity_number"
                id="inputIdentityNumber"
                required
                maxLength="14"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column xs={12} md={6} htmlFor="inputDateOfBirth">
              <FaCalendarAlt /> تاريخ الميلاد
            </Form.Label>
            <Col xs={12} md={6}>
              <DatePicker
                selected={
                  formData.date_of_birth
                    ? new Date(formData.date_of_birth)
                    : null
                }
                onChange={handleDateChange}
                name="date_of_birth"
                id="inputDateOfBirth"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column xs={12} md={6} htmlFor="inputAddress">
              <FaMapMarkerAlt /> العنوان
            </Form.Label>
            <Col xs={12} md={6}>
              <Form.Control
                type="text"
                placeholder="أدخل العنوان"
                value={formData.address}
                onChange={handleChange}
                name="address"
                id="inputAddress"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column xs={12} md={6} htmlFor="inputPhoneNumber">
              <FaPhone /> رقم الهاتف
            </Form.Label>
            <Col xs={12} md={6}>
              <Form.Control
                type="tel"
                placeholder="أدخل رقم الهاتف"
                value={formData.phone_number}
                onChange={handleChange}
                name="phone_number"
                id="inputPhoneNumber"
                required
                maxLength="11"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column xs={12} md={6} htmlFor="inputEmail">
              <FaEnvelope /> البريد الالكتروني
            </Form.Label>
            <Col xs={12} md={6}>
              <Form.Control
                type="email"
                placeholder="أدخل البريد الالكتروني"
                value={formData.email}
                onChange={handleChange}
                name="email"
                id="inputEmail"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column xs={12} md={6} htmlFor="inputReligion">
              <FaPray /> الديانة
            </Form.Label>
            <Col xs={12} md={6}>
              <Form.Control
                as="select"
                value={formData.religion}
                onChange={handleChange}
                name="religion"
                id="inputReligion"
                required
              >
                <option value="">اختر الديانة</option>
                <option value="مسلم">مسلم</option>
                <option value="مسيحي">مسيحي</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column xs={12} md={6} htmlFor="inputWork">
              <FaBriefcase /> الوظيفة
            </Form.Label>
            <Col xs={12} md={6}>
              <Form.Control
                type="text"
                placeholder="أدخل الوظيفة"
                value={formData.work}
                onChange={handleChange}
                name="work"
                id="inputWork"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column xs={12} md={6} htmlFor="inputEmergencyNumber">
              <FaPhone /> رقم الطوارئ
            </Form.Label>
            <Col xs={12} md={6}>
              <Form.Control
                type="tel"
                placeholder="أدخل رقم الطوارئ"
                value={formData.emergency_number}
                onChange={handleChange}
                name="emergency_number"
                id="inputEmergencyNumber"
                maxLength="11"
              />
            </Col>
          </Form.Group>

          <Button variant="secondary" onClick={onClose}>
            الغاء
          </Button>
          <Button variant="primary" type="submit">
            {isEditMode ? 'تعديل' : 'إضافة'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddEditUnclient;
