import React, { useState, useEffect } from 'react';
import { FcFullTrash } from 'react-icons/fc';
import Pagination from '../../home_tools/Pagination';
import { Row, Col, Button, Modal, Form, Card, Table } from 'react-bootstrap';
import axios from 'axios';
import API_CONFIG from '../../../config';

export default function CourtType() {
  // State Variables
  const [newCourtTypeName, setNewCourtTypeName] = useState('');
  const [courtTypes, setCourtTypes] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showAddCourtTypeModal, setShowAddCourtTypeModal] = useState(false);

  // Fetch court types initially
  useEffect(() => {
    fetchCourtTypes();
  }, []);

  // Fetching court types from API
  const fetchCourtTypes = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/court_types/`
      );
      setCourtTypes(response.data);
    } catch (error) {
      setError('An error occurred while fetching court types.');
      console.error('An error occurred while fetching court types:', error);
    }
  };

  // Function to add a new court type
  const handleAddCourtType = async () => {
    try {
      await axios.post(`${API_CONFIG.baseURL}/api/court_types/`, {
        name: newCourtTypeName,
      });
      setShowAddCourtTypeModal(false);
      fetchCourtTypes();
    } catch (error) {
      setError('An error occurred while adding a new court type.');
      console.error('An error occurred while adding a new court type:', error);
    }
  };

  // Function to delete a court type
  const handleDeleteCourtType = async (id) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/court_types/${id}`);
      fetchCourtTypes();
    } catch (error) {
      setError('An error occurred while deleting a court type.');
      console.error('An error occurred while deleting a court type:', error);
    }
  };

  // Pagination handler
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <>
      <Card>
        <Row>
          <Col>
            <Card.Header
              style={{ backgroundColor: 'beige' }}
              className="text-center"
            >
              <h3 style={{ color: '#006e5d' }}>تصنيف المحاكم</h3>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead style={{ backgroundColor: '#D1ECF1', color: '#0C5460' }}>
                  <tr>
                    <th>الاسم</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {courtTypes.map((courtType) => (
                    <tr
                      style={{ backgroundColor: '#D1ECF1', color: '#0C5460' }}
                      key={courtType.id}
                    >
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
              </Table>
            </Card.Body>
          </Col>
        </Row>
        <Card.Footer>
          {/* replace this line with your CustomPagination component if needed */}
          <Pagination
            items={courtTypes}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Card.Footer>
      </Card>
      <Modal
        show={showAddCourtTypeModal}
        onHide={() => setShowAddCourtTypeModal(false)}
      >
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
                onChange={(e) => setNewCourtTypeName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddCourtTypeModal(false)}
          >
            إغلاق
          </Button>
          <Button variant="primary" onClick={handleAddCourtType}>
            إضافة نوع المحكمة
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
