import { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import useAuth from '../layout/AuthTool/AuthUser';
import API_CONFIG from '../../config';

const AddEditLegCase = ({ onClose, isEditing, editingLegCase }) => {
  const { getUser } = useAuth();
  const [caseData, setCaseData] = useState({
    slug: '',
    title: '',
    description: '',
    case_type_id: '',
    case_sub_type_id: '',
    client_capacity: '',
    litigants_name: '',
    litigants_phone: '',
    created_by: getUser().id,
  });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [caseTypes, setCaseTypes] = useState([]);
  const [caseSubTypes, setCaseSubTypes] = useState([]);

  useEffect(() => {
    fetchCaseTypes();
  }, []); // إزالة التبعيات لتجنب التكرار المستمر

  useEffect(() => {
    if (isEditing && editingLegCase) {
      setCaseData(editingLegCase);
      const selectedCaseType = caseTypes.find(
        (type) => type.id === editingLegCase.case_type_id,
      );
      if (selectedCaseType) {
        setCaseSubTypes(selectedCaseType.case_sub_types);
        setCaseData((prevData) => ({
          ...prevData,
          case_sub_type_id: editingLegCase.case_sub_type_id,
        }));
      }
    } else {
      setCaseData({
        slug: '',
        title: '',
        description: '',
        case_type_id: '',
        case_sub_type_id: '',
        client_capacity: '',
        litigants_name: '',
        litigants_phone: '',
        created_by: getUser().id,
      });
      setCaseSubTypes([]); // تفريغ التصنيفات الفرعية للإضافة
    }
  }, [isEditing, editingLegCase, caseTypes]);

  const fetchCaseTypes = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/legal-case/case-types-sub-types`,
      );
      setCaseTypes(response.data.caseTypes);
    } catch (error) {
      console.error('Error fetching case types:', error);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCaseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCaseTypeChange = (event) => {
    const newCaseTypeId = event.target.value;
    setCaseData((prevData) => ({
      ...prevData,
      case_type_id: newCaseTypeId,
      case_sub_type_id: '',
    }));

    // تحديث قائمة التصنيفات الفرعية بناءً على التصنيف المحدد
    const selectedCaseType = caseTypes.find(
      (type) => type.id.toString() === newCaseTypeId,
    );
    setCaseSubTypes(selectedCaseType ? selectedCaseType.case_sub_types : []);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    let dataToSend = { ...caseData };
    if (isEditing) {
      dataToSend = { ...dataToSend, updated_by: getUser().id };
    }

    try {
      const method = isEditing ? 'put' : 'post';
      const url = `${API_CONFIG.baseURL}/api/legal-cases${isEditing ? `/${editingLegCase.id}` : ''}`;
      await axios[method](url, dataToSend);

      onClose();
    } catch (error) {
      setAlertMessage('Error: ' + error.message);
      setShowAlert(true);
    }
  };
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditing ? 'تعديل بيانات القضية' : 'إضافة قضية'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {showAlert && (
            <Alert
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {alertMessage}
            </Alert>
          )}
          <Row className="mt-3">
            <Col xs={12} md={6}>
              <Form.Group controlId="formBasicSlug">
                <Form.Label>رقم الملف</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter slug"
                  name="slug"
                  value={caseData.slug}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  لم تقم بإضافة رقم ملف المكتب
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
                  <option value="">اختر صفة الإدعاء</option>
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
              <Form.Group controlId="caseType">
                <Form.Label>نوع القضية</Form.Label>
                <Form.Control
                  as="select"
                  name="case_type_id"
                  onChange={handleCaseTypeChange}
                  value={caseData.case_type_id}
                  required
                >
                  <option value="">اختر نوع القضية</option>
                  {caseTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="caseSubType">
                <Form.Label>نوع القضية الفرعي</Form.Label>
                <Form.Control
                  as="select"
                  name="case_sub_type_id"
                  onChange={handleInputChange}
                  value={caseData.case_sub_type_id}
                  required
                >
                  <option value="">اختر نوع القضية الفرعي</option>
                  {caseSubTypes.map((subType) => (
                    <option key={subType.id} value={subType.id}>
                      {subType.name}
                    </option>
                  ))}
                </Form.Control>
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
          <Button variant="primary" type="submit">
            {isEditing ? 'تحديث' : 'حفظ'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEditLegCase;
