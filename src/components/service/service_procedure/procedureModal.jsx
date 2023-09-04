import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const ProcedureModal = ({ procedure, show, onHide }) => {
  // Define state variables to hold the form data
  const [formData, setFormData] = useState({
    service_id: procedure.service_id,
    title: procedure.title,
    lawyer_id: procedure.lawyer_id || "",
    job: procedure.job,
    result: procedure.result || "",
    status: procedure.status,
    event_id: procedure.event_id || "",
    date_start: procedure.date_start || null,
    date_end: procedure.date_end || null,
    cost: procedure.cost,
    cost2: procedure.cost2 || null,
    court_id: procedure.court_id || "",
    created_by: procedure.created_by,
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send the 'formData' object to your API or perform other actions here
    console.log("Form data submitted:", formData);
    onHide(); // Close the modal after submission
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Procedure Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <label>
            Service ID:
            <input
              type="number"
              name="service_id"
              value={formData.service_id}
              onChange={(e) =>
                setFormData({ ...formData, service_id: e.target.value })
              }
              required
            />
          </label>

          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </label>

          <label>
            Lawyer ID:
            <input
              type="number"
              name="lawyer_id"
              value={formData.lawyer_id}
              onChange={(e) =>
                setFormData({ ...formData, lawyer_id: e.target.value })
              }
            />
          </label>

          {/* Add other input fields and select options here */}
          {/* Example: Job, Result, Status, Event ID, etc. */}

          <button type="submit">Save</button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ProcedureModal.propTypes = {
  procedure: PropTypes.shape({
    service_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    lawyer_id: PropTypes.number,
    job: PropTypes.string.isRequired,
    result: PropTypes.string,
    status: PropTypes.oneOf(["منتهي", "لم ينفذ", "قيد التنفيذ"]).isRequired,
    event_id: PropTypes.number,
    date_start: PropTypes.string,
    date_end: PropTypes.string,
    cost: PropTypes.number.isRequired,
    cost2: PropTypes.number,
    court_id: PropTypes.number,
    created_by: PropTypes.number.isRequired,
  }).isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default ProcedureModal;
