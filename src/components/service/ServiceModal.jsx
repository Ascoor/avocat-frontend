import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import useAuth from '../Auth/AuthUser';
import API_CONFIG from '../../config';

const ServiceModal = ({ show, handleClose, service, isEditing }) => {
  const { getUser } = useAuth();

  const initialFormData = {
    client_choice: 'client',
    client_id: '',
    unclient_name: '',
    unclient_phone: '',
    created_by: getUser().id,
    status: 'قيد التجهيز',
    service_name: '',
    service_place: '',
    service_description: '',
    // Add other form fields with their initial values here
  };

  const [formData, setFormData] = useState(initialFormData);
  const [clients, setClients] = useState([]);
  const [errors, setErrors] = useState({});
  const [showValidationAlert, setShowValidationAlert] = useState(false);

  useEffect(() => {
    if (isEditing) {
      if (service) {
        const clientChoice = service.client_id ? 'client' : 'unclient';
        setFormData({
          client_choice: clientChoice,
          client_id: service.client_id || '',
          unclient_name: service.unclient_name || '',
          unclient_phone: service.unclient_phone || '',
          created_by: service.created_by || getUser().id,
          status: service.status || 'قيد التجهيز',
          service_name: service.service_name || '',
          service_place: service.service_place || '',
          service_description: service.service_description || '',
          // Update other form fields as needed
        });
      }
    } else if (show) {
      // إذا كانت عملية إضافة جديدة، فقم بجلب العملاء
      fetchClients();
    }
  }, [show, isEditing, service]);
  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setShowValidationAlert(false);
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/clients`);
      setClients(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const handleRadioChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      client_choice: value,
      client_id: '',
      unclient_name: '',
      unclient_phone: '',
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.service_description || !formData.created_by) {
      setShowValidationAlert(true);
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`${API_CONFIG.baseURL}/api/services/${service.id}`, formData);
      } else {
        await axios.post(`${API_CONFIG.baseURL}/api/services`, formData);
      }
      handleClose();
      resetForm(); // Clear the form
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{isEditing ? 'تعديل الخدمة' : 'إضافة خدمة'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {showValidationAlert && (
        <Alert variant="danger" onClose={() => setShowValidationAlert(false)} dismissible>
          من فضلك قم بملء الحقول المطلوبة.
        </Alert>
      )}

      <Form.Group controlId="client_choice">
        <Form.Label>اختر عميلًا أو أدخل بيانات العميل</Form.Label>
        {isEditing ? (
          <>
            <Form.Check
              type="radio"
              name="client_choice"
              label="عميل"
              value="client"
              checked={formData.client_id !== ''}
              onChange={() => handleRadioChange('client')}
              disabled={formData.unclient_name !== '' || formData.unclient_phone !== ''}
            />
            <Form.Check
              type="radio"
              name="client_choice"
              label="عميل غير مسجل"
              value="unclient"
              checked={formData.client_id === ''}
              onChange={() => handleRadioChange('unclient')}
            />
          </>
        ) : (
          <>
            <Form.Check
              type="radio"
              name="client_choice"
              label="عميل"
              value="client"
              checked={formData.client_choice === 'client'}
              onChange={() => handleRadioChange('client')}
            />
            <Form.Check
              type="radio"
              name="client_choice"
              label="عميل غير مسجل"
              value="unclient"
              checked={formData.client_choice === 'unclient'}
              onChange={() => handleRadioChange('unclient')}
            />
          </>
        )}
      </Form.Group>

      {formData.client_choice === 'client' && !isEditing ? (
        // عرض حقول العميل إذا تم اختياره
        <>
          <Form.Group controlId="client_id">
            <Form.Label>اختر العميل</Form.Label>
            <Form.Control
              as="select"
              name="client_id"
              value={formData.client_id || ''}
              onChange={handleChange}
              readOnly={isEditing}
            >
              <option value="">اختر العميل</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </Form.Control>
            {errors.client_id && (
              <Form.Text className="text-danger">{errors.client_id}</Form.Text>
            )}
          </Form.Group>
        </>
      ) : formData.client_choice === 'unclient' ? (
        // إذا تم اختيار "عميل غير مسجل"، عرض حقول العميل غير المسجل
        <>
          <Form.Group controlId="unclient_name">
            <Form.Label>اسم العميل</Form.Label>
            <Form.Control
              type="text"
              name="unclient_name"
              value={formData.unclient_name || ''}
              onChange={handleChange}
              readOnly={isEditing}
            />
          </Form.Group>
          <Form.Group controlId="unclient_phone">
            <Form.Label>رقم العميل</Form.Label>
            <Form.Control
              type="text"
              name="unclient_phone"
              value={formData.unclient_phone || ''}
              onChange={handleChange}
              readOnly={isEditing}
            />
          </Form.Group>
        </>
      ) : null}

        {isEditing && (
          <>
            <Form.Group controlId="status">
              <Form.Label>حالة الخدمة</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="قيد التجهيز">قيد التجهيز</option>
                <option value="قيد التنفيذ">قيد التنفيذ</option>
                <option value="منتهية">منتهية</option>
                <option value="معلقة">معلقة</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="service_no">
              <Form.Label>رقم ملف الخدمة</Form.Label>
              <Form.Control
                type="text"
                name="service_no"
                value={service.service_no}
                readOnly
              />
            </Form.Group>
          </>
        )} 
        <Form.Group controlId="service_name">
          <Form.Label>موضوع الخدمة</Form.Label>
          <Form.Control
            type="text"
            name="service_name"
            value={formData.service_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="service_place">
          <Form.Label>مكان الخدمة</Form.Label>
          <Form.Control
            type="text"
            name="service_place"
            value={formData.service_place}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="service_description">
          <Form.Label>وصف الخدمة</Form.Label>
          <Form.Control
            as="textarea"
            name="service_description"
            value={formData.service_description}
            onChange={handleChange}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {isEditing ? 'إلغاء' : 'إغلاق'}
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {isEditing ? 'تحديث' : 'إضافة'} الخدمة
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ServiceModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  service: PropTypes.object,
  isEditing: PropTypes.bool.isRequired,
};

export default ServiceModal;
