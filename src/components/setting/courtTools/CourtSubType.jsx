import { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Form, Card, Alert } from 'react-bootstrap';
import { FcFullTrash } from 'react-icons/fc';
import axios from 'axios';
import API_CONFIG from '../../../config';
import CustomPagination from '../../home_tools/Pagination';

const CourtSubType = ({ show, handleClose }) => {
  const [newCourtSubType, setNewCourtSubType] = useState({
    name: '',
    court_type_id: ''
  });
  const [newCourtTypeId, setNewCourtTypeId] = useState('');
  const [selectedCourtTypeId, setSelectedCourtTypeId] = useState('');
  const [newCourtSubTypeName, setNewCourtSubTypeName] = useState('');
  const [courtSubTypes, setCourtSubTypes] = useState([]);
  const [modalMessage, setModalMessage] = useState(null);
  const [courtSubTypesAlert, setCourtSubTypesAlert] = useState(null);
  const [courtTypes, setCourtTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const itemsPerPage = 10;
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    variant: 'success'
  });
  const fetchCourtData = async (apiPath, setData) => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}${apiPath}`);
      setData(response.data);
    } catch (e) {
      setAlert({
        show: true,
        message: `Error fetching ${apiPath}`,
        variant: 'danger'
      });
    }
  };

  useEffect(() => {
    if (show) {
      fetchCourtData('/api/court_types', setCourtTypes);
    }
    fetchCourtData('/api/court_sub_types', setCourtSubTypes);
  }, [show]);

  useEffect(() => {
    if (alert.show || modalMessage) {
      const timer = setTimeout(() => {
        setAlert({ show: false, message: '', variant: 'success' });
        setModalMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert, modalMessage]);

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  const currentItems = courtSubTypes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearModalFields = () =>
    setNewCourtSubType({ name: '', court_type_id: '' });

  const handleAddCourtSubType = () => {
    axios
      .post(`${API_CONFIG.baseURL}/api/court_sub_types`, newCourtSubType)
      .then((response) => {
        setCourtSubTypes([...courtSubTypes, response.data]);
        setAlertMessage({
          type: 'success',
          text: 'تمت إضافة مستوى المحكمة بنجاح.'
        });

        handleClose(); // Close modal
        clearModalFields();
        fetchCourtSubTypes();
      })
      .catch((error) => {
        setModalMessage({
          show: true,
          message: 'Error adding court sub-type',
          variant: 'danger'
        });
      });
  };

  const handleCourtTypeChange = (e) => {
    const selectedTypeId = e.target.value;
    setSelectedCourtTypeId(selectedTypeId); // Fixed this to use the selectedTypeId
    setNewCourtSubType({ ...newCourtSubType, court_type_id: selectedTypeId }); // And this too
  };

  const handleSubmit = () => {
    if (!newCourtSubType.name.trim() || !newCourtSubType.court_type_id) {
      setModalMessage({
        type: 'danger',
        text: 'برجاء إدخال مستوى المحكمة المراد إضافته.'
      });
      return;
    }
    handleAddCourtSubType();
  };

  const handleDeleteCourtSubType = async (id) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/court_sub_types/${id}`);
      setCourtSubTypes(
        courtSubTypes.filter((courtSubType) => courtSubType.id !== id)
      );
    } catch (error) {
      setAlert({
        show: true,
        message: 'Error deleting court sub-type',
        variant: 'danger'
      });
    }
  };
  return (
    <>
      <Card>
        <Row>
          <Col>
            <Card.Header className="card-header-courts text-center">
              <h3>أنواع المحاكم الفرعية</h3>
            </Card.Header>
            <Card.Body>
              {alertMessage && (
                <Alert variant={alertMessage.type}>{alertMessage.text}</Alert>
              )}
              {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
              )}
              {courtSubTypesAlert && (
                <Alert variant="danger"> {alertMessage}</Alert>
              )}

              <div className="table-responsive">
                <table className="special-table">
                  <thead>
                    <tr>
                      <th>الاسم</th>
                      <th>نوع المحكمة</th>
                      <th>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((courtSubType) => (
                      <tr className="table-row-courts" key={courtSubType.id}>
                        <td>{courtSubType.name}</td>
                        <td>{courtSubType.court_type?.name}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() =>
                              handleDeleteCourtSubType(courtSubType.id)
                            }
                          >
                            <FcFullTrash />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Card.Footer>
                <CustomPagination
                  totalCount={courtSubTypes.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </Card.Footer>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>إضافة نوع محكمة فرعية</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="courtTypeId">
              <Form.Label>نوع المحكمة:</Form.Label>
              <Form.Control
                as="select"
                value={selectedCourtTypeId}
                name="court_type_id"
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
            <Form.Group controlId="newCourtSubTypeName">
              <Form.Label>الاسم:</Form.Label>
              <Form.Control
                type="text"
                value={newCourtSubType.name}
                onChange={(e) =>
                  setNewCourtSubType({
                    ...newCourtSubType,
                    name: e.target.value
                  })
                }
              />
            </Form.Group>
          </Form>
          {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            إغلاق
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            إضافة
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CourtSubType;
