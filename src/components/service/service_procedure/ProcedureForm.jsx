import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

const ProcedureModal = ({ show, onHide, lawyers, procedure, onSave }) => {
  const [formValues, setFormValues] = useState({ ...procedure });

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formValues);
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
            <Form.Label>نوع الإجراء:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formValues.title}
              onChange={(e) => handleInputChange(e, "title")}
              required
            />
          </Form.Group>

          <Form.Group controlId="job">
            <Form.Label>المطلوب:</Form.Label>
            <Form.Control
              type="text"
              name="job"
              value={formValues.job}
              onChange={(e) => handleInputChange(e, "job")}
              required
            />
          </Form.Group>

          <Form.Group controlId="formLawyer">
            <Form.Label>اسم المحامي</Form.Label>
            <Form.Control
              as="select"
              name="selectedLawyer"
              value={formValues.selectedLawyer}
              onChange={(e) => handleInputChange(e, "selectedLawyer")}
              required
            >
              <option value="">اختر المحامي</option>
              {lawyers &&
                Array.isArray(lawyers) &&
                lawyers.map((lawyer) => (
                  <option key={lawyer.id} value={lawyer.id}>
                    {lawyer.name}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="procedureDateStart">
            <Form.Label>تاريخ البدء</Form.Label>
            <DatePicker
              className="form-control"
              dateFormat="yyyy-MM-dd"
              placeholder="ادخل تاريخ البدأ"
              selected={new Date(formValues.date_start)}
              onChange={(date) =>
                handleInputChange(
                  { target: { value: date } },
                  "date_start"
                )
              }
              required
            />
          </Form.Group>

          <Form.Group controlId="procedureDateEnd">
            <Form.Label>تاريخ الانتهاء</Form.Label>
            <DatePicker
              className="form-control"
              dateFormat="yyyy-MM-dd"
              placeholder="ادخل تاريخ الانتهاء"
              selected={new Date(formValues.date_end)}
              onChange={(date) =>
                handleInputChange(
                  { target: { value: date } },
                  "date_end"
                )
              }
              required
            />
          </Form.Group>

          {/* Add other form fields here with similar input fields */}
          
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
  procedure: PropTypes.object, // Pass the procedure data to edit, or null for adding
  onSave: PropTypes.func.isRequired,
};

export default ProcedureModal;
