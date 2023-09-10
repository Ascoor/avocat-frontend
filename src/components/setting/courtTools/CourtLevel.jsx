import { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Form, Card } from 'react-bootstrap';
import API_CONFIG from '../../../config';
import Table from 'react-bootstrap/Table';
import { FcFullTrash } from 'react-icons/fc';
import axios from 'axios';

const CourtLevel = ({ itemsPerPage }) => {
  const [newCourtLevelName, setNewCourtLevelName] = useState('');
  const [courtLevels, setCourtLevels] = useState([]);
  const [error, setError] = useState(null);
  const [courtLevelsPage, setCourtLevelsPage] = useState(1);
  const [showAddCourtLevelModal, setShowAddCourtLevelModal] = useState(false); // Add this state variable

  useEffect(() => {
    fetchCourtLevels();
  }, []);

  const fetchCourtLevels = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/court_levels/`
      );
      setCourtLevels(response.data);
    } catch (error) {
      setError('حدث خطأ في استرجاع مستويات المحاكم');
      console.error('حدث خطأ في استرجاع مستويات المحاكم: ', error);
    }
  };
  const handleAddCourtLevel = () => {
    fetch(`${API_CONFIG.baseURL}/api/court_levels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newCourtLevelName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchCourtLevels();
        setShowAddCourtLevelModal(false);
        setNewCourtLevelName('');
        setShowAlert(true);
        setAlertMessage(
          `تمت إضافة مستوى المحكمة بنجاح. البيانات: ${JSON.stringify(data)}`
        );
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      })

      .catch((error) => {
        setError('حدث خطأ في إضافة مستوى المحكمة');
        console.error('حدث خطأ في إضافة مستوى المحكمة: ', error);
        setShowAlert(true);
        setAlertMessage('فشل في إضافة مستوى المحكمة.');
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      });
  };
  const onPageChange = (pageNumber) => {
    setCourtLevelsPage(pageNumber);
  };

  return (
    <>
      <Card>
        <Card>
          <Row>
            <Col>
              <Card.Header
                style={{ backgroundColor: 'beige' }}
                className="text-center"
              >
                <h3 style={{ color: '#006e5d' }}>درجات المحاكم</h3>
              </Card.Header>
              <Button
                onClick={() => setShowAddCourtLevelModal(true)}
                variant="primary"
              >
                إضافة درجة المحكمة
              </Button>

              <Card.Body className="court-index">
                <Table striped bordered hover responsive>
                  <thead className="table-success text-center">
                    <tr
                      style={{ backgroundColor: '#D1ECF1', color: '#0C5460' }}
                    >
                      <th>الاسم</th>
                      <th>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courtLevels
                      .slice(
                        (courtLevelsPage - 1) * itemsPerPage,
                        courtLevelsPage * itemsPerPage
                      )
                      .map((courtLevel) => (
                        <tr
                          style={{
                            backgroundColor: '#D1ECF1',
                            color: '#0C5460',
                          }}
                          key={courtLevel.id}
                        >
                          <td>{courtLevel.name}</td>
                          <td>
                            <Button
                              variant="danger"
                              onClick={() =>
                                handleDelete(
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
              <Row>
                <Card.Footer></Card.Footer>
              </Row>
            </Col>
          </Row>
        </Card>
      </Card>
      <Modal
        show={showAddCourtLevelModal}
        onHide={() => setShowAddCourtLevelModal(false)}
      >
        <Modal.Header closeButton>
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
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddCourtLevelModal(false)}
          >
            إغلاق
          </Button>
          <Button variant="primary" onClick={handleAddCourtLevel}>
            إضافة مستوى المحكمة
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CourtLevel;
