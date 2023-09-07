import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import arEG from "date-fns/locale/ar-EG";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

import useAuth from "../../Auth/AuthUser"; // Import the hook here

const ServiceProcedureModal = ({
  show,
  onHide,
  lawyers,
  newServiceProcedure,
  serviceId,
  onSave,
  onSelectProcedure, // Add this prop
  selectedProcedure, // Add this prop
}) => {
  const [formData, setFormData] = useState({
    title: "",
    job: "",
    lawyer_id: "",
    date_start: null,
    date_end: null,
    cost: "",
    cost2: "",
    result: "",
    status: "",
    place: "", // Add place field
  });

  useEffect(() => {
    if (selectedProcedure) {
      setFormData(selectedProcedure);
    } else if (newServiceProcedure) {
      setFormData(newServiceProcedure);
    } else {
      setFormData({
        title: "",
        job: "",
        lawyer_id: "",
        date_start: null,
        date_end: null,
        cost: "",
        cost2: "",
        result: "",
        status: "",
        place: "",
      });
    }
  }, [selectedProcedure, newServiceProcedure]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{selectedProcedure ? "Edit Procedure" : "Add New Procedure"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </Form.Group>

  
          <Form.Group controlId="job">
            <Form.Label>Job:</Form.Label>
            <Form.Control
              type="text"
              value={formData.job}
              onChange={(e) =>
                setFormData({ ...formData, job: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group controlId="lawyer">
            <Form.Label>Lawyer:</Form.Label>
            <Form.Control
              as="select"
              value={formData.lawyer_id}
              onChange={(e) =>
                setFormData({ ...formData, lawyer_id: e.target.value })
              }
              required
            >
              <option value="">Select Lawyer</option>
              {lawyers.map((lawyer) => (
                <option key={lawyer.id} value={lawyer.id}>
                  {lawyer.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group> <Form.Group controlId="date_start">
        <Form.Label>Date Start:</Form.Label>
        <DatePicker
          className="form-control"
          dateFormat="yyyy-MM-dd"
          selected={formData.date_start ? new Date(formData.date_start) : null}
          onChange={(date) => handleDateChange("date_start", date)}
          required
        />
      </Form.Group>

      <Form.Group controlId="date_end">
        <Form.Label>Date End:</Form.Label>
        <DatePicker
          className="form-control"
          dateFormat="yyyy-MM-dd"
          selected={formData.date_end ? new Date(formData.date_end) : null}
          onChange={(date) => handleDateChange("date_end", date)}
          required
        />
      </Form.Group>
          <Form.Group controlId="cost">
            <Form.Label>Cost:</Form.Label>
            <Form.Control
              type="number"
              value={formData.cost}
              onChange={(e) =>
                setFormData({ ...formData, cost: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="cost2">
            <Form.Label>Cost 2:</Form.Label>
            <Form.Control
              type="number"
              value={formData.cost2}
              onChange={(e) =>
                setFormData({ ...formData, cost2: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group controlId="result">
            <Form.Label>Result:</Form.Label>
            <Form.Control
              type="text"
              value={formData.result}
              onChange={(e) =>
                setFormData({ ...formData, result: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="place">
            <Form.Label>Place:</Form.Label>
            <Form.Control
              type="text"
              value={formData.place}
              onChange={(e) => setFormData({ ...formData, place: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="status">
            <Form.Label>Status:</Form.Label>
            <Form.Control
              as="select"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="">Select Status</option> 
               <option value="قيد التجهيز">قيد التجهيز</option>
                <option value="">لم ينفذ</option>

                <option value="منتهي">منتهي</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            {isEditing ? "Update" : "Save"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

ServiceProcedureModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  lawyers: PropTypes.array.isRequired,
  SelectProcedure: PropTypes.object, // Change prop name to SelectProcedure

  newServiceProcedure: PropTypes.object, // Add prop type for newServiceProcedure
  serviceId: PropTypes.number,
  onSave: PropTypes.func,
};

export default ServiceProcedureModal;
