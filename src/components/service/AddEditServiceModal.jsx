
import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import useAuth from '../layout/AuthTool/AuthUser';
import API_CONFIG from '../../config';

import '../../assets/css/Models.css';

const AddEditServiceModal = ({ show, handleClose, service, isEditing }) => {
  const { getUser } = useAuth();
  const [serviceData, setServiceData] = useState({
    client_choice: 'client',
    client_id: '',
    unclient_id: '',
    created_by: getUser().id,
    status: '', 
    title: '',

    service_year: '',
    service_place_name: '',
    description: '',
  });
  const [clients, setClients] = useState([]);
  const [unclients, setUnclients] = useState([]);
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsResponse = await axios.get(`${API_CONFIG.baseURL}/api/clients`);
        const unclientsResponse = await axios.get(`${API_CONFIG.baseURL}/api/unclients`);
        setClients(clientsResponse.data.clients);
        setUnclients(unclientsResponse.data.unclients);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isEditing && service) {
      const clientChoice = service.client_id ? 'client' : 'unclient';
      setServiceData({
        ...service,
        client_choice: clientChoice,
        client_id: service.client_id || '',
        unclient_id: service.unclient_id || '',
      });
    }
  }, [isEditing, service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (serviceData.client_choice === 'client' && !serviceData.client_id) {
      newErrors.client_id = 'Client selection is required.';
    } else if (serviceData.client_choice === 'unclient' && !serviceData.unclient_id) {
      newErrors.unclient_id = 'Unclient selection is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowValidationAlert(false);
    if (validateForm()) {
      try {
        const endpoint = isEditing ? `/api/services/${service.id}` : '/api/services';
        const method = isEditing ? 'put' : 'post';
        const response = await axios[method](`${API_CONFIG.baseURL}${endpoint}`, serviceData);
        console.log(response.data);
        handleClose();
      } catch (error) {
        console.error('Error:', error);
        setShowValidationAlert(true);
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
          <Alert
            variant="danger"
            onClose={() => setShowValidationAlert(false)}
            dismissible
          >
            <p>There was an error processing your request. Please try again.</p>
          </Alert>
        )}
        <Form.Group controlId="client_choice">
        {isEditing ? (
          <Form.Label>{serviceData.client_choice === 'client' ? 'Client' : 'Unclient'}</Form.Label>
        ) : (
            <>
              <Form.Check
                type="radio"
                name="client_choice"
                label="عميل"
                value="client"
                checked={serviceData.client_choice === 'client'}
                onChange={() =>
                  handleChange({
                    target: { name: 'client_choice', value: 'client' },
                  })
                }
              />
              <Form.Check
                type="radio"
                name="client_choice"
                label="عميل غير مسجل"
                value="unclient"
                checked={serviceData.client_choice === 'unclient'}
                onChange={() =>
                  handleChange({
                    target: { name: 'client_choice', value: 'unclient' },
                  })
                }
              />
            </>
          )}
        </Form.Group>
        {serviceData.client_choice === 'client' ? (
  <Form.Group controlId="client_id">
    <Form.Label>اختر العميل</Form.Label>
    <Form.Control
      as="select"
      name="client_id"
      value={serviceData.client_id || ''}
      onChange={handleChange}
    >
      <option value="">اختر العميل</option>
      {clients.map((client) => (
        <option key={client.id} value={client.id}>
          {client.name}
        </option>
      ))}
    </Form.Control>
  </Form.Group>
) : (
  <Form.Group controlId="unclient_name">
    <Form.Label>اسم العميل غير مسجل</Form.Label>
    <Form.Control
      as="select" // Corrected from type="select" to as="select"
      name="unclient_id"
      value={serviceData.unclient_id || ''}
      onChange={handleChange}
    >
      <option value="">اختر العميل غير مسجل</option>
      {unclients.map((unclient) => (
        <option key={unclient.id} value={unclient.id}>
          {unclient.name}
        </option>
      ))}
    </Form.Control>
  </Form.Group>
)}

        {isEditing && (
          <>
            <Form.Group controlId="slug">
              <Form.Label>رقم ملف الخدمة</Form.Label>
              <Form.Control
                type="text"
                name="slug"
                value={service.slug}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>حالة الخدمة</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={serviceData.status}
                onChange={handleChange}
              >
                <option value="قيد التجهيز">قيد التجهيز</option>
                <option value="قيد التنفيذ">قيد التنفيذ</option>
                <option value="منتهية">منتهية</option>
                <option value="معلقة">معلقة</option>
              </Form.Control>
            </Form.Group>
          </>
        )}
        <Form.Group controlId="title">
          <Form.Label>موضوع الخدمة</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={serviceData.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="service_place_name">
          <Form.Label>الجهة</Form.Label>
          <Form.Control
            type="text"
            name="service_place_name"
            value={serviceData.service_place_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label> وصف الخدمة</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={serviceData.description}
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

export default AddEditServiceModal;
