  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import { Card, Table, Button, Modal } from "react-bootstrap";
  import { BiPlusCircle, BiPencil, BiTrash } from "react-icons/bi";
  import PropTypes from "prop-types";
  import ServiceProcedureModal from "./ServiceProcdureModal";
  import API_CONFIG from "../../../config";

  const ServiceProcedureList = ({ serviceId }) => {
    const [serviceProcedures, setServiceProcedures] = useState([]);
    const [lawyers, setLawyers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingServiceProcedure, setEditingServiceProcedure] = useState(null);
    

    useEffect(() => {
      fetchServiceProcedures();
      fetchLawyers();
    }, []);

    const fetchLawyers = async () => {
      try {
        const response = await axios.get(API_CONFIG.baseURL + "/api/lawyers");
        setLawyers(response.data);
      } catch (error) {
        console.error("Error fetching lawyers:", error);
      }
    };

    const fetchServiceProcedures = async () => {
      try {
        const response = await axios.get(
          API_CONFIG.baseURL + `/api/service-procedures/${serviceId}`
        );
        setServiceProcedures(response.data);
      } catch (error) {
        console.error("Error fetching procedures:", error);
      }
    };
    const handleEditServiceProcedure = (procedure) => {
      setIsEditing(true);
      setEditingServiceProcedure(procedure);
      setShowModal(true);
    };
    
    const handleDeleteServiceProcedure = async (procedureId) => {
      try {
        await axios.delete(
          API_CONFIG.baseURL + `/api/service-procedure/delete/${procedureId}`
        );
        fetchServiceProcedures();
      } catch (error) {
        console.error("Error deleting procedure:", error);
      }
    };
    const openAddProcedureModal = () => {
      setIsEditing(false);
      setEditingServiceProcedure(null);
      setShowModal(true);
    };
    const addServiceProcedure = async (data) => {
      try {
        const response = await axios.post(
          API_CONFIG.baseURL + "/api/service-procedures",
          data
        );
        fetchServiceProcedures(); // Reload the list of service procedures
        setShowModal(false); // Close the modal
      } catch (error) {
        console.error("Error adding procedure:", error);
      }
    };
    
    const editServiceProcedure = async (procedureId, data) => {
      try {
        const response = await axios.put(
          API_CONFIG.baseURL + `/api/service-procedure/${procedureId}`,
          data
        );
        fetchServiceProcedures(); // Reload the list of service procedures
        setShowModal(false); // Close the modal
      } catch (error) {
        console.error("Error editing procedure:", error);
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
                      ? new Date(procedure.date_start).toLocaleDateString("ar-EG")
                      : ""}
                  </td>
                  <td>{procedure.lawyer?.name}</td>
                  <td>{procedure.place || ""}</td>
                  <td>{procedure.result || ""}</td>
                  <td>{procedure.status || ""}</td>
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

        <ServiceProcedureModal
  show={showModal}
  onHide={() => setShowModal(false)}
  serviceId={serviceId}
  procedure={editingServiceProcedure}
  lawyers={lawyers}
  fetchServiceProcedures={fetchServiceProcedures}
  isEditing={isEditing} // تمرير حالة التحرير هنا
  addServiceProcedure={addServiceProcedure} // Pass the add function
  editServiceProcedure={editServiceProcedure} // Pass the edit function

/>

      </>
    );
  };

  ServiceProcedureList.propTypes = {
    serviceId: PropTypes.number.isRequired,
  };

  export default ServiceProcedureList;
