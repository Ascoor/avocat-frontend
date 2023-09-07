import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table, Button } from "react-bootstrap";
import { BiPlusCircle, BiPencil, BiTrash } from "react-icons/bi";
import PropTypes from "prop-types";
import ServiceProcedureModal from "./ServiceProcdureModal"; // Assuming you have a separate modal component
import API_CONFIG from "../../../config";
import useAuth from "../../Auth/AuthUser";

const ServiceProcedureList = ({ serviceId }) => {
  const { getUser } = useAuth();
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [serviceProcedures, setServiceProcedures] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingServiceProcedure, setEditingServiceProcedure] = useState(null);

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
  const handleEditServiceProcedure = (serviceProcedure) => {
  setSelectedProcedure(serviceProcedure); // Set the selected procedure
  setShowModal(true);
};


  const handleDeleteServiceProcedure = async (serviceProcedureId) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/service-procedures/${serviceProcedureId}`);
      fetchServiceProcedures();
    } catch (error) {
      console.log("Error deleting procedure:", error);
    }
  };

  const openAddProcedureModal = () => {
    setEditingServiceProcedure(null);
    setShowModal(true);
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
          {serviceProcedures.map((procedure, index) => (
  <tr key={procedure.id}>
  
                <td>{procedure.title}</td>
                <td>
                  {procedure.date_start
                    ? new Date(procedure.date_start).toLocaleDateString()
                    : ""}
                </td>
                <td>{procedure.lawyer?.name }</td>
                <td>{procedure.place || ""}</td>
                <td>{procedure.result || ""}</td>
                <td>{procedure.status || ""}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleEditServiceProcedure(selectedProcedure)}
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

      <ServiceProcedureModal
  show={showModal}
  onHide={() => setShowModal(false)}
  serviceProcedure={editingServiceProcedure}
  lawyers={lawyers}
  fetchServiceProcedures={fetchServiceProcedures}
  onSelectProcedure={setSelectedProcedure}
  selectedProcedure={selectedProcedure} // Pass the selected procedure
/>

    </>
  );
};

ServiceProcedureList.propTypes = {
  serviceId: PropTypes.number.isRequired,
};

export default ServiceProcedureList;
