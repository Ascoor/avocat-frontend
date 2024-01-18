import { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Row, Col, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useAuth from '../layout/AuthTool/AuthUser';
import API_CONFIG from '../../config';

const AddEditLegCase = ({ onClose, isEditing, fetchLegCases }) => {
  const { caseId } = useParams();
  const { getUser } = useAuth();

  const [caseData, setCaseData] = useState({
    slug: '',
    litigants_name: '',
    litigants_phone: '',
    case_type_id: '',
    case_sub_type_id: '',
    description: '',
    title: '',
    client_capacity: '',
  });

  const [caseTypes, setCaseTypes] = useState([]);
  const [caseSubTypes, setCaseSubTypes] = useState([]);
  const [validated, setValidated] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [selectedCaseType, setSelectedCaseType] = useState('');
  const [selectedCaseSubType, setSelectedCaseSubType] = useState('');
  const [clientCapacity, setClientCapacity] = useState('');

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.baseURL}/api/leg-cases/create`
        );
        setCaseTypes(response.data.caseTypes);
        setCaseSubTypes(response.data.caseSubTypes);

        if (isEditing) {
          const caseResponse = await axios.get(
            `${API_CONFIG.baseURL}/api/leg-cases/${caseId}`
          );
          setCaseData(caseResponse.data);
        }
      } catch (error) {
        console.error('Error fetching form data', error);
      }
    };
    fetchFormData();
  }, [caseId, isEditing]);

  const handleCaseTypeChange = (event) => {
    const caseTypeId = event.target.value;
    setSelectedCaseType(caseTypeId);

    // Fetch case sub types based on selected case type
    axios
      .get(`${API_CONFIG.baseURL}/api/case-types/${caseTypeId}/sub-types`)
      .then((response) => {
        setCaseSubTypes(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleCaseSubTypeChange = (event) => {
    const caseSubTypeId = event.target.value;
    setSelectedCaseSubType(caseSubTypeId);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCaseData({
      ...caseData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = isEditing
          ? await axios.put(
              `${API_CONFIG.baseURL}/api/leg_cases/${caseId}`,
              caseData
            )
          : await axios.post(`${API_CONFIG.baseURL}/api/leg_cases`, {
              ...caseData,
              created_by: getUser().id,
            });
        setValidated(true);
        setAlertMessage(response.data.message);
        setShowAlert(true);
        fetchLegCases();
      } catch (error) {
        console.error('Error submitting form', error);
      }
    }
  };

  return (
    <Modal
      className="mt-5 modal-md modal-dialog-scrollable  "
      restoreFocus={true}
      enforceFocus={true}
      show={true}
      onHide={onClose}
    >
      <Modal.Header closeVariant="white" closeButton>
        <Modal.Title>
          {isEditing ? 'تعديل بيانات القضية' : 'إضافة قضية'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {showAlert && (
            <Alert
              variant={
                alertMessage.includes('success') ? 'success' : 'danger'
              }
            >
              {alertMessage}
            </Alert>
          )}
          <Row className="mt-3">
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>رقم ملف المكتب</Form.Label>
                <Form.Control
                  name="slug"
                  value={caseData.slug}
                  type="text"
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  لم تقم بإضافة رقم ملف المكتب
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="caseType">
                <Form.Label>نوع القضية</Form.Label>
                <Form.Control
                  as="select"
                  name="case_type_id"
                  value={caseData.case_type_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">اختر نوع القضية</option>
                  {caseTypes.map((caseType) => (
                    <option key={caseType.id} value={caseType.id}>
                      {caseType.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  لم تقم بإختيار نوع القضية
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col xs={12} md={6}>
              <Form.Group controlId="caseSubType">
                <Form.Label>نوع القضية الفرعي</Form.Label>
                <Form.Control
                  as="select"
                  name="case_sub_type_id"
                  value={caseData.case_sub_type_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">اختر نوع القضية الفرعي</option>
                  {caseSubTypes.map((caseSubType) => (
                    <option key={caseSubType.id} value={caseSubType.id}>
                      {decodeURIComponent(caseSubType.name)}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  لم تقم بإختيار نوع القضية الفرعي
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>صفة الإدعاء</Form.Label>
                <Form.Control
                  as="select"
                  name="client_capacity"
                  value={caseData.client_capacity}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">اختر الصفة</option>
                  <option value="مدعى عليه">مدعى عليه</option>
                  <option value="مجنى عليه">مجنى عليه</option>
                  <option value="مدعى">مدعى</option>
                  <option value="متهم">متهم</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  يجب اختيار صفة الإدعاء
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>موضوع الدعوى</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={caseData.title}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  يجب إدخال موضوع الدعوى
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>الوصف</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={caseData.description}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  يجب إدخال الوصف
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>وكيل الخصم</Form.Label>
                <Form.Control
                  type="text"
                  name="litigants_name"
                  value={caseData.litigants_name}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>رقم هاتف وكيل الخصم</Form.Label>
                <Form.Control
                  type="text"
                  name="litigants_phone"
                  value={caseData.litigants_phone}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col xs={12} md={6}>
              <Button variant="primary" type="submit">
                {isEditing ? 'تحديث' : 'حفظ'}
              </Button>
              <Button variant="secondary" onClick={onClose}>
                إلغاء
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEditLegCase;
