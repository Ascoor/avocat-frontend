import  { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table, Button, Modal } from "react-bootstrap";
import { BiPlusCircle, BiPencil, BiTrash } from "react-icons/bi";
import PropTypes from "prop-types";
import ProcedureModal from "./ProcdureModal";
import API_CONFIG from "../../../config";
import useAuth from '../../Auth/AuthUser'; // Import the hook here

const ServiceProcedureList = ({ serviceId }) => {
  const { getUser } = useAuth();
  const [serviceProcedures, setServiceProcedures] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProcedure, setEditingProcedure] = useState(null);
  const user = getUser();
  const [newProcedure, setNewProcedure] = useState({
    title: "",
    job: "",
    date_start: "",
    date_end: "",
    cost: 0,
    cost2: 0,
    result: "",
    lawyer_id: "",
  
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
      lawyer_id: "",

    });
    setShowModal(true);
  };

  const handleSaveProcedure = async (updatedProcedure) => {
    try {
      if (editingProcedure) {
        // Handle updating an existing procedure
        await axios.put(`${API_CONFIG.baseURL}/api/service-procedure/${editingProcedure.id}`, updatedProcedure);
      } else {
        // Handle creating a new procedure
        await axios.post(`${API_CONFIG.baseURL}/api/service-procedures`, updatedProcedure);
      }
  
      // After a successful request, fetch the updated list of procedures
      fetchServiceProcedures();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving/updating procedure:", error);
    }
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
    <td>{procedure.date_start ? new Date(procedure.date_start).toLocaleDateString() : ''}</td>
    <td>{procedure.date_end ? new Date(procedure.date_end).toLocaleDateString() : ''}</td>
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
        onClick={() => handleDeleteServiceProcedure(procedure.id)}
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
        serviceId={parseInt(serviceId)} // Convert serviceId to a number

      />
    </>
  );
};

ServiceProcedureList.propTypes = {
  serviceId: PropTypes.number.isRequired,
};

export default ServiceProcedureList;
