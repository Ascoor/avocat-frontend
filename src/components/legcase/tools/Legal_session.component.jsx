import { useState, useEffect, useCallback } from 'react';
import { Button, Row, Modal, Card, Form, Alert } from 'react-bootstrap';
import { BiPlusCircle, BiPencil, BiTrash } from 'react-icons/bi';
import axios from 'axios';
import PropTypes from 'prop-types';
import useAuth from '../../layout/AuthTool/AuthUser';
import API_CONFIG from '../../../config';
import arEG from 'date-fns/locale/ar-EG';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
const LegalSession = ({ legCaseId }) => {
  LegalSession.propTypes = {
    legCaseId: PropTypes.string.isRequired,
  };
  const { getUser } = useAuth();
  const user = getUser();

  const userId = user.id;
  const [alert, setAlert] = useState(null);
  const [selectStatus, setSelectStatus] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [selectedCost, setSelectedCost] = useState(0);
  const [selectedCost2, setSelectedCost2] = useState(0);
  const [selectedSession, setSelectedSession] = useState({});
  const [legalSessions, setLegalSessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [rollNumber, setRollNumber] = useState('');
  const [selectedLawyer, setSelectedLawyer] = useState('');
  const [orders, setOrders] = useState('');
  const [showAddLegalSessionModal, setShowAddLegalSessionModal] =
    useState(false);
  const [lawyers, setLawyers] = useState([]);
  const [courts, setCourts] = useState([]);
  const [result, setResult] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('');

  const [modalMode, setModalMode] = useState('');
  registerLocale('ar_eg', arEG);
  setDefaultLocale('ar_eg');
  const fetchData = useCallback(async () => {
    try {
      const [sessionsResponse, lawyersResponse, courtsResponse] =
        await Promise.all([
          axios.get(
            `${API_CONFIG.baseURL}/api/legal_sessions/leg-case/${legCaseId}`,
          ),
          axios.get(`${API_CONFIG.baseURL}/api/lawyers`),
          axios.get(`${API_CONFIG.baseURL}/api/courts`),
        ]);
      setLegalSessions(sessionsResponse.data);
      setLawyers(lawyersResponse.data);
      setCourts(courtsResponse.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }, [legCaseId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sessionsResponse, lawyersResponse, courtsResponse] =
          await Promise.all([
            axios.get(
              `${API_CONFIG.baseURL}/api/legal_sessions/leg-case/${legCaseId}`,
            ),
            axios.get(`${API_CONFIG.baseURL}/api/lawyers`),
            axios.get(`${API_CONFIG.baseURL}/api/courts`),
          ]);
        setLegalSessions(sessionsResponse.data);
        setLawyers(lawyersResponse.data);
        setCourts(courtsResponse.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, [legCaseId]);

  const handleEditLegalSession = (legalSession) => {
    setModalMode('edit');
    setSelectedSession(legalSession);
    setSelectedDate(new Date(legalSession.date.split('T')[0])); // Parse the date string into a Date object
    setSelectStatus(legalSession.status);
    setSelectedLawyer(legalSession.lawyer_id);
    setRollNumber(legalSession.roll_number);
    setSelectedCost(legalSession.cost);
    setSelectedCost2(legalSession.cost2);
    setOrders(legalSession.orders);
    setSelectedCourt(legalSession.court_id);
    setResult(legalSession.result);

    setShowAddLegalSessionModal(true);
  };
  const handleAddOrUpdateLegalSession = async () => {
    const dateOnly = selectedDate
      ? selectedDate.toISOString().split('T')[0]
      : null;
    const data = {
      date: dateOnly,
      lawyer_id: selectedLawyer,
      roll_number: rollNumber,
      orders,
      court_id: selectedCourt,
      result,
      cost: selectedCost,
      cost2: selectedCost2,
      leg_case_id: legCaseId,
      created_by: userId,
    };

    if (modalMode === 'edit') {
      data.status = selectStatus;
    }

    // Include created_by only when creating a new record
    if (modalMode === 'add') {
      data.created_by = userId; // Include created_by when creating a new record
    }

    try {
      if (modalMode === 'add') {
        await axios.post(`${API_CONFIG.baseURL}/api/legal_sessions`, data);
        fetchData();
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);

        setAlert({ variant: 'info', message: 'تمت الإضافة بنجاح.' });
        setShowAlert(true);
      } else if (modalMode === 'edit') {
        await axios.put(
          `${API_CONFIG.baseURL}/api/legal_sessions/${selectedSession.id}`,
          data,
        );
        fetchData();

        setTimeout(() => {
          setShowAlert(false);
        }, 5000);

        setAlert({ variant: 'info', message: 'تم التعديل بنجاح.' });
        setShowAlert(true);
      }

      handleCloseModal();
    } catch (error) {
      console.log(error);

      setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      setAlert({
        variant: 'danger',
        message: 'حدث خطأ أثناء عملية التعديل.',
      });
      setShowAlert(true);
    }
  };

  const handleAddLegalSession = () => {
    setModalMode('add');
    setShowAddLegalSessionModal(true);
  };

  const handleDeleteLegalSession = async (id) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/legal_sessions/${id}`);
      fetchData();
      setAlert({ variant: 'success', message: 'تم الحذف بنجاح' });
      setShowAlert(true);
    } catch (error) {
      console.log('خطأ في حذف الجلسة القانونية:', error);
      setAlert({
        variant: 'danger',
        message: 'حدث خطأ أثناء حذف الجلسة القانونية',
      });
      setShowAlert(true);
    }
  };

  const handleCloseModal = () => {
    fetchData();
    setModalMode('');
    setSelectedSession({});
    setSelectedDate('');
    setSelectStatus('');
    setSelectedLawyer('');
    setRollNumber('');
    setOrders('');
    setSelectedCourt('');
    setResult('');
    setShowAddLegalSessionModal(false);
  };

  return (
    <>
      <Row>
        {showAlert && (
          <Alert
            variant={alert.variant}
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {alert.message}
          </Alert>
        )}
      </Row>

      <Card.Header>
        <Button
          variant="success"
          className="btn-sm"
          onClick={handleAddLegalSession}
        >
          <BiPlusCircle className="mr-1" />
          إضافة جلسة
        </Button>
      </Card.Header>
      <Card.Body>
        <Row>
          <div className="table-responsive">
            <table className="special-table">
              <thead>
                <tr>
                  <th className="col-2">تاريخ الجلسة</th>
                  <th className="col-2">اسم المحامي</th>
                  <th className="col-1">الرول</th>
                  <th className="col-2">المحكمة</th>
                  <th className="col-3">الطلبات</th>
                  <th className="col-3">النتيجة</th>
                  <th className="col-1">الحالة</th>
                  <th>تعديل</th>
                  <th>حذف</th>
                </tr>
              </thead>
              <tbody>
                {legalSessions.map((legalSession) => (
                  <tr key={legalSession.id}>
                    <td>{legalSession.session_date}</td>
                    <td>{legalSession.lawyer.name}</td>
      <td>{legalSession.legal_session_type.name}</td>
                    <td>{legalSession.court.name}</td>
                    <td>{legalSession.orders}</td>
                    <td>{legalSession.result}</td>
                    <td>{legalSession.status}</td>
                    <td>
                      <Button
                        variant="info"
                        onClick={() => handleEditLegalSession(legalSession)}
                      >
                        <BiPencil />
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() =>
                          handleDeleteLegalSession(legalSession.id)
                        }
                      >
                        <BiTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Row>
      </Card.Body>

      <Modal
        show={showAddLegalSessionModal}
        onHide={handleCloseModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === 'add' ? 'إضافة جلسة جديدة' : 'تعديل جلسة'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="sessionDate">
              <Form.Label>تاريخ الجلسة</Form.Label>
              <br />
              <DatePicker
                className="form-control"
                dateFormat="yyyy-MM-dd"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
              />
            </Form.Group>

            {modalMode === 'edit' && (
              <Form.Group controlId="status">
                <Form.Label>حالة الجلسة</Form.Label>
                <Form.Control
                  as="select"
                  value={selectStatus}
                  onChange={(e) => setSelectStatus(e.target.value)}
                >
                  <option value="">اختر حالة الجلسة</option>
                  <option value="منتهي">منتهي</option>
                  <option value="لم ينفذ">لم ينفذ</option>
                  <option value="قيد التنفيذ">قيد التنفيذ</option>
                </Form.Control>
              </Form.Group>
            )}
            <Form.Group controlId="formLawyer">
              <Form.Label>اسم المحامي</Form.Label>
              <Form.Control
                as="select"
                value={selectedLawyer}
                onChange={(e) => setSelectedLawyer(e.target.value)}
              >
                <option value="">اختر المحامي</option>
                {lawyers.map((lawyer) => (
                  <option key={lawyer.id} value={lawyer.id}>
                    {lawyer.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formRollNumber">
              <Form.Label>رقم الرول</Form.Label>
              <Form.Control
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formOrders">
              <Form.Label>الطلبات</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={orders}
                onChange={(e) => setOrders(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCourt">
              <Form.Label>المحكمة</Form.Label>
              <Form.Control
                as="select"
                value={selectedCourt}
                onChange={(e) => setSelectedCourt(e.target.value)}
              >
                <option value="">اختر المحكمة</option>
                {courts.map((court) => (
                  <option key={court.id} value={court.id}>
                    {court.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="legalSessioCost">
              <Form.Label>التكلفة</Form.Label>
              <Form.Control
                type="number"
                placeholder="ادخل التكلفة"
                value={selectedCost}
                onChange={(e) => setSelectedCost(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="legalSessioCost2">
              <Form.Label>التكلفة 2</Form.Label>
              <Form.Control
                type="number"
                placeholder="ادخل التكلفة 2"
                value={selectedCost2 | ''}
                onChange={(e) => setSelectedCost2(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formResult">
              <Form.Label>النتيجة</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={result}
                onChange={(e) => setResult(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            إلغاء
          </Button>
          <Button variant="primary" onClick={handleAddOrUpdateLegalSession}>
            {modalMode === 'add' ? 'إضافة' : 'تعديل'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LegalSession;
