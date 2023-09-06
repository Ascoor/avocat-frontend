import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table, Button } from "react-bootstrap";
import { BiPlusCircle, BiPencil, BiTrash } from "react-icons/bi";
import PropTypes from "prop-types";
import ProcedureModal from "./ProcdureModal";
import API_CONFIG from "../../../config";
import useAuth from "../../Auth/AuthUser";

const ServiceProcedureList = ({ serviceId }) => {
  const { getUser } = useAuth();
  const [serviceProcedures, setServiceProcedures] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProcedure, setEditingProcedure] = useState(null);
  const [newServiceProcedure, setNewProcedure] = useState({
    title: "",
    job: "",
    date_start: "",
    date_end: "",
    cost: 0,
    cost2: 0,
    result: "",
    lawyer_id: "",
  });
  const user = getUser();

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
    setEditingProcedure(servicProcedure);
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
        await axios.put(
          `${API_CONFIG.baseURL}/api/service-procedure/${editingProcedure.id}`,
          updatedProcedure
        );
      } else {
        await axios.post(
          `${API_CONFIG.baseURL}/api/service-procedures`,
          updatedProcedure
        );
      }
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
          إضافة إجراء
        </Button>
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead className="table-success text-center">
            <tr>
              <th className="col-1">نوع الإجراء</th>
              <th className="col-2">تاريخ الإجراء</th>
              <th className="col-2">المحامي</th>
              <th className="col-2">الجهة</th>
              <th className="col-2">النتيجة</th>
              <th className="col-2">الحالة</th>
              <th className="col-2">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {serviceProcedures.map((procedure) => (
              <tr key={procedure.id}>
                <td>{procedure.title}</td>
                <td>
                  {procedure.date_start
                    ? new Date(procedure.date_start).toLocaleDateString()
                    : ""}
                </td>
                <td>{procedure.lawyer?.name || "N/A"}</td>
                <td>{procedure.place || "N/A"}</td>
                <td>{procedure.re || "N/A"}</td>
                <td>{procedure.status || "N/A"}</td>
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
        servicProcedure={editingProcedure} // Pass the editingProcedure to the modal
        newServiceProcedure={newServiceProcedure}
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
