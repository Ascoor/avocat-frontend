import { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Form, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import API_CONFIG from '../../../config';
import CustomPagination from '../../home_tools/Pagination';

/**
 * CourtType component
 * @param {Object} props - The props object
 * @param {boolean} props.show - Show modal
 * @param {Function} props.handleClose - Close modal
 */
export default function CourtType({ show, handleClose }) {
  const [newCourtTypeName, setNewCourtTypeName] = useState('');
  const [courtTypes, setCourtTypes] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [alertMessage, setAlertMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCourtTypes();
  }, []);

  useEffect(() => {
    if (successMessage || alertMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        setAlertMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, alertMessage]);
  const fetchCourtTypes = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/court_types`);
      setCourtTypes(response.data);
    } catch (err) {
      setError(err);
      setAlertMessage({ type: 'danger', text: 'Failed to fetch data' });
    }
  };

  const handleAddCourtType = async () => {
    try {
      const response = await axios.post(
        `${API_CONFIG.baseURL}/api/court_types`,
        { name: newCourtTypeName }
      );
      setCourtTypes([...courtTypes, response.data]);
      setAlertMessage({ type: 'success', text: 'تم اضافة نوع المحكمة بنجاح' });
      setNewCourtTypeName('');
      handleClose();
    } catch (err) {
      setError(err);
      setAlertMessage({
        type: 'danger',
        text: 'تأكد من البيان الذى يتم إدخاله',
      });
    }
  };

  const handleDeleteCourtType = async (id, name, type) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/court_types/${id}`);
      setCourtTypes(courtTypes.filter((courtType) => courtType.id !== id));
      setAlertMessage({ type: 'success', text: 'تم حذف نوع المحكمة بنجاح' });
    } catch (error) {
      setError(error);
      setAlertMessage({
        type: 'danger',
        text: 'لا يمكن حذف نوع المحكمة لارتباطة بمحاكم وتصنيفات فرعية اخري',
      });
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courtTypes.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleCloseModal = () => {
    setModalMessage(null);
    setNewCourtTypeName('');
    handleClose();
  };

  const handleSubmit = () => {
    if (!newCourtTypeName.trim()) {
      setModalMessage({
        type: 'danger',
        text: 'برجاء إدخال نوع المحكمة المراد إضافته.',
      });
    } else {
      handleAddCourtType();
      setNewCourtTypeName('');
      handleClose();
    }
  };
  return (
    <>
      <Card>
        <Row>
          <Col>
            <Card.Header className="card-header-courts text-center">
              <h3>تصنيف المحاكم</h3>
            </Card.Header>
            <Card.Body>
              {alertMessage && (
                <Alert variant={alertMessage.type}>{alertMessage.text}</Alert>
              )}
              {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
              )}
              {courtTypeAlert && (
                <Alert variant="danger"> {alertMessage}</Alert>
              )}

              <div className="table-responsive">
                <table className="special-table">
                  <thead>
                    <tr>
                      <th>الاسم</th>
                      <th>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((courtType) => (
                      <tr className="table-row-courts" key={courtType.id}>
                        <td>{courtType.name}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() =>
                              handleDeleteCourtType(
                                courtType.id,
                                courtType.name,
                                'court_types'
                              )
                            }
                          >
                            حذف
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Col>
        </Row>
        <Card.Footer>
          <CustomPagination
            totalCount={courtTypes.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Card.Footer>
      </Card>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>إضافة نوع المحكمة</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="courtTypeName">
              <Form.Label>اسم نوع المحكمة:</Form.Label>
              <Form.Control
                type="text"
                value={newCourtTypeName}
                onChange={(e) => {
                  setNewCourtTypeName(e.target.value);
                  setCourtTypeAlert(null); // Clear the alert message when the user types
                }}
              />
              {modalMessage && (
                <Alert variant={modalMessage.type}>{modalMessage.text}</Alert>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            إغلاق
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            إضافة نوع المحكمة
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
