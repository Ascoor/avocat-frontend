import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";
import API_CONFIG from "../../../config";

const ProcedureModal = ({ procedure = {}, show, onHide, onSubmit, mode }) => {

  const isEditMode = mode === "edit";
  
  const [formData, setFormData] = useState({ ...procedure });
  const [lawyers, setLawyers] = useState([]);
  const [selectedLawyer, setSelectedLawyer] = useState("");

  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/lawyers`);
      setLawyers(response.data);
    } catch (error) {
      console.error("Error fetching lawyers:", error);
    }
  };
  
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

const handleSubmit = (e) => {
  e.preventDefault();
  // Handle form submission (e.g., send data to the server)
  onSubmit(formData, mode); // Pass the mode to indicate add or edit
  onHide(); // Close the modal after submission
};


  return (
    <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
 
      <Modal.Title>
        {mode === "edit" ? "تعديل الإجراء" : "إضافة إجراء جديد"}
      </Modal.Title>
   
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>نوع الإجراء:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="job">
            <Form.Label>الوظيفة:</Form.Label>
            <Form.Control
              type="text"
              name="job"
              value={formData.job}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          {/* Add more form fields here */}
          {/* ... */}
          {isEditMode && (
            <Form.Group controlId="status">
              <Form.Label>الحالة:</Form.Label>
              <Form.Control
                type="text"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              />
            </Form.Group>
          )}
          <Button variant="primary" type="submit">
            حفظ
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          إغلاق
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ProcedureModal.propTypes = {
  procedure: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired, // Pass "add" or "edit" as mode
};

export default ProcedureModal;
