import { useState, useEffect } from 'react';
import { FcFullTrash } from 'react-icons/fc';
import {
  Row,
  Col,
  Button,
  Modal,
  Alert,
  Form,
  Card,
  Spinner,
} from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import API_CONFIG from '../../../config';
import CustomPagination from '../../home_tools/Pagination'; // Import your custom Pagination component here

const Court = ({ show, handleClose }) => {
  const [courtTypes, setCourtTypes] = useState([]);
  const [courtSubTypes, setCourtSubTypes] = useState([]);
  const [courtLevels, setCourtLevels] = useState([]);
  const [courts, setCourts] = useState([]);
  const [newCourtTypeId, setNewCourtTypeId] = useState('');
  const [newCourtSubTypeId, setNewCourtSubTypeId] = useState('');
  const [courtTypeId, setCourtTypeId] = useState('');
  const [newCourtLevelId, setNewCourtLevelId] = useState('');
  const [newCourtName, setNewCourtName] = useState('');
  const [newCourtAddress, setNewCourtAddress] = useState('');
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('success');
  const [showAddCourtModal, setShowAddCourtModal] = useState(false);
  const [loading, setLoading] = useState(false); // New state variable for loading indicator

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [modalMessage, setModalMessage] = useState(null);
  const [courtTypesAlert, setCourtTypesAlert] = useState(null);

  const fetchData = async (url, setState) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}${url}`);
      setState(response.data);
    } catch (error) {
      setError(`An error occurred: ${error.message}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Fetch initial data
    fetchData('/api/court_types/', setCourtTypes);
    fetchData('/api/court_levels/', setCourtLevels);
    fetchData('/api/courts/', setCourts);
  }, []);

  useEffect(() => {
    if (courtTypeId) {
      fetchData(`/api/court-types/${courtTypeId}`, setCourtSubTypes);
    }
  }, [courtTypeId]);

  const handleAddCourt = () => {
    fetch(`${API_CONFIG.baseURL}/api/courts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courtTypeId: newCourtTypeId,
        courtSubTypeId: newCourtSubTypeId,
        courtLevelId: newCourtLevelId,
        name: newCourtName,
        address: newCourtAddress,
      }),
    })
      .then(response => response.json())
      .then(data => {
        fetchCourts();
        setShowAddCourtModal(false);
        setNewCourtName('');
        setNewCourtTypeId('');
        setNewCourtSubTypeId('');
        setNewCourtLevelId('');
        setNewCourtAddress('');
        setShowAlert(true);
        setAlertMessage(
          `تمت إضافة المحكمة بنجاح. البيانات: ${JSON.stringify(data)}`,
        );
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      })

      .catch(error => {
        setError('حدث خطأ في إضافة المحكمة');
        console.error('حدث خطأ في إضافة المحكمة: ', error);
        setShowAlert(true);
        setAlertMessage('فشل في إضافة المحكمة.');
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      });
  };
  const handleDelete = id => {
    // Your code to handle deletion
    fetch(`${API_CONFIG.baseURL}/api/courts/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        fetchCourts();
        setShowAlert(true);
        setAlertMessage(
          `تمت إزالة المحكمة بنجاح. البيانات: ${JSON.stringify(data)}`,
        );
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      })
      .catch(error => {
        setError('حدث خطأ في إزالة المحكمة');
        console.error('حدث خطأ في إزالة المحكمة: ', error);
        setShowAlert(true);
        setAlertMessage('فشل في إزالة المحكمة.');
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  return (
    <>
      {loading && <Spinner animation="border" />}
      <Alert
        show={showAlert}
        variant="danger"
        onClose={() => setShowAlert(false)}
        dismissible
      >
        {error}
      </Alert>

      <Card>
        <Row>
          <Card.Header className="card-header-courts">
            <h3>المحاكم</h3>
          </Card.Header>
          <Card.Body>
            <div className="table-responsive">
              <table className="special-table">
                <thead>
                  <tr>
                    <th>الاسم</th>
                    <th>النوع</th>
                    <th>النوع الفرعي</th>
                    <th>المستوى</th>
                    <th>العنوان</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {courts.map((court, index) => (
                    <tr key={index} className="table-row-courts">
                      <td>{court.name}</td>
                      <td>{court.court_type.name}</td>
                      <td>{court.court_sub_type.name}</td>
                      <td>{court.court_level.name}</td>
                      <td>{court.address}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() =>
                            handleDelete(court.id, court.name, 'courts')
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
          <Card.Footer>
            <CustomPagination
              totalCount={courts.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </Card.Footer>
        </Row>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
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
                onChange={e => {
                  const selectedTypeId = e.target.value;
                  setSelectedCourtTypeId(selectedTypeId);
                  setNewCourtTypeId(selectedTypeId);
                }}
              >
                <option value="">اختر نوع المحكمة</option>
                {courtTypes.map(courtType => (
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
                onChange={e => setNewCourtSubTypeId(e.target.value)}
              >
                <option value="">اختر نوع المحكمة الفرعي</option>

                {courtSubTypes.length > 0 &&
                  courtSubTypes.map(courtSubTypes => (
                    <option key={courtSubTypes.id} value={courtSubTypes.id}>
                      {courtSubTypes.name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="courtLevelId">
              <Form.Label>مستوى المحكمة:</Form.Label>
              <Form.Control
                as="select"
                value={newCourtLevelId}
                onChange={e => setNewCourtLevelId(e.target.value)}
              >
                <option value="">اختر مستوى المحكمة</option>
                {courtLevels.map(courtLevel => (
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
                onChange={e => setNewCourtName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="courtAddress">
              <Form.Label>عنوان المحكمة:</Form.Label>
              <Form.Control
                type="text"
                value={newCourtAddress}
                onChange={e => setNewCourtAddress(e.target.value)}
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
