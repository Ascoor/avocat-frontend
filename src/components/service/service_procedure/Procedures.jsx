import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table, Button, Modal, Row, Form } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { BiPlusCircle, BiPencil, BiTrash } from "react-icons/bi";
import PropTypes from "prop-types";
import API_CONFIG from "../../../config";

const Procedures = ({ serviceId }) => {
  const [alert, setAlert] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const [serviceProcedures, setServiceProcedures] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedResult, setSelectedResult] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showAddProcedureModal, setShowAddProcedureModal] = useState(false);

  useEffect(() => {
    const fetchServiceProcedures = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.baseURL}/api/service-procedures/${serviceId}`
        );
        setServiceProcedures(response.data);
      } catch (error) {
        console.log("Error fetching service procedures:", error);
      }
    };

    fetchServiceProcedures();
  }, [serviceId]);

  const handleEditProcedure = (procedure) => {
    setSelectedTitle(procedure.title);
    setSelectedJob(procedure.job);
    setSelectedResult(procedure.result);
    setSelectedStatus(procedure.status);
    setShowAddProcedureModal(true);
  };

  const handleDeleteProcedure = async (procedureId) => {
    try {
      await axios.delete(
        `${API_CONFIG.baseURL}/api/service-procedures/${procedureId}`
      );
      fetchServiceProcedures();
      setAlert("Service procedure deleted successfully.");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch (error) {
      console.log("Error deleting service procedure:", error);
    }
  };

  const handleAddProcedure = async () => {
    try {
      const newProcedure = {
        title: selectedTitle,
        job: selectedJob,
        result: selectedResult,
        status: selectedStatus,
        service_id: serviceId,
      };

      // Make an API request to add the service procedure
      // You can use axios.post here

      setAlert("Service procedure added successfully.");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      // Fetch updated service procedures
      fetchServiceProcedures();

      // Clear form fields
      setSelectedTitle("");
      setSelectedJob("");
      setSelectedResult("");
      setSelectedStatus("");
      setShowAddProcedureModal(false);
    } catch (error) {
      console.log("Error adding service procedure:", error);
    }
  };

  return (
    <>
      <Row>
        {showAlert && alert && <Alert variant="success">{alert}</Alert>}
      </Row>

      <Card.Header>
        <Button
          variant="success"
          className="btn-sm"
          onClick={() => setShowAddProcedureModal(true)}
        >
          <BiPlusCircle className="mr-1" />
          Add Service Procedure
        </Button>
      </Card.Header>

      <Card.Body>
        <Table striped bordered hover responsive>
          <thead className="table-success text-center">
            <tr>
              <th>Title</th>
              <th>Job</th>
              <th>Result</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {serviceProcedures.map((procedure) => (
              <tr key={procedure.id}>
                <td>{procedure.title}</td>
                <td>{procedure.job}</td>
                <td>{procedure.result}</td>
                <td>{procedure.status}</td>
                <td>
                  <span>
                    <Button
                      variant="info"
                      onClick={() => handleEditProcedure(procedure)}
                    >
                      <BiPencil />
                    </Button>
                  </span>
                  <span>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteProcedure(procedure.id)}
                    >
                      <BiTrash />
                    </Button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>

      <Modal
        show={showAddProcedureModal}
        onHide={() => setShowAddProcedureModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Service Procedure</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="procedureTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={selectedTitle}
                onChange={(e) => setSelectedTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="procedureJob">
              <Form.Label>Job</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter job"
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="procedureResult">
              <Form.Label>Result</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter result"
                value={selectedResult}
                onChange={(e) => setSelectedResult(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="procedureStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddProcedureModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddProcedure}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

Procedures.propTypes = {
  serviceId: PropTypes.number.isRequired,
};

export default Procedures;
