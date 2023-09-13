import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Button,
  Modal,
  Form,
  Card,
  Table,
  Alert,
} from 'react-bootstrap';
import { FcFullTrash } from 'react-icons/fc';
import axios from 'axios';
import API_CONFIG from '../../../config';

import CustomPagination from '../../home_tools/Pagination';
const CourtLevel = ({ show, handleClose }) => {
  const [newCourtLevelName, setNewCourtLevelName] = useState('');
  const [courtLevels, setCourtLevels] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showAddCourtLevelModal, setShowAddCourtLevelModal] = useState(false);
  const [courtLevelAlert, setCourtLevelAlert] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null); // For table alerts
  const [successMessage, setSuccessMessage] = useState(null); // For table success
  const [message, setMessage] = useState(null); // For table success
  const [modalMessage, setModalMessage] = useState(null); // For modal alerts
  const valueIsValid = !!newCourtLevelName.trim(); // true if newCourtLevelName is not empty

  useEffect(() => {
    fetchCourtLevels();
  }, []);
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [successMessage]);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [alertMessage]);
  const fetchCourtLevels = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/court_levels`
      );
      setCourtLevels(response.data);
    } catch (e) {
      setAlertMessage('حدث خطأ في استرجاع مستويات المحاكم', e);
    }
  };

  const handleAddCourtLevel = async () => {
    try {
      const response = await axios.post(
        `${API_CONFIG.baseURL}/api/court_levels/`,
        {
          name: newCourtLevelName,
        }
      );
      setCourtLevels([...courtLevels, response.data]);
      setAlertMessage({
        type: 'success',
        text: `تمت إضافة مستوى المحكمة بنجاح.`,
      });
      setNewCourtLevelName('');
      setShowAddCourtLevelModal(false);
      fetchCourtLevels();
    } catch (e) {
      setAlertMessage('حدث خطأ في إضافة مستوى المحكمة', e);
    }
  };
  const handleDeleteCourtLevel = async (id, name, type) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/court_levels/${id}`);
      setCourtLevels(courtLevels.filter((courtLevel) => courtLevel.id !== id));
      setAlertMessage({ type: 'success', text: 'تم حذف مستوى المحكمة بنجاح' });
    } catch (error) {
      setError(error);
      setAlertMessage({
        type: 'danger',
        text: 'لا يمكن حذف مستوى المحكمة لارتباطة بمحاكم وتصنيفات فرعية اخري',
      });
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courtLevels.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCloseModal = () => {
    setModalMessage(null);
    setNewCourtLevelName('');
    handleClose();
  };

  const handleSubmit = () => {
    if (!newCourtLevelName.trim()) {
      setModalMessage({
        type: 'danger',
        text: 'برجاء إدخال مستوى المحكمة المراد إضافته.',
      });
    } else {
      handleAddCourtLevel();
      setNewCourtLevelName('');
      handleClose();
    }
  };
  return (
    <>
      <Card>
        <Row>
          <Col>
            <Card.Header className="card-header-courts text-center">
              <h3 style={{ color: '#006e5d' }}>درجات المحاكم</h3>
            </Card.Header>

            <Card.Body>
              {alertMessage && (
                <Alert variant={alertMessage.type}>{alertMessage.text}</Alert>
              )}
              {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
              )}
              {courtLevelAlert && (
                <Alert variant="danger"> {alertMessage}</Alert>
              )}

              <Table striped bordered hover>
                <thead className="table-success text-center">
                  <tr>
                    <th>الاسم</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((courtLevel) => (
                    <tr className="table-row-courts" key={courtLevel.id}>
                      <td>{courtLevel.name}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() =>
                            handleDeleteCourtLevel(
                              courtLevel.id,
                              courtLevel.name,
                              'court_levels'
                            )
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
              <CustomPagination
                totalCount={courtLevels.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </Card.Footer>
          </Col>
        </Row>
      </Card>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton={handleClose}>
          <Modal.Title>إضافة مستوى المحكمة</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="courtLevelName">
              <Form.Label>اسم مستوى المحكمة:</Form.Label>
              <Form.Control
                type="text"
                value={newCourtLevelName}
                onChange={(e) => setNewCourtLevelName(e.target.value)}
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
            إضافة مستوى المحكمة
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CourtLevel;
