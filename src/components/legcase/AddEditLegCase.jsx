import { useEffect, useState } from 'react';
import { Form, Button, Alert, Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useAuth from '../layout/AuthTool/AuthUser';
import API_CONFIG from '../../config';

const AddEditLegCase = ({ onClose, isEditing }) => {
  const [slug, setSlug] = useState('');
  const [validated, setValidated] = useState(false);
  const [litigants_name, setLitigantsName] = useState('');
  const [litigants_phone, setLitigantsPhone] = useState('');
  const [caseTypes, setCaseTypes] = useState([]);
  const [caseSubTypes, setCaseSubTypes] = useState([]);
  const [selectedCaseType, setSelectedCaseType] = useState('');
  const [selectedCaseSubType, setSelectedCaseSubType] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [client_capacity, setClientCapacity] = useState('');
  const [message, setMessage] = useState('');
  const { getUser } = useAuth();

  const [showMessage, setShowMessage] = useState(false);
  
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.baseURL}/api/leg-cases/create`,
        );
        setCaseTypes(response.data.caseTypes);
        setCaseSubTypes(response.data.caseSubTypes);
   
      } catch (error) {
        console.log(error);
      }
    
    if (isEditing) {
      try {
        const response = await axios.get(`${API_CONFIG.baseURL}/api/leg-cases/${caseId}`);
        const caseData = response.data;
        // تعيين البيانات في الـ states
        setSlug(caseData.slug);
        // ... تعيين البيانات الأخرى
      } catch (error) {
        console.log(error);
      }
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const caseData = {
        slug,
        litigants_name,
        litigants_phone,
        case_type_id: selectedCaseType,
        case_sub_type_id: selectedCaseSubType,
        description,
        title, 
        client_capacity,
        created_by: getUser().id,
      };
      try {
        let response;
        if (isEditing) {
          response = await axios.put(`${API_CONFIG.baseURL}/api/leg_cases/${caseId}`, caseData);
        } else {
          response = await axios.post(`${API_CONFIG.baseURL}/api/leg_cases`, caseData);
        }
        // ... التعامل مع الاستجابة
      } catch (error) {
        console.error(error);
      }
      setValidated(true);  
        onClose(); // Close the modal after successful operation
    };
  
    // Use onClose for handling cancel action
    const handleCancel = () => {
      onClose();
    };
  };
    
    return (
    <Modal show={true} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditing ? 'تعديل بيانات القضية' : 'إضافة قضية'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {showMessage && (
            <Alert variant={message.includes('success') ? 'success' : 'danger'}>
              {message}
            </Alert>
          )}
          <Row className="mt-3">
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>رقم ملف المكتب</Form.Label>
                <Form.Control
                  value={slug}
                  type="text"
                  onChange={(e) => setSlug(e.target.value)}
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
                  onChange={handleCaseTypeChange}
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
                  onChange={handleCaseSubTypeChange}
                  required
                >
                  <option value="">اختر نوع القضية الفرعي</option>
                  {caseSubTypes.map((caseSubType) => (
                    <option key={caseSubType.id} value={caseSubType.id}>
                      {decodeURIComponent(caseSubType.name)}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
       
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>صفة الإدعاء</Form.Label>
                <Form.Control
                  as="select"
                  value={client_capacity}
                  onChange={(e) => setClientCapacity(e.target.value)}
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  value={litigants_name}
                  onChange={(e) => setLitigantsName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>رقم هاتف وكيل الخصم</Form.Label>
                <Form.Control
                  type="text"
                  value={litigants_phone}
                  onChange={(e) => setLitigantsPhone(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col xs={12} md={6}>
              <Button variant="primary" type="submit">
                {isEditing ? 'تحديث' : 'حفظ'}
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
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
