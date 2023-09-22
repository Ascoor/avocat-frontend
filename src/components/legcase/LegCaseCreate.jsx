import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
import PropTypes from 'prop-types';

import { favicon } from '../../assets/icons';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import useAuth from '../layout/AuthTool/AuthUser';
import API_CONFIG from '../../config';
const LegCaseCreate = () => {
  const navigate = useNavigate();

  const isEditing = true; // Replace 'true' with the appropriate value based on your use case

  const [slug, setSlug] = useState('');
  const [validated, setValidated] = useState(false);
  const [litigants_name, setLitigantsName] = useState('');
  const [litigants_phone, setLitigantsPhone] = useState('');
  const [caseTypes, setCaseTypes] = useState([]);
  const [caseSubTypes, setCaseSubTypes] = useState([]);
  const [selectedCaseType, setSelectedCaseType] = useState('');
  const [selectedCaseSubType, setSelectedCaseSubType] = useState('');
  const [status, setStatus] = useState('');

  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [legCaseCourts, setLegCaseCourts] = useState([
    { case_number: '', case_year: '', court_id: '', judge_level: '' },
  ]);
  const [legCaseClients, setLegCaseClients] = useState([{ client_id: '' }]);
  const [courtOptions, setCourtOptions] = useState([]);
  const [clientOptions, setClientOptions] = useState([]);
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
        setCourtOptions(response.data.courts);
        setClientOptions(response.data.clients);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFormData();
  }, []);

  const handleCaseTypeChange = event => {
    const caseTypeId = event.target.value;
    setSelectedCaseType(caseTypeId);

    // Fetch case sub types based on selected case type
    axios
      .get(`${API_CONFIG.baseURL}/api/case-types/${caseTypeId}/sub-types`)
      .then(response => {
        setCaseSubTypes(response.data);
      })
      .catch(error => console.log(error));
  };

  const handleCaseSubTypeChange = event => {
    const caseSubTypeId = event.target.value;
    setSelectedCaseSubType(caseSubTypeId);
  };

  const handleAddClient = () => {
    setLegCaseClients([...legCaseClients, { client_id: '' }]);
  };

  const handleRemoveClient = index => {
    setLegCaseClients(prevClients => prevClients.filter((_, i) => i !== index));
  };

  const handleClientChange = (index, key, value) => {
    const updatedClients = [...legCaseClients];
    updatedClients[index][key] = value;
    setLegCaseClients(updatedClients);
  };
  const handleAddCourt = () => {
    setLegCaseCourts([
      ...legCaseCourts,
      { case_number: '', case_year: '', court_id: '', judge_level: '' },
    ]);
  };

  const handleRemoveCourt = index => {
    setLegCaseCourts(prevCourts => prevCourts.filter((_, i) => i !== index));
  };

  const handleCourtChange = (index, key, value) => {
    const updatedCourts = [...legCaseCourts];
    updatedCourts[index][key] = value;
    setLegCaseCourts(updatedCourts);
  };

  const handleSubmit = async event => {
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
        status,

        description,
        title,
        courts: legCaseCourts,
        clients: legCaseClients,
        client_capacity,
        created_by: getUser().id,
      };
      try {
        const response = await axios.post(
          `${API_CONFIG.baseURL}/api/leg_cases`,
          caseData,
        );
        if (response.status === 201) {
          setMessage('Case created successfully!');
          setShowMessage(true);
          setTimeout(() => {}, 2000);
        }
        navigate('/legcases');
      } catch (error) {
        console.error(error);
      }
    }
    setValidated(true);
  };

  const handleCancel = () => {
    navigate('/legcases');
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
                  onChange={e => setSlug(e.target.value)}
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
                  {caseTypes.map(caseType => (
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
                  {caseSubTypes.map(caseSubType => (
                    <option key={caseSubType.id} value={caseSubType.id}>
                      {decodeURIComponent(caseSubType.name)}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>القضية</Form.Label>
                <Form.Control
                  as="select"
                  value={status[0]}
                  onChange={e => setStatus([e.target.value])} // Wrap the selected value in an array
                  required
                >
                  <option value="">حالة القضية</option>
                  <option value="قيد التجهيز">قيد التجهيز</option>
                  <option value="متداولة">متداولة</option>
                  <option value="منتهية">منتهية</option>

                  <option value="معلقة">معلقة</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  يجب اختيار حالة القضية
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>صفة الموكل</Form.Label>
                <Form.Control
                  as="select"
                  value={client_capacity}
                  onChange={e => setClientCapacity(e.target.value)}
                  required
                >
                  <option value="">اختر الصفة</option>
                  <option value="مدعى عليه">مدعى عليه</option>
                  <option value="مجنى عليه">مجنى عليه</option>
                  <option value="مدعى">مدعى</option>
                  <option value="متهم">متهم</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  يجب اختيار صفة الموكل
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Form.Label>الموكلين</Form.Label>{' '}
            <Row className="mt-3">
              <Col xs={12} md={6}>
                <Button
                  className="btn btn-sm mb-auto"
                  variant="warning"
                  onClick={handleAddClient}
                >
                  إضافة عميل <BiPlusCircle />
                </Button>{' '}
              </Col>
            </Row>
            {legCaseClients.map((client, index) => (
              <div key={index} className="mb-3">
                <Row className="align-items-center mt-3">
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-0">
                      <Form.Control
                        as="select"
                        value={client.client_id}
                        onChange={e =>
                          handleClientChange(index, 'client_id', e.target.value)
                        }
                        required
                      >
                        <option value="">اختر العميل</option>
                        {clientOptions.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        يجب اختيار العميل
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Col xs={1}>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveClient(index)}
                    className="align-middle"
                  >
                    <BiMinusCircle />
                  </Button>
                </Col>
              </div>
            ))}
          </Row>
          <Card.Body>
            <Row className="mt-3">
              <Col xs={12} md={6}>
                <Button
                  className="btn btn-sm mb-auto"
                  variant="warning"
                  onClick={handleAddCourt}
                >
                  إضافة محكمة <BiPlusCircle />
                </Button>{' '}
              </Col>
            </Row>
            {legCaseCourts.map((court, index) => (
              <div key={index} className="mb-3">
                <Row className="align-items-center mt-3">
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-0">
                      <Form.Label>رقم القضية</Form.Label>
                      <Form.Control
                        type="text"
                        value={court.case_number}
                        onChange={e =>
                          handleCourtChange(
                            index,
                            'case_number',
                            e.target.value,
                          )
                        }
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        يجب إدخال رقم القضية
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-0">
                      <Form.Label>سنة القضية</Form.Label>
                      <Form.Control
                        as="select"
                        value={court.case_year || ''}
                        onChange={e =>
                          handleCourtChange(index, 'case_year', e.target.value)
                        }
                        required
                      >
                        <option value="">اختر السنة</option>
                        {Array.from({ length: 51 }, (_, i) => (
                          <option key={2000 + i} value={2000 + i}>
                            {2000 + i}
                          </option>
                        ))}
                      </Form.Control>

                      <Form.Control.Feedback type="invalid">
                        يجب اختيار سنة القضية
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-0">
                      <Form.Label>المحكمة</Form.Label>
                      <Form.Control
                        as="select"
                        value={court.court_id}
                        onChange={e =>
                          handleCourtChange(index, 'court_id', e.target.value)
                        }
                        required
                      >
                        <option value="">اختر المحكمة</option>
                        {courtOptions.map(option => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        يجب اختيار المحكمة
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>درجة التقاضى</Form.Label>
                      <Form.Control
                        as="select"
                        value={court.judge_level}
                        onChange={e =>
                          handleCourtChange(
                            index,
                            'judge_level',
                            e.target.value,
                          )
                        }
                        required
                      >
                        <option value="">درجة التقاضي</option>
                        <option value="نقض">نقض</option>
                        <option value="ثانى درجة">ثانى درجة</option>
                        <option value="أول درجة">أول درجة</option>
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        يجب اختيار درجة التقاضي
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Col xs={1}>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveCourt(index)}
                    className="align-middle"
                  >
                    <BiMinusCircle />
                  </Button>
                </Col>
              </div>
            ))}
          </Card.Body>

          <Row className="mt-3">
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>موضوع الدعوى</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
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
                  onChange={e => setDescription(e.target.value)}
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
                <Form.Label>اسم الخصم</Form.Label>
                <Form.Control
                  type="text"
                  value={litigants_name}
                  onChange={e => setLitigantsName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>رقم هاتف الخصم</Form.Label>
                <Form.Control
                  type="text"
                  value={litigants_phone}
                  onChange={e => setLitigantsPhone(e.target.value)}
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
LegCaseCreate.propTypes = {
  legCaseId: PropTypes.string,
  isEditing: PropTypes.bool.isRequired,
};
export default LegCaseCreate;
