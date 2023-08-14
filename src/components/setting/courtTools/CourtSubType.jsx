import { useState, useEffect } from "react";

import { FcFullTrash } from "react-icons/fc";
import Pagination from "../../home_tools/Pagination";
import { Row, Col, Button, Modal, Form, Card } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import API_CONFIG from "../../../config";
const CourtSubType = () => {
  const [selectedCourtTypeId, setSelectedCourtTypeId] = useState("");
  const [newCourtSubTypeName, setNewCourtSubTypeName] = useState("");
  const [courtTypes, setCourtTypes] = useState([]);
  const [courtSubTypes, setCourtSubTypes] = useState([]);
  const [error, setError] = useState(null);
  const [showAddCourtSubTypeModal, setShowAddCourtSubTypeModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set the number of courtSubTypes to display per page
  const [courtSubTypesPage, setCourtSubTypesPage] = useState(1);
  useEffect(() => {
    fetchCourtSubTypes();
    fetchCourtTypes();
  }, []);

  const fetchCourtTypes = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/court_types/`);
      setCourtTypes(response.data);
    } catch (error) {
      setError("حدث خطأ في استرجاع أنواع المحاكم");
      console.error("حدث خطأ في استرجاع أنواع المحاكم: ", error);
    }
  };

  const fetchCourtSubTypes = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/court_sub_types/`);
      setCourtSubTypes(response.data);
    } catch (error) {
      setError("حدث خطأ في استرجاع أنواع المحاكم الفرعية");
      console.error("حدث خطأ في استرجاع أنواع المحاكم الفرعية: ", error);
    }
  };

  const items = courtSubTypes; // This array is used for pagination, assuming all data will be shown on one page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddCourtSubType = () => {
    fetch(`${API_CONFIG.baseURL}/api/court_sub_types/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        court_type_id: newCourtTypeId,
        name: newCourtSubTypeName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchCourtSubTypes();
        setShowAddCourtSubTypeModal(false);
        setNewCourtSubTypeName("");
        setNewCourtTypeId("");
        setShowAlert(true);
        setAlertMessage(`تمت إضافة نوع المحكمة الفرعية بنجاح. البيانات: ${JSON.stringify(data)}`);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      })

      .catch((error) => {
        setError("حدث خطأ في إضافة نوع المحكمة الفرعية");
        console.error("حدث خطأ في إضافة نوع المحكمة الفرعية: ", error);
        setShowAlert(true);
        setAlertMessage("فشل في إضافة نوع المحكمة الفرعية.");
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      });
  };

  const handleCourtTypeChange = (e) => {
    setSelectedCourtTypeId(e.target.value);
  };

  useEffect(() => {
    if (selectedCourtTypeId !== "") {
      fetchCourtTypeSubTypes();
    } else {
      setCourtSubTypes([]);
    }
  }, [selectedCourtTypeId]);

  const fetchCourtTypeSubTypes = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/court-types/${selectedCourtTypeId}`
      );
      setCourtSubTypes(response.data);
    } catch (error) {
      setError("حدث خطأ في استرجاع أنواع المحاكم الفرعية");
      console.error("حدث خطأ في استرجاع أنواع المحاكم الفرعية: ", error);
    }
  };

  return (
    <>
      <Card>
        <Row>
          <Col>
            <Card.Header style={{ backgroundColor: "beige" }} className="text-center">
              <h3 style={{ color: "#006e5d" }}>أنواع المحاكم الفرعية</h3>
            </Card.Header>
            <Button variant="primary" onClick={() => setShowAddCourtSubTypeModal(true)}>
              إضافة تصنيف فرعي
            </Button>

            <Card.Body>
           
            <Table striped bordered hover responsive>
                    <thead className="table-success text-center">
                        <tr style={{ backgroundColor: "#D1ECF1", color: "#0C5460" }}>
                    <th>الاسم</th>
                    <th>اسم نوع المحكمة</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {courtSubTypes
                    .slice((courtSubTypesPage - 1) * itemsPerPage, courtSubTypesPage * itemsPerPage)
                    .map((courtSubType) => (
                      <tr
                        style={{ backgroundColor: "#D1ECF1", color: "#0C5460" }}
                        key={courtSubType.id}
                      >
                        <td>{courtSubType.name}</td>
                        <td>{courtSubType.court_type.name}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() =>
                              handleDelete(courtSubType.id, courtSubType.name, "court_sub_types")
                            }
                          >
                            <FcFullTrash />
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
            <Card.Footer>

              <Pagination items={items} currentPage={currentPage} onPageChange={handlePageChange} itemsPerPage={itemsPerPage} />

            </Card.Footer>
          </Col>
        </Row>
      </Card>
      <Modal show={showAddCourtSubTypeModal} onHide={() => setShowAddCourtSubTypeModal(false)}>

        <Modal.Header closeButton>
          <Modal.Title>تصنيف المحاكم الفرعي</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {courtTypes.length > 0 && (
              <Form.Group controlId="courtTypeId">
                <Form.Label>نوع المحكمة:</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedCourtTypeId}
                  onChange={handleCourtTypeChange}
                >
                  <option value="">اختر نوع المحكمة</option>
                  {courtTypes.map((courtType) => (
                    <option key={courtType.id} value={courtType.id}>
                      {courtType.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}
            <Form.Group controlId="courtSubTypeId">
              <Form.Label>نوع المحكمة الفرعي:</Form.Label>
              <Form.Control
                type="text"
                value={newCourtSubTypeName}
                onChange={(e) => setNewCourtSubTypeName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddCourtSubTypeModal(false)}>
            إغلاق
          </Button>
          <Button variant="primary" onClick={handleAddCourtSubType}>
            إضافة نوع المحكمة الفرعي
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default CourtSubType;