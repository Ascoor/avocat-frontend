import { useState, useEffect } from 'react';
import { FcFullTrash } from 'react-icons/fc';
import CustomPagination from '../../home_tools/Pagination';
import { Row, Col, Button, Modal, Form, Card } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import API_CONFIG from '../../../config';

const CourtType = () => {
  // State variables
  const [newCourtTypeName, setNewCourtTypeName] = useState('');
  const [courtTypes, setCourtTypes] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set the number of courtTypes to display per page
  const [courtTypesPage, setCourtTypesPage] = useState(1);
  const [showAddCourtTypeModal, setShowAddCourtTypeModal] = useState(false);

  // Fetch court types on component mount
  useEffect(() => {
    fetchCourtTypes();
  }, []);

  const items = courtTypes; // This array is used for pagination, assuming all data will be shown on one page

  // Fetch court types function
  const fetchCourtTypes = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/court_types/`
      );
      setCourtTypes(response.data);
    } catch (error) {
      setError('حدث خطأ في استرجاع أنواع المحاكم');
      console.error('حدث خطأ في استرجاع أنواع المحاكم: ', error);
    }
  };

  const handleAddCourtType = () => {
    fetch(`${API_CONFIG.baseURL}/api/court_types/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newCourtTypeName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchCourtTypes();
        setShowAddCourtTypeModal(false);
        setNewCourtTypeName('');
        setShowAlert(true);
        setAlertMessage(
          `تمت إضافة نوع المحكمة بنجاح. البيانات: ${JSON.stringify(data)}`
        );
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      })

      .catch((error) => {
        setError('حدث خطأ في إضافة نوع المحكمة');
        console.error('حدث خطأ في إضافة نوع المحكمة: ', error);
        setShowAlert(true);
        setAlertMessage('فشل في إضافة نوع المحكمة.');
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      });
  };
  // Function to handle page change
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
            <Button
              variant="primary"
              onClick={() => setShowAddCourtTypeModal(true)}
            >
              إضافة تصنيف محكمة
            </Button>
            <Card.Body className="court-index">
              <Table striped bordered hover responsive>
                <thead className="table-success text-center">
                  <tr>
                    <th>الاسم</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {courtTypes
                    .slice(
                      (courtTypesPage - 1) * itemsPerPage,
                      courtTypesPage * itemsPerPage
                    )
                    .map((courtType) => (
                      <tr
                        style={{ backgroundColor: '#D1ECF1', color: '#0C5460' }}
                        key={courtType.id}
                      >
                        <td>{courtType.name}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() =>
                              handleDelete(
                                courtType.id,
                                courtType.name,
                                'court_types'
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
          </Col>
          <Row>
            <Col>
              <Card.Footer>
                <CustomPagination
                  items={items}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </Card.Footer>
            </Col>
          </Row>
        </Row>
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
};
export default CourtType;
