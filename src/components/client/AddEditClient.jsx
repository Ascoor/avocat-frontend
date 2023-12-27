import React, { useState, useEffect } from 'react';
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
import moment from 'moment';
import axios from 'axios';
import '../../assets/css/Models.css';

function AddEditClient({ client = {}, isOpen, onClose, onSaved }) {
  const [formData, setFormData] = useState({
    slug: client?.slug ?? '',
    name: client?.name ?? '',
    gender: client?.gender ?? '',
    identity_number: client?.identity_number ?? '',
    date_of_birth: client?.date_of_birth
      ? moment(client.date_of_birth).toDate()
      : new Date(),
    address: client?.address ?? '',
    religion: client?.religion ?? '',
    work: client?.work ?? '',
    email: client?.email ?? '',
    phone_number: client?.phone_number ?? '',
    emergency_number: client?.emergency_number ?? '',
  });

  useEffect(() => {
    setFormData({
      ...formData,
      slug: client?.slug ?? '',
      name: client?.name ?? '',
      gender: client?.gender ?? '',
      identity_number: client?.identity_number ?? '',
      date_of_birth: client?.date_of_birth
        ? moment(client.date_of_birth).toDate()
        : new Date(),
      address: client?.address ?? '',
      religion: client?.religion ?? '',
      work: client?.work ?? '',
      email: client?.email ?? '',
      phone_number: client?.phone_number ?? '',
      emergency_number: client?.emergency_number ?? '',
    });
  }, [client]);

  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date_of_birth: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clientData = {
        ...formData,
        date_of_birth: formData.date_of_birth
          ? moment(formData.date_of_birth).format('YYYY-MM-DD')
          : null,
      };

      if (client.id) {
        await axios.put(
          `${API_CONFIG.baseURL}/api/clients/${client.id}`,
          clientData,
        );
      } else {
        await axios.post(`${API_CONFIG.baseURL}/api/clients`, clientData);
      }
      setIsSuccess(true);
      onSaved();
      onClose();
    } catch (error) {
      console.error(error);
      // Handle the error here, e.g., display an error message to the user.
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered dir="rtl">
      {isSuccess && (
        <Alert
          variant="success"
          onClose={() => setIsSuccess(false)}
          dismissible
        >
          {/* Add a success message here */}
        </Alert>
      )}

      <Modal.Header closeButton>
        <Modal.Title>
          {client?.id ? (
            <>
              <FaIdCard /> تعديل بيانات العميل
            </>
          ) : (
            <>
              <FaIdCard /> إضافة عميل
            </>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row}>
            <Form.Label column xs={12} md={6} htmlFor="inputSlug">
              <FaOrcid /> رقم العميل بالمكتب
            </Form.Label>
            <Col xs={12} md={6}>
              <Form.Control
                type="text"
                placeholder="أدخل الرمز"
                value={formData.slug}
                onChange={handleChange}
                name="slug"
                id="inputSlug"
              />
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
              >
                <option value="">اختر الجنس</option>
                <option value="ذكر">ذكر</option>
                <option value="أنثى">أنثى</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column xs={12} md={6} htmlFor="inputIdentityNumber">
              <FaIdCard /> رقم الهوية
            </Form.Label>
            <Col xs={12} md={6}>
              <Form.Control
                type="text"
                placeholder="أدخل رقم الهوية"
                value={formData.identity_number}
                onChange={handleChange}
                name="identity_number"
                id="inputIdentityNumber"
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
                type="text"
                placeholder="أدخل رقم الهاتف"
                value={formData.phone_number}
                onChange={handleChange}
                name="phone_number"
                id="inputPhoneNumber"
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
                type="text"
                placeholder="أدخل رقم الطوارئ"
                value={formData.emergency_number}
                onChange={handleChange}
                name="emergency_number"
                id="inputEmergencyNumber"
              />
            </Col>
          </Form.Group>

          <Button variant="secondary" onClick={onClose}>
            الغاء
          </Button>
          <Button variant="primary" type="submit">
            حفظ
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddEditClient;
