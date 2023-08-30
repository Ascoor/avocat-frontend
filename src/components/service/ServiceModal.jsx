import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";

import useAuth from "../Auth/AuthUser"; // Provide the correct path to AuthUser
import API_CONFIG from "../../config"; // Provide the correct path to API_CONFIG

const ServiceModal = ({ show, handleClose, service, isEditing }) => {
  const { getUser } = useAuth();
  const [formData, setFormData] = useState({
    client_choice: service ? (service.client_id ? "select_client" : "new_client") : "select_client",
    client_id: service ? service.client_id : "",
    unclient_name: service ? service.unclient_name : "",
    unclient_phone: service ? service.unclient_phone : "",
    service_place: service ? service.service_place : "",
    service_description: service ? service.service_description : "",
    status: service ? service.status : "قيد التجهيز",
    created_by: getUser().id,
  });

  const [clients, setClients] = useState([]);
  const [errors, setErrors] = useState({});
  const [showValidationAlert, setShowValidationAlert] = useState(false);

  useEffect(() => {
    if (show && !isEditing) {
      fetchClients();
    }
  }, [show]);

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
      client_id: "",
      unclient_name: "",
      unclient_phone: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear errors for the changed input
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.service_description || !formData.created_by) {
      setShowValidationAlert(true);
      return;
    }

    try {
      if (isEditing) {
        await axios.put(
          `${API_CONFIG.baseURL}/api/services/${service.id}`,
          formData
        );
      } else {
        await axios.post(`${API_CONFIG.baseURL}/api/services`, formData);
      }
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
        <Modal.Title>{isEditing ? "تعديل الخدمة" : "إضافة خدمة"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showValidationAlert && (
          <Alert
            variant="danger"
            onClose={() => setShowValidationAlert(false)}
            dismissible
          >
            من فضلك قم بملء الحقول المطلوبة.
          </Alert>
        )}

        <Form.Group controlId="client_choice">
          <Form.Label>اختر عميلًا أو أدخل بيانات العميل</Form.Label>
          <Form.Check
            type="radio"
            name="client_choice"
            label="اختر عميلًا"
            value="select_client"
            checked={formData.client_choice === "select_client"}
            onChange={() => handleRadioChange("select_client")}
          />
          <Form.Check
            type="radio"
            name="client_choice"
            label="أدخل بيانات العميل"
            value="new_client"
            checked={formData.client_choice === "new_client"}
            onChange={() => handleRadioChange("new_client")}
          />
        </Form.Group>

        {formData.client_choice === "select_client" && (
          <Form.Group controlId="client_id">
            <Form.Label>اختر العميل</Form.Label>
            <Form.Control
              as="select"
              name="client_id"
              value={formData.client_id || ""}
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
        )}

        {formData.client_choice === "new_client" && (
          <>
            <Form.Group controlId="unclient_name">
              <Form.Label>اسم العميل</Form.Label>
              <Form.Control
                type="text"
                name="unclient_name"
                value={formData.unclient_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="unclient_phone">
              <Form.Label>رقم العميل</Form.Label>
              <Form.Control
                type="text"
                name="unclient_phone"
                value={formData.unclient_phone}
                onChange={handleChange}
              />
            </Form.Group>
          </>
        )}

        {isEditing && (
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
        )}

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
          {isEditing ? "إلغاء" : "إغلاق"}
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {isEditing ? "تحديث" : "إضافة"} الخدمة
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
