import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table, Button, Modal } from "react-bootstrap";
import { BiPlusCircle, BiPencil, BiTrash } from "react-icons/bi";
import PropTypes from "prop-types";
import ProcedureModal from "./ProcdureModal";
import API_CONFIG from "../../../config";

const ServiceProcedureList = ({ serviceId }) => {
  const [serviceProcedures, setServiceProcedures] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProcedure, setEditingProcedure] = useState(null);
  const [newProcedure, setNewProcedure] = useState({
    title: "",
    job: "",
    date_start: "",
    date_end: "",
    cost: "",
    cost2: "",
    result: "",
    procedure_type_id: "",
    lawyer_id: "",
    court_id: "",
    leg_case_id: serviceId,
    created_by: "",
  });

  useEffect(() => {
    fetchServiceProcedures();
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

  const fetchServiceProcedures = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/service-procedures/${serviceId}`
      );
      setServiceProcedures(response.data);
    } catch (error) {
      console.log("Error fetching procedures:", error);
    }
  };

  const handleEditServiceProcedure = (procedure) => {
    setEditingProcedure(procedure);
    setShowModal(true);
  };

  const handleDeleteServiceProcedure = async (procedureId) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/procedures/${procedureId}`);
      fetchServiceProcedures();
    } catch (error) {
      console.log("Error deleting procedure:", error);
    }
  };

  const openAddProcedureModal = () => {
    setEditingProcedure(null);
    setNewProcedure({
      title: "",
      job: "",
      date_start: "",
      date_end: "",
      cost: "",
      cost2: "",
      result: "",
      procedure_type_id: "",
      lawyer_id: "",
      court_id: "",
      leg_case_id: serviceId,
      created_by: "",
    });
    setShowModal(true);
  };

  const handleSaveProcedure = (updatedProcedure) => {
    if (editingProcedure) {
      // Handle editing an existing procedure
      const updatedProcedures = serviceProcedures.map((p) =>
        p.id === editingProcedure.id ? updatedProcedure : p
      );
      setServiceProcedures(updatedProcedures);
    } else {
      // Handle adding a new procedure
      const updatedProcedures = [...serviceProcedures, updatedProcedure];
      setServiceProcedures(updatedProcedures);
    }
    setShowModal(false);
  };

  return (
    <>
      <Card.Header>
        <Button
          variant="success"
          className="btn-sm"
          onClick={openAddProcedureModal}
        >
          <BiPlusCircle className="mr-1" />
          Add Procedure
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
                  <Button
                    variant="info"
                    onClick={() => handleEditServiceProcedure(procedure)}
                  >
                    <BiPencil />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() =>
                      handleDeleteServiceProcedure(procedure.id)
                    }
                  >
                    <BiTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>

      <ProcedureModal
        show={showModal}
        onHide={() => setShowModal(false)}
        procedure={editingProcedure}
        newProcedure={newProcedure}
        lawyers={lawyers}
        onSave={handleSaveProcedure}
      />
    </>
  );
};

ServiceProcedureList.propTypes = {
  serviceId: PropTypes.number.isRequired,
};

export default ServiceProcedureList;
