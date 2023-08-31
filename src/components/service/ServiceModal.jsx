import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";

import useAuth from "../Auth/AuthUser";
import API_CONFIG from "../../config";

const ServiceModal = ({ show, handleClose, service, isEditing }) => {
  const { getUser } = useAuth();
  const [formData, setFormData] = useState({
    client_id: "",
    unclient_name: "",
    unclient_phone: "",
    service_place: "",
    service_description: "",
    status: "قيد التجهيز",
    created_by: getUser().id,
  });

  const [clients, setClients] = useState([]);
  const [errors, setErrors] = useState({});
  const [showValidationAlert, setShowValidationAlert] = useState(false);

  useEffect(() => {
    if (isEditing) {
      if (service) {
        setFormData({
          client_id: service.client_id || "",
          unclient_name: service.unclient_name || "",
          unclient_phone: service.unclient_phone || "",
          service_place: service.service_place || "",
          service_description: service.service_description || "",
          status: service.status || "قيد التجهيز",
          created_by: service.created_by || getUser().id,
        });
      }
    } else if (show) {
      fetchClients();
      resetFormData();
    }
  }, [show, isEditing, service]);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/clients`);
      setClients(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const resetFormData = () => {
    setFormData({
      client_id: "",
      unclient_name: "",
      unclient_phone: "",
      service_place: "",
      service_description: "",
      status: "قيد التجهيز",
      created_by: getUser().id,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
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
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} onExited={resetFormData}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? "تعديل الخدمة" : "إضافة خدمة"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showValidationAlert && (
          <Alert variant="danger" onClose={() => setShowValidationAlert(false)} dismissible>
            من فضلك قم بملء الحقول المطلوبة.
          </Alert>
        )}

        {!isEditing && (
          <Form.Group controlId="clientToggle">
            <Form.Check
              type="radio"
              name="clientToggle"
              value="client"
              label="Client"
              checked={formData.client_id !== ""}
              onChange={() => {
                setFormData((prevData) => ({
                  ...prevData,
                  client_id: "",
                }));
              }}
            />
            <Form.Check
              type="radio"
              name="clientToggle"
              value="unclient"
              label="Unclient"
              checked={formData.unclient_name !== "" || formData.unclient_phone !== ""}
              onChange={() => {
                setFormData((prevData) => ({
                  ...prevData,
                  unclient_name: "",
                  unclient_phone: "",
                }));
              }}
            />
          </Form.Group>
        )}

        {formData.client_id !== "" ? (
          <Form.Group controlId="client_id">
            <Form.Label>Select Client:</Form.Label>
            <Form.Control as="select" name="client_id" value={formData.client_id} onChange={handleChange}>
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        ) : (
          <>
            <Form.Group controlId="unclient_name">
              <Form.Label>Unclient Name</Form.Label>
              <Form.Control
                type="text"
                name="unclient_name"
                value={formData.unclient_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="unclient_phone">
              <Form.Label>Unclient Phone</Form.Label>
              <Form.Control
                type="text"
                name="unclient_phone"
                value={formData.unclient_phone}
                onChange={handleChange}
              />
            </Form.Group>
          </>
        )}

        <Form.Group controlId="service_place">
          <Form.Label>Service Place</Form.Label>
          <Form.Control
            type="text"
            name="service_place"
            value={formData.service_place}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="service_description">
          <Form.Label>Service Description</Form.Label>
          <Form.Control
            as="textarea"
            name="service_description"
            value={formData.service_description}
            onChange={handleChange}
          />
        </Form.Group>

        {isEditing && (
          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control as="select" name="status" value={formData.status} onChange={handleChange}>
              <option value="قيد التجهيز">قيد التجهيز</option>
              <option value="قيد التنفيذ">قيد التنفيذ</option>
              <option value="منتهية">منتهية</option>
              <option value="معلقة">معلقة</option>
            </Form.Control>
          </Form.Group>
        )}
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



