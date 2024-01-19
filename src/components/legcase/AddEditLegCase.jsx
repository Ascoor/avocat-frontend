import { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Row, Col, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useAuth from '../layout/AuthTool/AuthUser';
import API_CONFIG from '../../config';

const AddEditLegCase = ({ onClose, isEditing, refreshLegCases }) => {
  const { caseId } = useParams();
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
  const [caseTypes, setCaseTypes] = useState([]);
const [selectedCaseTypeId, setSelectedCaseTypeId] = useState('');
  const [validated, setValidated] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);useEffect(() => {
    fetchFormData();
    if (isEditing) {
        fetchCaseData();
    } else {
        // في حالة الإضافة، تأكد من أن التصنيفات الفارغة محددة
        setSelectedCaseTypeId('');
        setCaseData(prevData => ({ ...prevData, case_type_id: '', case_sub_type_id: '' }));
    }
}, [caseId, isEditing]);

  
  const fetchFormData = async () => {
    try {
        const response = await axios.get(`${API_CONFIG.baseURL}/api/legal-case/case-types-sub-types`);
        setCaseTypes(response.data.caseTypes);
    } catch (error) {
        console.error('Error fetching form data:', error);
    }
};

  const fetchCaseData = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.baseURL}/api/leg_cases/${caseId}`);
      setCaseData(response.data);
    } catch (error) {
      console.error('Error fetching case data:', error);
    }
  };
  const handleCaseTypeChange = (event) => {
    const newCaseTypeId = event.target.value;
    setSelectedCaseTypeId(newCaseTypeId);
    setCaseData(prevData => ({ ...prevData, case_type_id: newCaseTypeId, case_sub_type_id: '' }));
};

const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCaseData(prevData => ({ ...prevData, [name]: value }));
};

const getCaseSubTypes = () => {
  // استخدام selectedCaseTypeId بدلاً من caseData.case_type_id
  const selectedCaseType = caseTypes.find(type => type.id.toString() === selectedCaseTypeId);
  return selectedCaseType ? selectedCaseType.case_sub_types : [];
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

// best logic put & post request axios with if have caseId edit else add
try {
  const response = await axios[caseId ? 'put' : 'post'](
    `${API_CONFIG.baseURL}/api/legal-cases`,
    caseData,
  );
  setAlertMessage(response.data.message);
  setShowAlert(true);
  refreshLegCases();
} catch (error) {
  console.error('Error submitting form:', error);
}
  };


  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header animation={true} closeVariant="white" closeButton>
        <Modal.Title>{isEditing ? 'تعديل بيانات القضية' : 'إضافة قضية'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {showAlert && <Alert variant="success">{alertMessage}</Alert>}
          
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
            <Form.Label>Case Type</Form.Label>
            <Form.Control as="select" name="case_type_id" onChange={handleCaseTypeChange} value={caseData.case_type_id}>
                <option value="">Select Case Type</option>
                {caseTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                ))}
            </Form.Control>
            
            <Form.Control.Feedback type="invalid">
                Please select a case type.
                  
            </Form.Control.Feedback>
        </Form.Group>


            </Col>
          </Row>

          <Row className="mt-3">
            <Col xs={12} md={6}>
        <Form.Group controlId="caseSubType">
            <Form.Label>Case SubType</Form.Label>
            <Form.Control as="select" name="case_sub_type_id" onChange={handleInputChange} value={caseData.case_sub_type_id}>
                <option value="">Select Case SubType</option>
                {getCaseSubTypes().map(subType => (
                    <option key={subType.id} value={subType.id}>{subType.name}</option>
                ))}
            </Form.Control>
        </Form.Group>
        <Form.Control.Feedback type="invalid">
                Please select a case sub type.
        </Form.Control.Feedback>  
         
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
