import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_CONFIG from "../../config";
import {
  Col,
  Row,
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  Form,
} from "react-bootstrap";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import { BsPersonFillX } from "react-icons/bs";
import Procedure from "./tools/procedure.component";
import LegalSession from "./tools/Legal_session.component";
import LegCaseClients from "./tools/legal_clients.component";

import { LegCaseDetailsIcon } from "../../assets/icons";
import LegalAd from "./tools/legal_ad.component";
export default function LegCaseDetail() {
  const { id } = useParams();
  const [legCase, setLegCase] = useState(null);
  const [key, setKey] = useState("procedure");
  const [courts, setCourts] = useState([]);
  const [legCaseCourts, setLegCaseCourts] = useState([]);
  const [legCaseNewCourts, setLegCaseNewCourts] = useState([]);
  useEffect(() => {
    const fetchLegCase = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.baseURL}/api/leg_cases/${id}`
        );
        setLegCase(response.data.leg_case);
        setLegCaseCourts(response.data.leg_case.courts);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchFormData = async () => {
      try {
        const response = await axios.get(
          `${API_CONFIG.baseURL}/api/leg-cases/create`
        );

        setCourts(response.data.courts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLegCase();
    fetchFormData();
  }, [id]);

  const handleAddNewCourt = () => {
    setLegCaseNewCourts((prevCourts) => [
      ...prevCourts,
      { case_number: "", case_year: "", court_id: "", judge_level: "" },
    ]);
  };

  const handleRemoveNewCourt = (index) => {
    setLegCaseNewCourts((prevCourts) =>
      prevCourts.filter((_, i) => i !== index)
    );
  };

  const handleNewCourtChange = (index, field, value) => {
    const updatedCourts = [...legCaseNewCourts];
    updatedCourts[index][field] = value;
    setLegCaseNewCourts(updatedCourts);
  };

  if (!legCase) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <Card.Header>
        <div className="custom-card-header">
          <h3 style={{ fontWeight: "bold" }}>بيانات القضية</h3>
          <img src={LegCaseDetailsIcon} alt="Icon" className="leg-case-icon" />
        </div>
      </Card.Header>
      <Card.Body>
        {legCase && (
          <>
            <div className="leg-case-details-card m-4">
              <Row className="data-row text-center">
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className="data-box bg-danger text-white"
                >
                  <div style={{ color: "#fdff00" }} className="data-label">
                    موضوع القضية
                  </div>
                  <div style={{ color: "#ffffff" }} className="data-value">
                    {legCase.title}
                  </div>
                </Col>
              </Row>
              <Row className="data-row text-center">
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className="data-box bg-dark text-white"
                >
                  <div style={{ color: "#ff0000" }} className="data-label">
                    تفاصيل القضية
                  </div>
                  <div style={{ color: "#ffff" }} className="data-value">
                    {legCase.description}
                  </div>
                </Col>
              </Row>
              <Row className="data-row text-center align-items-center">
                <Col
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  className="data-box bg-primary text-white"
                >
                  <div className="data-label text-center">
                    رقم الملف بالمكتب
                  </div>
                  <div className="data-value" style={{ color: "white" }}>
                    {legCase.slug}
                  </div>
                </Col>
                <Col
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  className="data-box bg-primary text-white"
                >
                  <div className="data-label">حالة الدعوى</div>
                  <div className="data-value">{legCase.status}</div>
                </Col>
                <Col
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  className="data-box bg-success text-white"
                >
                  <div className="data-label">صفة الموكل</div>
                  <div className="data-value">{legCase.client_capacity}</div>
                </Col>
                <Col
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  className="data-box bg-success text-white"
                >
                  <div className="data-label">اسم الخصم</div>
                  <div className="data-value">
                    <BsPersonFillX size={25} color="yellow" />
                    {legCase.litigants_name}
                  </div>
                </Col>

                <Col
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  className="data-box bg-primary text-white"
                >
                  <div className="data-label">تصنيف القضية</div>
                  <div style={{ color: "#ffffff" }} className="data-value">
                    {legCase.case_type?.name}
                  </div>
                </Col>
                <Col
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  className="data-box bg-primary text-white"
                >
                  <div className="data-label">التصنيف الفرعي</div>
                  <div className="data-value">
                    {legCase.case_sub_type?.name}
                  </div>
                </Col>
              </Row>
            </div>
          </>
        )}
      </Card.Body>

      <Card.Body>
        <LegCaseClients legCaseId={id} />
      </Card.Body>

      <Card.Header>
        <div className="custom-card-header">
          <h3 style={{ fontWeight: "bold" }}>بيانات المحاكم</h3>
          <Button
            className="btn btn-sm btn-start"
            variant="warning"
            onClick={handleAddNewCourt}
          >
            إضافة محكمة <BiPlusCircle />
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Table striped bordered hover responsive>
              <thead className="table-success text-center">
                <tr>
                  <th>رقم القضية</th>
                  <th>سنة القضية</th>
                  <th>المحكمة</th>
                  <th>مستوى القاضي</th>
                </tr>
              </thead>
              <tbody>
                {legCaseCourts.map((court) => (
                  <tr key={court.id}>
                    <td>{court.pivot.case_number}</td>
                    <td>{court.pivot.case_year}</td>
                    <td>{court.name}</td>
                    <td>{court.pivot.judge_level}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
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
                            "case_number",
                            e.target.value
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
                          handleNewCourtChange(
                            index,
                            "case_year",
                            e.target.value
                          )
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
                  <Col>
                    <Form.Group className="mb-0">
                      <Form.Label>المحكمة</Form.Label>
                      <Form.Control
                        as="select"
                        value={court.court_id}
                        onChange={(e) =>
                          handleNewCourtChange(
                            index,
                            "court_id",
                            e.target.value
                          )
                        }
                      >
                        <option defaultValue={null}>اختر المحكمة</option>
                        {courts.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>مستوى القاضي</Form.Label>
                      <Form.Control
                        as="select"
                        value={court.judge_level}
                        onChange={(e) =>
                          handleNewCourtChange(
                            index,
                            "judge_level",
                            e.target.value
                          )
                        }
                      >
                        <option defaultValue={null}>اختر مستوى القاضي</option>
                        <option value="نقض">نقض</option>
                        <option value="ثانى درجة">ثانى درجة</option>
                        <option value="أول درجة">أول درجة</option>
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
