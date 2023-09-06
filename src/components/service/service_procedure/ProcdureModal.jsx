import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import arEG from "date-fns/locale/ar-EG";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

import useAuth from "../../Auth/AuthUser"; // Import the hook here

const ProcedureModal = ({
  show,
  onHide,
  lawyers,
  serviceProcedure,
  newServiceProcedure,
  serviceId,
  onSave,
}) => {
  const { getUser } = useAuth();
  const user = getUser();
  registerLocale("ar_eg", arEG);
  setDefaultLocale("ar_eg");

  // Initialize formData with date_start and date_end as null dates
  const initialFormData = {
    title: serviceProcedure ? serviceProcedure.title : newServiceProcedure.title,
    job: serviceProcedure ? serviceProcedure.job : newServiceProcedure.job,
    lawyer_id: serviceProcedure ? serviceProcedure.lawyer_id : newServiceProcedure.lawyer_id,
    date_start: null,
    date_end: null,
    cost: serviceProcedure ? serviceProcedure.cost : newServiceProcedure.cost,
    cost2: serviceProcedure ? serviceProcedure.cost2 : newServiceProcedure.cost2,
    result: serviceProcedure ? serviceProcedure.result : newServiceProcedure.result,

    status: serviceProcedure ? serviceProcedure.status : newServiceProcedure.status,
    created_by: user.id,
    service_id: serviceId,
  };

  const [formData, setFormData] = useState(initialFormData);
  const isEditing = !!procedure;

  // When editing, set the initial values from 'procedure'
  if (isEditing && serviceProcedure) {
    initialFormData.date_start = procedure.date_start;
    initialFormData.date_end = procedure.date_end;
  }

  const handleDateChange = (field, date) => {
    // Check if date is not null
    if (date) {
      // Format the date as 'yyyy-MM-dd' and update formData
      const formattedDate = date.toISOString().split("T")[0];
      setFormData({
        ...formData,
        [field]: formattedDate,
      });
    } else {
      // If date is null, set the field as null in formData
      setFormData({
        ...formData,
        [field]: null,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {serviceProcedure ? "Edit serviceProcedure" : "Add New serviceProcedure"}
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
          <Form.Group controlId="result">
            <Form.Label>place:</Form.Label>
            <Form.Control
              type="text"
              value={formData.place}
              onChange={(e) =>
                setFormData({ ...formData, place: e.target.value })
              }
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
  serviceId: PropTypes.number, // Expect serviceId as a number
  newServiceProcedure: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ProcedureModal;
