import { useState, useEffect } from "react";
import { FcFullTrash } from "react-icons/fc";
import { Row, Col, Button, Modal, Form, Card } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import API_CONFIG from "../../../config";
import CustomPagination from "../../home_tools/Pagination"; // Import your custom Pagination component here

const Court = () => {
  const [courtTypes, setCourtTypes] = useState([]);
  const [courtSubTypes, setCourtSubTypes] = useState([]);
  const [courtLevels, setCourtLevels] = useState([]);
  const [courts, setCourts] = useState([]);

  const [courtTypeId, setCourtTypeId] = useState("");
  const [newCourtTypeId, setNewCourtTypeId] = useState("");
  const [newCourtSubTypeId, setNewCourtSubTypeId] = useState("");
  const [newCourtLevelId, setNewCourtLevelId] = useState("");
  const [newCourtName, setNewCourtName] = useState("");
  const [newCourtAddress, setNewCourtAddress] = useState("");
  const [error, setError] = useState(null);
  const [showAddCourtModal, setShowAddCourtModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // You can change this value as needed

  useEffect(() => {
    fetchCourts();
    fetchCourtTypes();

    fetchCourtLevels();
  }, []);

  const fetchCourtTypes = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/court_types/`
      );
      setCourtTypes(response.data);
    } catch (error) {
      setError("حدث خطأ في استرجاع أنواع المحاكم");
      console.error("حدث خطأ في استرجاع أنواع المحاكم: ", error);
    }
  };

  const fetchCourtLevels = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/court_levels/`
      );
      setCourtLevels(response.data);
    } catch (error) {
      setError("حدث خطأ في استرجاع مستويات المحاكم");
      console.error("حدث خطأ في استرجاع مستويات المحاكم: ", error);
    }
  };

  const fetchCourts = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/courts/`);
      setCourts(response.data);
    } catch (error) {
      setError("حدث خطأ في استرجاع المحاكم");
      console.error("حدث خطأ في استرجاع المحاكم: ", error);
    }
  };

  const fetchCourtSubTypes = async (courtTypeId) => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/court-types/${courtTypeId}`
      );
      setCourtSubTypes(response.data);
    } catch (error) {
      setError("حدث خطأ في استرجاع أنواع المحاكم الفرعية");
      console.error("حدث خطأ في استرجاع أنواع المحاكم الفرعية: ", error);
    }
  };

  const totalCourts = courts.length;
  const handleShowAddCourtModal = () => {
    // Reset the state for selected court type, subtype, and level
    setCourtTypeId("");
    setNewCourtTypeId("");
    setNewCourtSubTypeId("");
    setNewCourtLevelId("");

    // Fetch court types, subtypes, and levels
    fetchCourtTypes();
    fetchCourtLevels();
    // Don't fetch court subtypes here

    // Open the modal
    setShowAddCourtModal(true);
  };

  useEffect(() => {
    // Fetch court subtypes when courtTypeId changes
    if (courtTypeId) {
      fetchCourtSubTypes(courtTypeId);
    } else {
      // If no court type is selected, reset court subtypes
      setCourtSubTypes([]);
    }
  }, [courtTypeId]);

  const handleAddCourt = () => {
    fetch(`${API_CONFIG.baseURL}/api/courts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courtTypeId: newCourtTypeId,
        courtSubTypeId: newCourtSubTypeId,
        courtLevelId: newCourtLevelId,
        name: newCourtName,
        address: newCourtAddress,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchCourts();
        setShowAddCourtModal(false);
        setNewCourtName("");
        setNewCourtTypeId("");
        setNewCourtSubTypeId("");
        setNewCourtLevelId("");
        setNewCourtAddress("");
        setShowAlert(true);
        setAlertMessage(
          `تمت إضافة المحكمة بنجاح. البيانات: ${JSON.stringify(data)}`
        );
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      })

      .catch((error) => {
        setError("حدث خطأ في إضافة المحكمة");
        console.error("حدث خطأ في إضافة المحكمة: ", error);
        setShowAlert(true);
        setAlertMessage("فشل في إضافة المحكمة.");
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      });
  };
  const handleDelete = (id, name, endpoint) => {
    // Your code to handle deleting a court
    // ...
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const items = courts; // This array is used for pagination, assuming all data will be shown on one page

  return (
    <>
      <Card>
        <Row>
          <Col>
            <Card.Header className="court-setting-card-header">
              <h3 style={{ color: "#006e5d" }}>المحاكم</h3>
            </Card.Header>
            <Button
              onClick={() => setShowAddCourtModal(true)}
              variant="primary"
            >
              إضافة محكمة
            </Button>

            <Card.Body className="court-index">
              <Row>
                <Col>
                  <Table striped bordered hover responsive>
                    <thead className="table-success text-center">
                      <tr
                        style={{ backgroundColor: "#D1ECF1", color: "#0C5460" }}
                      >
                        <th>الاسم</th>
                        <th>النوع</th>
                        <th>النوع الفرعي</th>
                        <th>المستوى</th>
                        <th>العنوان</th>
                        <th>الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courts
                        .slice(
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage
                        )
                        .map((court) => (
                          <tr
                            style={{
                              backgroundColor: "#D1ECF1",
                              color: "#0C5460",
                            }}
                            key={court.id}
                          >
                            <td>{court.name}</td>
                            <td>{court.court_type.name}</td>
                            <td>{court.court_sub_type.name}</td>
                            <td>{court.court_level.name}</td>
                            <td>{court.address}</td>
                            <td>
                              <Button
                                variant="danger"
                                onClick={() =>
                                  handleDelete(court.id, court.name, "courts")
                                }
                              >
                                <FcFullTrash />
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <Row>
                <Col><CustomPagination
                totalCount={totalCourts}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                />
                </Col>
              </Row>
            </Card.Footer>
          </Col>
        </Row>
      </Card>
      <Modal
        show={showAddCourtModal}
        onHide={() => setShowAddCourtModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>إضافة محكمة</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="courtTypeId">
              <Form.Label>نوع المحكمة:</Form.Label>
              <Form.Control
                as="select"
                value={newCourtTypeId}
                onChange={(e) => {
                  const selectedTypeId = e.target.value;
                  setCourtTypeId(selectedTypeId);
                  setNewCourtTypeId(selectedTypeId);
                }}
              >
                <option value="">اختر نوع المحكمة</option>
                {courtTypes.map((courtType) => (
                  <option key={courtType.id} value={courtType.id}>
                    {courtType.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="courtSubTypeId">
              <Form.Label>نوع المحكمة الفرعي:</Form.Label>
              <Form.Control
                as="select"
                value={newCourtSubTypeId}
                onChange={(e) => setNewCourtSubTypeId(e.target.value)}
              >
                <option value="">اختر نوع المحكمة الفرعي</option>

                {courtSubTypes.length > 0 &&
                  courtSubTypes.map((courtSubType) => (
                    <option key={courtSubType.id} value={courtSubType.id}>
                      {courtSubType.name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="courtLevelId">
              <Form.Label>مستوى المحكمة:</Form.Label>
              <Form.Control
                as="select"
                value={newCourtLevelId}
                onChange={(e) => setNewCourtLevelId(e.target.value)}
              >
                <option value="">اختر مستوى المحكمة</option>
                {courtLevels.map((courtLevel) => (
                  <option key={courtLevel.id} value={courtLevel.id}>
                    {courtLevel.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="courtName">
              <Form.Label>اسم المحكمة:</Form.Label>
              <Form.Control
                type="text"
                value={newCourtName}
                onChange={(e) => setNewCourtName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="courtAddress">
              <Form.Label>عنوان المحكمة:</Form.Label>
              <Form.Control
                type="text"
                value={newCourtAddress}
                onChange={(e) => setNewCourtAddress(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddCourtModal(false)}
          >
            إغلاق
          </Button>
          <Button variant="primary" onClick={handleAddCourt}>
            إضافة محكمة
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Court;
