import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

const ProcedureModal = ({ show, onHide, lawyers, procedure, newProcedure, onSave }) => {
  const initialFormData = {
    title: procedure ? procedure.title : newProcedure.title,
    job: procedure ? procedure.job : newProcedure.job,
    lawyer_id: procedure ? procedure.lawyer_id : newProcedure.lawyer_id,
    date_start: procedure ? new Date(procedure.date_start) : newProcedure.date_start,
    date_end: procedure ? new Date(procedure.date_end) : newProcedure.date_end,
    cost: procedure ? procedure.cost : newProcedure.cost,
    cost2: procedure ? procedure.cost2 : newProcedure.cost2,
    result: procedure ? procedure.result : newProcedure.result,
    procedure_type_id: procedure ? procedure.procedure_type_id : newProcedure.procedure_type_id,
    status: procedure ? procedure.status : newProcedure.status,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleDateChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {procedure ? "Edit Procedure" : "Add New Procedure"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
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
          </Form.Group>

          <Form.Group controlId="date_start">
            <Form.Label>Date Start:</Form.Label>
            <DatePicker
              className="form-control"
              dateFormat="yyyy-MM-dd"
              placeholder="Select Date Start"
              selected={formData.date_start}
              onChange={(date) => handleDateChange("date_start", date)}
              required
            />
          </Form.Group>

          <Form.Group controlId="date_end">
            <Form.Label>Date End:</Form.Label>
            <DatePicker
              className="form-control"
              dateFormat="yyyy-MM-dd"
              placeholder="Select Date End"
              selected={formData.date_end}
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
              required
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
              required
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
              <option value="Completed">Completed</option>
              <option value="Not Executed">Not Executed</option>
              <option value="In Progress">In Progress</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            {procedure ? "Update" : "Save"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

ProcedureModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  lawyers: PropTypes.array.isRequired,
  procedure: PropTypes.object, 
  newProcedure: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ProcedureModal;
