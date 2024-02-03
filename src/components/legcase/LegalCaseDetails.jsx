import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/legcase.css';
import API_CONFIG from '../../config';
import { Col, Row, Tab, Tabs, Card, Button, Form } from 'react-bootstrap';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
import { BsPersonFillX } from 'react-icons/bs';

import Procedure from './tools/LegalCaseProcedures';
import LegalSession from './tools/LegalCaseSessions';
import LegCaseClients from './tools/LegalCaseClients';
import { LegCaseDetailsIcon } from '../../assets/icons';
import LegalAd from './tools/LegalCaseAds';
export default function LegCaseDetail() {
  const { id } = useParams();
  const [legCase, setLegCase] = useState(null);
  const [key, setKey] = useState('procedure');
  const [courts, setCourts] = useState([]);
  const [clients, setClients] = useState([]);
  const [legCaseCourts, setLegCaseCourts] = useState([]);

  const [legCaseNewClients, setLegCaseNewClients] = useState([]);
  const [legCaseNewCourts, setLegCaseNewCourts] = useState([]);
  useEffect(() => {
    const fetchLegCase = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.baseURL}/api/legal-cases/${id}`,
        );
        setLegCase(response.data.leg_case);
        setLegCaseCourts(response.data.leg_case.courts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLegCase();
  }, [id]);

  const handleAddNewClient = () => {
    setLegCaseNewClients((prevClients) => [...prevClients, { client_id: '' }]);
  };
  // Function to add a new court to the legCaseNewCourts state
  const handleAddNewCourt = () => {
    setLegCaseNewCourts((prevCourts) => [
      ...prevCourts,
      { case_number: '', case_year: '', court_id: '' },
    ]);
  };

  // Function to remove a new court from the legCaseNewCourts state
  const handleRemoveNewCourt = (index) => {
    setLegCaseNewCourts((prevCourts) =>
      prevCourts.filter((_, i) => i !== index),
    );
  };

  // Function to handle changes in the new court form fields
  const handleNewCourtChange = (index, field, value) => {
    const updatedCourts = [...legCaseNewCourts];
    updatedCourts[index][field] = value;
    setLegCaseNewCourts(updatedCourts);
  };

  // Function to handle adding leg case courts
  const handleAddLegCaseCourts = async () => {
    try {
      // Prepare the data to send in the request
      const requestData = {
        leg_case_id: id,
        courts: legCaseNewCourts,
      };

      // Make a POST request to add leg case courts
      const response = await axios.post('/leg-case/add_courts', requestData);

      // Handle the response as needed (e.g., show a success message)
      console.log('Leg case courts added successfully', response.data);
    } catch (error) {
      // Handle any errors (e.g., display an error message)
      console.error('Error adding leg case courts', error);
    }
  };

  if (!legCase) {
    return <div>Loading...</div>;
  }

  const handleRemoveNewClient = (index) => {
    setLegCaseNewClients((prevClients) =>
      prevClients.filter((_, i) => i !== index),
    );
  };

  const handleNewClientChange = (index, field, value) => {
    const updatedClients = [...legCaseNewClients];
    updatedClients[index][field] = value;
    setLegCaseNewClients(updatedClients);
  };

  const CaseHeader = () => (
    <div className="legalcase-card-header">
      <h3>بيانات القضية</h3>
      <img src={LegCaseDetailsIcon} alt="Icon" className="leg-case-icon" />
    </div>
  );

  const CaseBody = () => (
    <Card.Body>
      {legCase && (
        <>
          <div className="leg-case-details-card m-4">
            <Row className="data-row">
              <Col xs={12} sm={12} md={12} lg={12} className="data-box">
                <div className="data-label">موضوع القضية</div>
                <div className="data-value">{legCase.title}</div>
              </Col>
            </Row>
            <Row className="data-row">
              <Col xs={12} sm={12} md={12} lg={12} className="data-box">
                <div className="data-label">تفاصيل القضية</div>
                <div className="data-value">{legCase.description}</div>
              </Col>
            </Row>
            <Row className="data-row align-items-center">
              <Col xs={12} sm={6} md={6} lg={6} className="data-box">
                <div className="data-label">رقم الملف بالمكتب</div>
                <div className="data-value">{legCase.slug}</div>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6} className="data-box">
                <div className="data-label">حالة الدعوى</div>
                <div className="data-value">{legCase.status}</div>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6} className="data-box">
                <div className="data-label">صفة الموكل</div>
                <div className="data-value">{legCase.client_capacity}</div>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6} className="data-box">
                <div className="data-label">اسم الخصم</div>
                <div className="data-value">
                  <BsPersonFillX size={25} />
                  {legCase.litigants_name}
                </div>
              </Col>

              <Col xs={12} sm={6} md={6} lg={6} className="data-box">
                <div className="data-label">تصنيف القضية</div>
                <div className="data-value">{legCase.case_type?.name}</div>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6} className="data-box">
                <div className="data-label">التصنيف الفرعي</div>
                <div className="data-value">{legCase.case_sub_type?.name}</div>
              </Col>
            </Row>
          </div>
        </>
      )}
    </Card.Body>
  );

  const CourtsHeader = () => (
    <Card.Header>
      <div className="legalcase-card-header d-flex justify-content-between align-items-center">
        <h3 style={{ fontWeight: 'bold' }}>بيانات المحاكم</h3>
        <div>
          <Button
            className="btn btn-sm btn-start mx-2"
            variant="warning"
            onClick={handleAddNewCourt}
          >
            إضافة محكمة <BiPlusCircle />
          </Button>
        </div>
      </div>
    </Card.Header>
  );

  return (
    <Card>
      <CaseHeader />
      <Card.Body>
        <CaseBody />
        <LegCaseClients
          legCaseId={id}
          clients={clients}
          onAddNewClient={handleAddNewClient} // This will add a new client in the LegCaseDetails state
          handleNewClientChange={handleNewClientChange} // Propagate changes in the client fields
          handleRemoveNewClient={handleRemoveNewClient} // Propagate removal of a new client
        />
      </Card.Body>
      <CourtsHeader />
      <Card.Body>
        <Row>
          <div className="table-responsive">
            <table className="special-table">
              <thead>
                <tr>
                  <th>رقم القضية</th>
                  <th>سنة القضية</th>
                  <th>المحكمة</th>
                </tr>
              </thead>
              <tbody>
                {legCaseCourts.map((court, index) => (
                  <tr key={`legCaseCourt-${index}`}>
                    <td>{court.pivot.case_number}</td>
                    <td>{court.pivot.case_year}</td>
                    <td>{court.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {legCaseNewCourts.map((court, index) => (
            <div key={index} className="mb-3">
              <Row className="align-items-center mt-3">
                <Col>
                  <Form.Group className="mb-0">
                    <Form.Label>رقم القضية</Form.Label>
                    <Form.Control
                      type="text"
                      value={court.case_number}
                      onChange={(e) =>
                        handleNewCourtChange(
                          index,
                          'case_number',
                          e.target.value,
                        )
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-0">
                    <Form.Label>سنة القضية</Form.Label>
                    <Form.Control
                      as="select"
                      value={court.case_year}
                      onChange={(e) =>
                        handleNewCourtChange(index, 'case_year', e.target.value)
                      }
                    >
                      <option defaultValue={null}>اختر السنة</option>
                      {Array.from({ length: 51 }, (_, i) => (
                        <option key={2000 + i} value={2000 + i}>
                          {2000 + i}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} lg={6}>
                  <Form.Group className="mb-0">
                    <Form.Label>المحكمة</Form.Label>
                    <Form.Control
                      as="select"
                      value={court.court_id}
                      onChange={(e) =>
                        handleNewCourtChange(index, 'court_id', e.target.value)
                      }
                    >
                      <option defaultValue={null}>اختر المحكمة</option>
                      {courts.map((option) => (
                        <option key={`court-${option.id}`} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col xs={1}>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveNewCourt(index)}
                    className="align-middle"
                  >
                    <BiMinusCircle />
                  </Button>
                </Col>
              </Row>
            </div>
          ))}
        </Row>
        <Row>
          <Col>
            <Button
              variant="success"
              onClick={handleAddLegCaseCourts}
              className="align-middle"
            >
              <BiPlusCircle />
            </Button>
          </Col>
        </Row>
      </Card.Body>

      <Card.Body>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="procedure" title="الإجراءات">
            <Procedure legCaseId={String(id)} />
          </Tab>
          <Tab eventKey="session" title="الجلسات">
            <LegalSession legCaseId={String(id)} />
          </Tab>
          <Tab eventKey="legalAd" title="الإعلانات">
            <LegalAd legCaseId={String(id)} />
          </Tab>
        </Tabs>
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
}
