import { useState, useEffect } from 'react';

import { FcFullTrash } from 'react-icons/fc';
import CustomPagination from '../../home_tools/Pagination';
import { Row, Col, Button, Modal, Form, Card } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import API_CONFIG from '../../../config';
const CourtSubType = ({show, handleClose}) => {
  const [selectedCourtTypeId, setSelectedCourtTypeId] = useState('');
  const [newCourtSubTypeName, setNewCourtSubTypeName] = useState("");
  const [courtTypes, setCourtTypes] = useState([]);
  const [courtLevels, setCourtLevels] = useState([]);
  const [courts, setCourts] = useState([]);
  const [newCourtTypeId, setNewCourtTypeId] = useState([]);
  const [newCourtLevelId, setNewCourtLevelId] = useState([]);
  const [newCourtName, setNewCourtName] = useState([]);
  const [newCourtAddress, setNewCourtAddress] = useState([]);
  const [courtSubTypes, setCourtSubTypes] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('success');
  const [showAddCourtSubTypeModal, setShowAddCourtSubTypeModal] =
    useState(false);
    const [courtSubTypeAlert, setCourtSubTypeAlert] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null); // For table alerts
    const [successMessage, setSuccessMessage] = useState(null); // For table success
    const [message, setMessage] = useState(null); // For table success
    const [modalMessage, setModalMessage] = useState(null); // For modal alerts
    const valueIsValid = !!newCourtSubTypeName.trim(); // true if newCourtTypeName is not empty
    useEffect(() => {
    fetchCourtSubTypes();
    fetchCourtTypes();
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
  const fetchCourtSubTypes = async () => {
    try {
        const response = await axios.get(
            `${API_CONFIG.baseURL}/api/court_sub_types/`
        );
        setCourtSubTypes(response.data);
    } catch (error) {
        setError("حدث خطأ في استرجاع أنواع المحاكم الفرعية");
        console.error("حدث خطأ في استرجاع أنواع المحاكم الفرعية: ", error);
    }
};

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


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courtTypes.slice(indexOfFirstItem, indexOfLastItem);
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
            setAlertMessage("تمت إضافة نوع المحكمة الفرعية بنجاح.");
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleCloseModal = () => {
    setModalMessage(null);
    setNewCourtTypeId('');
    setNewCourtSubTypeName('');
    handleClose();
  };

  const handleSubmit = () => {
    if (!newCourtSubTypeName.trim()) {
      setModalMessage({
        type: 'danger',
        text: 'برجاء إدخال نوع المحكمة المراد إضافته.',
      });
    } else {
      handleAddCourtSubType();
      setNewCourtTypeId('');
      setNewCourtSubTypeName('');
      handleClose();
    }
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
              <h3 style={{ color: '#006e5d' }}>أنواع المحاكم الفرعية</h3>
            </Card.Header>
       

            <Card.Body>
              <Table striped bordered hover responsive>
                <thead className="table-success text-center">
                  <tr style={{ backgroundColor: '#D1ECF1', color: '#0C5460' }}>
                    <th>الاسم</th>
                    <th>اسم نوع المحكمة</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                {currentItems.map((courtSubType) => (
                      <tr
                        style={{ backgroundColor: '#D1ECF1', color: '#0C5460' }}
                        key={courtSubType.id}
                      >
                   
                   <td>{courtSubType.name}</td>
                                                <td>{courtSubType.court_type.name}</td>

                                             
                        <td>
                          <Button
                            variant="danger"
                            onClick={() =>
                              handleDelete(
                                courtSubType.id,
                                courtSubType.name,
                                'court_sub_types'
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
            totalCount={courtSubTypes.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
            </Card.Footer>
          </Col>
        </Row>
      </Card>
      <Modal show={show} onHide={handleClose} size="lg">
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
                  {modalMessage && (
                <Alert variant={modalMessage.type}>{modalMessage.text}</Alert>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddCourtSubTypeModal(false)}
          >
            إغلاق
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            إضافة نوع المحكمة الفرعي
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default CourtSubType;
