import { useEffect, useState } from 'react';
import API_CONFIG from '../../config';
import { JudgeIcon } from '../../assets/icons';
import {
  Button,
  Row,
  Col,
  Table,
  ButtonGroup,
  Modal,
  Alert,
  Card,
} from 'react-bootstrap';
import axios from 'axios';

const CaseType = () => {
  const [procedureTypes, setProcedureTypes] = useState([]);
  const [caseTypes, setCaseTypes] = useState([]);
  const [caseSubTypes, setCaseSubTypes] = useState([]);
  const [error, setError] = useState(null);
  const [showAddProcedureTypeModal, setShowAddProcedureTypeModal] =
    useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [legalAdTypes, setLegalAdTypes] = useState([]);
  const [showAddLegalAdModal, setShowAddLegalAdModal] = useState(false);
  const [newAdType, setNewAdType] = useState('');
  const [showAddCaseTypeModal, setShowAddCaseTypeModal] = useState(false);
  const [showAddCaseSubTypeModal, setShowAddCaseSubTypeModal] = useState(false);
  const [newProcedureTypeName, setNewProcedureTypeName] = useState('');
  const [newCaseTypeName, setNewCaseTypeName] = useState('');
  const [newCaseSubTypeName, setNewCaseSubTypeName] = useState('');
  const [newCaseTypeId, setNewCaseTypeId] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const procedureTypesResponse = await axios.get(
        `${API_CONFIG.baseURL}/api/procedure_types/`
      );
      const caseTypesResponse = await axios.get(
        `${API_CONFIG.baseURL}/api/case_types/`
      );
      const caseSubTypesResponse = await axios.get(
        `${API_CONFIG.baseURL}/api/case_sub_types/`
      );
      const legalAdTypesResponse = await axios.get(
        `${API_CONFIG.baseURL}/api/legal_ad_types/`
      );

      setProcedureTypes(procedureTypesResponse.data);
      setCaseTypes(caseTypesResponse.data);
      setCaseSubTypes(caseSubTypesResponse.data);
      setLegalAdTypes(legalAdTypesResponse.data);
    } catch (error) {
      setError('Error fetching data');
      console.error('Error fetching data: ', error);
    }
  };

  const handleAddProcedureType = () => {
    axios
      .post(`${API_CONFIG.baseURL}/api/procedure_types/`, {
        name: newProcedureTypeName,
      })
      .then(() => {
        setShowAddProcedureTypeModal(false);
        setNewProcedureTypeName('');
        fetchData();
      })
      .catch((error) => {
        setError('Error adding Procedure Type');
        console.error('Error adding Procedure Type: ', error);
      });
  };

  const handleAddCaseType = () => {
    axios
      .post(`${API_CONFIG.baseURL}/api/case_types/`, {
        name: newCaseTypeName,
      })
      .then(() => {
        setShowAddCaseTypeModal(false);
        setNewCaseTypeName('');
        fetchData();
      })
      .catch((error) => {
        setError('Error adding Case Type');
        console.error('Error adding Case Type: ', error);
      });
  };

  const handleAddCaseSubType = () => {
    axios
      .post(`${API_CONFIG.baseURL}/api/case_sub_types/`, {
        case_type_id: newCaseTypeId,
        name: newCaseSubTypeName,
      })
      .then(() => {
        setShowAddCaseSubTypeModal(false);
        setNewCaseSubTypeName('');
        setNewCaseTypeId('');
        fetchData();
      })
      .catch((error) => {
        setError('Error adding Case Sub Type');
        console.error('Error adding Case Sub Type: ', error);
      });
  };
  const handleAddAdType = () => {
    axios
      .post(`${API_CONFIG.baseURL}/api/legal_ad_types`, {
        name: newAdType,
      })
      .then(() => {
        setShowAddLegalAdModal(false);
        setNewAdType('');
        fetchData();
      })
      .catch((error) => {
        setError('Error adding legal ad type');
        console.error('Error adding legal ad type: ', error);
      });
  };

  const handleDelete = (id, name, tableName) => {
    let message = '';

    switch (tableName) {
      case 'case_types':
        message = 'Case Type';
        break;
      case 'case_sub_types':
        message = 'Case Sub Type';
        break;
      case 'procedure_types':
        message = 'Procedure Type';
        break;
      case 'legal_ad_types':
        message = 'Ad Type';
        break;
      default:
        throw new Error('Invalid table name');
    }

    const item = {
      id,
      name,
      tableName,
      message,
    };

    setDeleteItem(item);
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = () => {
    const { id, name, tableName, message } = deleteItem;

    axios
      .delete(`${API_CONFIG.baseURL}/api/${tableName}/${id}`)
      .then((response) => {
        if (response.status === 204) {
          alert(`${message} "${name}" deleted successfully`);

          // Fetch data after successful deletion
          if (tableName === 'case_types') {
            // Fetch case types and case subtypes after deleting a case type
            fetchData();
          } else if (tableName === 'case_sub_types') {
            // Fetch only case subtypes after deleting a case subtype
            fetchData();
          } else if (tableName === 'procedure_types') {
            // Fetch only procedure types after deleting a procedure type
            fetchData();
          } else if (tableName === 'legal_ad_types') {
            // Fetch only procedure types after deleting a procedure type
            fetchData();
          }
        } else {
          throw new Error('Failed to delete');
        }
      })
      .catch((error) => {
        console.error('Failed to delete', error);
        alert(`Failed to delete ${message} "${name}". Please try again later.`);
      });

    setShowConfirmationModal(false);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  return (
    <>
      <Card>
        <Row>
          <div className="court-setting-card-header">
            <Card.Header className="text-center">
              إعدادات القضايا
              <img src={JudgeIcon} alt="Icon" className="court-icon" />
              {error && <Alert variant="danger">{error}</Alert>}
            </Card.Header>
          </div>
        </Row>
        <Row>
          <ButtonGroup aria-label="Basic example">
            <Button
              onClick={() => setShowAddCaseTypeModal(true)}
              variant="success"
            >
              إضافة نوع القضية
            </Button>
            <Button
              onClick={() => setShowAddCaseSubTypeModal(true)}
              variant="warning"
            >
              إضافة نوع القضية الفرعية
            </Button>
            <Button
              onClick={() => setShowAddProcedureTypeModal(true)}
              variant="warning"
            >
              إضافة نوع الإجراء
            </Button>
            <Button
              onClick={() => setShowAddLegalAdModal(true)}
              variant="success"
            >
              إضافة نوع إعلان
            </Button>
          </ButtonGroup>
        </Row>
        <Card.Body>
          <Row>
            <Col>
              <Card.Header
                style={{ backgroundColor: 'beige' }}
                className="text-center"
              >
                <h3 style={{ color: '#006e5d' }}>أنواع القضايا</h3>
              </Card.Header>

              <Table striped bordered hover responsive>
                <thead className="table-success text-center">
                  <tr>
                    <th>الاسم</th>
                    <th>التحكم</th>
                  </tr>
                </thead>
                <tbody>
                  {caseTypes.map((caseType) => (
                    <tr
                      style={{ backgroundColor: '#D1ECF1', color: '#0C5460' }}
                      key={caseType.id}
                    >
                      <td>{caseType.name}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() =>
                            handleDelete(
                              caseType.id,
                              caseType.name,
                              'case_types'
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
            </Col>
            <Col>
              <Card.Header
                style={{ backgroundColor: 'beige' }}
                className="text-center"
              >
                <h3 style={{ color: '#006e5d' }}>أنواع القضايا الفرعية</h3>
              </Card.Header>
              <Table striped bordered hover responsive>
                <thead className="table-success text-center">
                  <tr>
                    <th>النوع الفرعي</th>
                    <th>اسم نوع القضية</th>
                    <th>التحكم</th>
                  </tr>
                </thead>
                <tbody>
                  {caseSubTypes.map((caseSubType) => (
                    <tr
                      style={{ backgroundColor: '#D1ECF1', color: '#0C5460' }}
                      key={caseSubType.id}
                    >
                      <td>{caseSubType.name}</td>
                      <td>{caseSubType.case_type.name}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() =>
                            handleDelete(
                              caseSubType.id,
                              caseSubType.name,
                              'case_sub_types'
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
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Header
                style={{ backgroundColor: 'beige' }}
                className="text-center"
              >
                <h3 style={{ color: '#006e5d' }}>أنواع الإجراءات</h3>
              </Card.Header>
              <Table striped bordered hover responsive>
                <thead className="table-success text-center">
                  <tr>
                    <th>الاسم</th>
                    <th>التحكم</th>
                  </tr>
                </thead>
                <tbody>
                  {procedureTypes.map((procedureType) => (
                    <tr
                      style={{ backgroundColor: '#D1ECF1', color: '#0C5460' }}
                      key={procedureType.id}
                    >
                      <td>{procedureType.name}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() =>
                            handleDelete(
                              procedureType.id,
                              procedureType.name,
                              'procedure_types'
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
            </Col>
            <Col>
              <Card.Header
                style={{ backgroundColor: 'beige' }}
                className="text-center"
              >
                <h3 style={{ color: '#006e5d' }}>أنواع الإعلانات</h3>
              </Card.Header>
              <Table striped bordered hover responsive>
                <thead className="table-success text-center">
                  <tr>
                    <th>الاسم</th>
                    <th>التحكم</th>
                  </tr>
                </thead>
                <tbody>
                  {legalAdTypes.map((adType) => (
                    <tr key={adType.id}>
                      <td>{adType.name}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() =>
                            handleDelete(
                              adType.id,
                              adType.name,
                              'legal_ad_types'
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
            </Col>
          </Row>
          <Modal
            show={showAddCaseTypeModal}
            onHide={() => setShowAddCaseTypeModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>إضافة نوع الحالة</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <label htmlFor="CaseTypeName">اسم نوع الحالة:</label>
                <input
                  type="text"
                  id="CaseTypeName"
                  value={newCaseTypeName}
                  onChange={(e) => setNewCaseTypeName(e.target.value)}
                />
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowAddCaseTypeModal(false)}
              >
                إغلاق
              </Button>
              <Button variant="primary" onClick={handleAddCaseType}>
                إضافة نوع الحالة
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={showAddCaseSubTypeModal}
            onHide={() => setShowAddCaseSubTypeModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>إضافة نوع الحالة الفرعية</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <label htmlFor="CaseTypeId">نوع الحالة:</label>
                <select
                  id="CaseTypeId"
                  value={newCaseTypeId}
                  onChange={(e) => setNewCaseTypeId(e.target.value)}
                >
                  <option value="">اختر نوع الحالة</option>
                  {caseTypes.map((caseType) => (
                    <option key={caseType.id} value={caseType.id}>
                      {caseType.name}
                    </option>
                  ))}
                </select>
                <br />
                <label htmlFor="CaseSubTypeName">اسم نوع الحالة الفرعية:</label>
                <input
                  type="text"
                  id="CaseSubTypeName"
                  value={newCaseSubTypeName}
                  onChange={(e) => setNewCaseSubTypeName(e.target.value)}
                />
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowAddCaseSubTypeModal(false)}
              >
                إغلاق
              </Button>
              <Button variant="primary" onClick={handleAddCaseSubType}>
                إضافة نوع الحالة الفرعية
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={showAddProcedureTypeModal}
            onHide={() => setShowAddProcedureTypeModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>إضافة نوع الإجراء</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <label htmlFor="ProcedureTypeName">اسم نوع الإجراء:</label>
                <input
                  type="text"
                  id="ProcedureTypeName"
                  value={newProcedureTypeName}
                  onChange={(e) => setNewProcedureTypeName(e.target.value)}
                />
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowAddProcedureTypeModal(false)}
              >
                إغلاق
              </Button>
              <Button variant="primary" onClick={handleAddProcedureType}>
                إضافة نوع الإجراء
              </Button>
            </Modal.Footer>
          </Modal>
          <>
            <Modal
              show={showConfirmationModal}
              onHide={handleCloseConfirmationModal}
            >
              <Modal.Body>
                {deleteItem && (
                  <p>
                    Are you sure you want to delete {deleteItem.message} &quot;
                    {deleteItem.name}&quot;?
                  </p>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={handleCloseConfirmationModal}
                >
                  إلغاء
                </Button>
                <Button variant="danger" onClick={handleConfirmDelete}>
                  حذف
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal
              show={showAddLegalAdModal}
              onHide={() => setShowAddLegalAdModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>إضافة نوع الإعلان</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <label htmlFor="LegalAdTypeName">اسم نوع الإعلان:</label>
                  <input
                    type="text"
                    id="LegalAdTypeName"
                    value={newAdType}
                    onChange={(e) => setNewAdType(e.target.value)}
                  />
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowAddLegalAdModal(false)}
                >
                  إغلاق
                </Button>
                <Button variant="primary" onClick={handleAddAdType}>
                  إضافة نوع الإعلان
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </Card.Body>
      </Card>
    </>
  );
};
export default CaseType;
