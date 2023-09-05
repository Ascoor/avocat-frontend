import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table, Button, Alert } from "react-bootstrap";
import { BiPlusCircle, BiPencil, BiTrash } from "react-icons/bi";
import PropTypes from "prop-types";
import API_CONFIG from "../../../config";
import ProcedureModal from "./ProcdureModal"; // Import the ProcedureEditModal component
import useAuth from "../../Auth/AuthUser";
const Procedures = ({ serviceId }) => {
  const [alert, setAlert] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [serviceProcedures, setServiceProcedures] = useState([]);
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [showEditProcedureModal, setShowEditProcedureModal] = useState(false);
  const [modalMode, setModalMode] = useState(""); // Define modalMode here
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

  const handleDeleteProcedure = async (procedureId) => {
    try {
      await axios.delete(
        `${API_CONFIG.baseURL}/api/service-procedures/${procedureId}`
      );
      // Remove the deleted procedure from the list
      setServiceProcedures((prevProcedures) =>
        prevProcedures.filter((procedure) => procedure.id !== procedureId)
      );
      setAlert("Service procedure deleted successfully.");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch (error) {
      console.log("Error deleting service procedure:", error);
    }
  };

  const handleEditOrAddProcedure = async (procedureData) => {
    try {
      if (selectedProcedure) {
        // Editing an existing procedure
        const response = await axios.put(
          `${API_CONFIG.baseURL}/api/service-procedures/${selectedProcedure.id}`,
          procedureData
        );
        console.log("Service procedure updated:", response.data);
      } else {
        // Adding a new procedure
        const response = await axios.post(
          `${API_CONFIG.baseURL}/api/service-procedures`,
          procedureData
        );
        console.log("Service procedure added:", response.data);
      }

      setShowEditProcedureModal(false);
      fetchServiceProcedures();
      setSelectedProcedure(null);
      setModalMode(""); // Clear modalMode when closing the modal
    } catch (error) {
      console.error(
        `Error ${selectedProcedure ? "editing" : "adding"} service procedure:`,
        error
      );
    }
  };

  const handleEditProcedure = (procedure) => {
    setSelectedProcedure(procedure);
    setShowEditProcedureModal(true);
    setModalMode("edit"); // Set modalMode to "edit" when editing a procedure
  };

  const handleCloseEditProcedureModal = () => {
    setSelectedProcedure(null);
    setShowEditProcedureModal(false);
    setModalMode(""); // Clear modalMode when closing the modal
  };

  return (
    <>
      {showAlert && alert && <Alert variant="success">{alert}</Alert>}

      <Card.Header>
        <Button
          variant="success"
          className="btn-sm"
          onClick={() => {
            setSelectedProcedure(null);
            setShowEditProcedureModal(true);
            setModalMode("add"); // Set modalMode to "add" when adding a procedure
          }}
        >
          <BiPlusCircle className="mr-1" />
          {modalMode === "edit" ? "Edit" : "Add"} Service Procedure
        </Button>
      </Card.Header>

      <Card.Body>
        <Table striped bordered hover responsive>
          <thead className="table-success text-center">
            <tr>
              <th>Title</th>
              <th>Job</th>
              <th>Date Start</th>
              <th>Date End</th>
              <th>Result</th>
              <th>Lawyer</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {serviceProcedures.map((procedure) => (
              <tr key={procedure.id}>
                <td>{procedure.title}</td>
                <td>{procedure.job}</td>
                <td>{procedure.date_start}</td>
                <td>{procedure.date_end}</td>
                <td>{procedure.result}</td>
                <td>{procedure.lawyer?.name}</td>
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
      <ProcedureModal
        show={showEditProcedureModal}
        onHide={handleCloseEditProcedureModal}
        procedure={selectedProcedure}
        onSubmit={handleEditOrAddProcedure}
        mode={modalMode} // Pass modalMode to ProcedureModal
      />
    </>
  );
};

Procedures.propTypes = {
  serviceId: PropTypes.number.isRequired,
};

export default Procedures;