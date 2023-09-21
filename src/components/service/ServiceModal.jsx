import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import useAuth from '../layout/AuthTool/AuthUser';
import API_CONFIG from '../../config';

import '../../assets/css/Models.css';
const ServiceModal = ({
  show,
  handleClose,
  service,
  handleServiceAddedOrEdited,
  isEditing,
}) => {
  const { getUser } = useAuth();
  const [missingFieldsAlert, setMissingFieldsAlert] = useState(false);

  const initialFormData = {
    client_choice: 'client',
    client_id: '',
    unclient_name: '',
    unclient_phone: '',
    unclient_nid: '',
    created_by: getUser().id,
    service_status: '',
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
        setFormData({
          ...initialFormData,
          client_choice: service.client_id ? 'client' : 'unclient',
          client_id: service.client_id || '',
          unclient_id: service.unclient_id || '',
          unclient_name: service.unclient?.name || '',
          unclient_phone: service.unclient?.phone_number || '',
          unclient_nid: service.unclient?.identity_number || '',
          service_status: service.service_status || '',
          service_name: service.service_name || '',
          service_place: service.service_place || '',
          service_description: service.service_description || '',
          // Update other form fields as needed
        });
      }
    } else if (show) {
      fetchClients();
    }
  }, [show, isEditing, service]);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/clients`);
      setClients(response.data);
      resetForm();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setShowValidationAlert(false);
  };

  const handleRadioChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      client_choice: value,
      client_id: '',
      unclient_name: '',
      unclient_phone: '',
      unclient_nid: '',
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

    // Check if client_id or non-client info (unclient_name, unclient_phone, or unclient_nid) is provided
    if (
      (formData.client_choice === 'client' && !formData.client_id) ||
      (formData.client_choice === 'unclient' &&
        (!formData.unclient_name ||
          !formData.unclient_phone ||
          !formData.unclient_nid))
    ) {
      // If not provided, show an error and return
      setShowValidationAlert(true);
      return;
    }

    // Check for required fields based on the action (add or edit)
    const requiredFields = isEditing
      ? [
          'service_name',
          'service_description',
          'service_place',
          'updated_by',
          'service_status',
        ]
      : ['service_name', 'service_description', 'service_place', 'created_by'];

    // Check if all required fields are provided
    const missingFields = requiredFields.filter(
      (fieldName) => !formData[fieldName]
    );

    if (missingFields.length > 0) {
      // If any required field is missing, show an error and return
      setShowValidationAlert(true);
      return;
    }

    // If all validations pass, you can proceed with your API request to add or edit the service.
    try {
      if (isEditing) {
        await axios.put(
          `${API_CONFIG.baseURL}/api/services/${service.id}`,
          formData
        );
      } else {
        await axios.post(`${API_CONFIG.baseURL}/api/services`, formData);
      }
      handleServiceAddedOrEdited();
      handleClose();
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
        {missingFieldsAlert && (
          <Alert
            variant="danger"
            onClose={() => setMissingFieldsAlert(false)}
            dismissible
          >
            من فضلك قم بملء الحقول المطلوبة.
          </Alert>
        )}

        <Form.Group controlId="client_choice">
          <Form.Label>بيانات الخدمة</Form.Label>
          {isEditing ? null : (
            <>
              <Form.Check
                type="radio"
                name="client_choice"
                label="عميل"
                value="client"
                checked={formData.client_choice === 'client'}
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
                checked={formData.client_choice === 'unclient'}
                onChange={() =>
                  handleChange({
                    target: { name: 'client_choice', value: 'unclient' },
                  })
                }
              />
            </>
          )}
        </Form.Group>

        {/* Display selected client or unclient fields based on client_choice */}
        {formData.client_choice === 'client' ? (
          <Form.Group controlId="client_id">
            <Form.Label>اختر العميل</Form.Label>
            <Form.Control
              as="select"
              name="client_id"
              value={formData.client_id || ''}
              onChange={handleChange}
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
        ) : (
          <>
            <Form.Group controlId="unclient_name">
              <Form.Label>اسم العميل</Form.Label>
              <Form.Control
                type="text"
                name="unclient_name"
                value={formData.unclient_name}
                onChange={handleChange}
                readOnly={isEditing} // Make it read-only in edit mode
              />
            </Form.Group>
            <Form.Group controlId="unclient_phone">
              <Form.Label>رقم هاتف العميل</Form.Label>
              <Form.Control
                type="number"
                name="unclient_phone"
                value={formData.unclient_phone}
                readOnly={isEditing} // Make it read-only in edit mode
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="unclient_nid">
              <Form.Label>رقم هوية العميل</Form.Label>
              <Form.Control
                type="number"
                name="unclient_nid"
                value={formData.unclient_nid}
                onChange={handleChange}
                readOnly={isEditing} // Make it read-only in edit mode
              />
            </Form.Group>
          </>
        )}

        {isEditing && (
          <>
            <Form.Group controlId="service_no">
              <Form.Label>رقم ملف الخدمة</Form.Label>
              <Form.Control
                type="text"
                name="service_no"
                value={service.service_no}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>حالة الخدمة</Form.Label>
              <Form.Control
                as="select"
                name="service_status"
                value={formData.service_status}
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
          <Form.Label>الجهة</Form.Label>
          <Form.Control
            type="text"
            name="service_place"
            value={formData.service_place}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="service_description">
          <Form.Label> وصف الخدمة</Form.Label>
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
  handleServiceAddedOrEdited: PropTypes.func.isRequired,
  service: PropTypes.object,
  isEditing: PropTypes.bool.isRequired,
};

export default ServiceModal;
