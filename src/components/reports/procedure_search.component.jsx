import { useState, useEffect } from "react";
import { Form, Table, Row, Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import API_CONFIG from "../../config";
import DatePicker from "react-datepicker";
import axios from "axios";
const ProcedureSearch = () => {
  const [procedureTypes, setProcedureTypes] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [lawyers, setLawyers] = useState([]);
  const [courts, setCourts] = useState([]);
  const [selectedProcedureType, setSelectedProcedureType] = useState("");
  const [selectedLawyer, setSelectedLawyer] = useState("");
  const [selectedDateStart, setSelectedDateStart] = useState(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState(null);
  const [selectedCourt, setSelectedCourt] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filteredProcedures, setFilteredProcedures] = useState([]);
  useEffect(() => {
    fetch(`${API_CONFIG.baseURL}/api/procedure_types`)
      .then((response) => response.json())
      .then((data) => setProcedureTypes(data))
      .catch((error) =>
        console.error("Error fetching procedure types:", error)
      );
    fetch(`${API_CONFIG.baseURL}/api/lawyers`)
      .then((response) => response.json())
      .then((data) => setLawyers(data))
      .catch((error) => console.error("Error fetching lawyers:", error));
    fetch(`${API_CONFIG.baseURL}/api/courts`)
      .then((response) => response.json())
      .then((data) => setCourts(data))
      .catch((error) => console.error("Error fetching courts:", error));
  }, []);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Check if any of the search parameters is empty
    if (
      !selectedDateStart &&
      !selectedDateEnd &&
      !selectedLawyer &&
      !selectedCourt &&
      !selectedProcedureType &&
      !selectedStatus
    ) {
      setSearchError("لابد من اختيار أحد العناصر للبحث");
      setFilteredProcedures([]);
      return;
    }
    // Prepare the query parameters based on the form input
    const queryParams = {};
    if (selectedDateStart) queryParams.date_start = selectedDateStart;
    if (selectedDateEnd) queryParams.date_end = selectedDateEnd;
    if (selectedLawyer) queryParams.lawyer_id = selectedLawyer;
    if (selectedCourt) queryParams.court_id = selectedCourt;
    if (selectedProcedureType)
      queryParams.procedure_type_id = selectedProcedureType;
    if (selectedStatus) queryParams.status = selectedStatus;
    // Send the GET request with query parameters to the API
    axios
      .get(`${API_CONFIG.baseURL}/api/procedures-search`, {
        params: queryParams,
      })
      .then((response) => {
        // Handle the API response here (e.g., update state with search results)
        setFilteredProcedures(response.data); // Update the state with the received data
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors here if necessary
        console.error(error);
      });
  };
  return (
    <div className="search-container">
    <div className="search-text-header">
      <h2>بحث الإجراءات</h2>
    </div><Form onSubmit={handleFormSubmit}>
  <Row>
    <Col xs={12} md={6} sm={6}>
      <Form.Group controlId="procedureType">
        <Form.Label className="search-label-text">نوع الإجراء</Form.Label>
        <Form.Control
          as="select"
          value={selectedProcedureType}
          onChange={(event) =>
            setSelectedProcedureType(event.target.value)
          }
        >
          <option value="">اختر نوع الإجراء</option>
                {procedureTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="lawyer">
        <Form.Label className="search-label-text">المحامي</Form.Label>
        <Form.Control
          as="select"
          value={selectedLawyer}
          onChange={(event) => setSelectedLawyer(event.target.value)}
        >
          <option value="">اختر المحامي</option>
                {lawyers.map((lawyer) => (
                  <option key={lawyer.id} value={lawyer.id}>
                    {lawyer.name}
                  </option>
                ))}
        </Form.Control>
      </Form.Group>
    </Col>
    <Col xs={12} md={6} sm={6}>
      <Form.Group controlId="dateRange">
        <Form.Label className="search-label-text">الفترة الزمنية</Form.Label>
        <DatePicker
                selected={selectedDateStart}
                onChange={(date) => setSelectedDateStart(date)}
                dateFormat="yyyy/MM/dd"
                placeholderText="تاريخ البدء"
                className="form-control"
                locale="ar"
                isClearable
                showYearDropdown
                scrollableYearDropdown
              />
                 <DatePicker
                selected={selectedDateEnd}
                onChange={(date) => setSelectedDateEnd(date)}
                dateFormat="yyyy/MM/dd"
                placeholderText="تاريخ الانتهاء"
                className="form-control"
                locale="ar"
                isClearable
                showYearDropdown
                scrollableYearDropdown
              />
      </Form.Group>
    </Col>
  </Row>
  <Row>
    <Col xs={12} sm={6} md={6}>
      <Form.Group controlId="court">
        <Form.Label className="search-label-text">المحكمة</Form.Label>
 
        <Form.Control
                as="select"
                value={selectedCourt}
                onChange={(event) => setSelectedCourt(event.target.value)}
              >
                <option value="">اختر المحكمة</option>
                {courts.map((court) => (
                  <option key={court.id} value={court.id}>
                    {court.name}
                  </option>
                ))}
        </Form.Control>
      </Form.Group>
    </Col>
    <Col xs={12} sm={6} md={6}>
      <Form.Group>
        <Form.Label className="search-label-text" htmlFor="status">الحالة</Form.Label>
        <Form.Control
                as="select"
                id="status"
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value)}
              >
                <option value="">All</option>
                <option value="منتهي">منتهي</option>
                <option value="لم ينفذ">لم ينفذ</option>
                <option value="قيد التنفيذ">قيد التنفيذ</option>
              </Form.Control>
      </Form.Group>
    </Col>
  </Row>
  <Row>
    <Col>
      <button type="submit" className="search-button">
        <FaSearch /> بحث
      </button>
    </Col>
  </Row>
</Form>

      {searchError && <p>{searchError}</p>}
      {filteredProcedures.length > 0 && (
        <Table striped bordered hover responsive>
          <thead className="table-success text-center">
            {" "}
            <tr>
              <th>نوع اإجراء</th>
              <th>المحامى</th>
              <th>جهة الإجراء</th>
              <th>تاريخ البدء</th>
              <th>تاريخ الانتهاء</th>
              <th>نتيجة الإجراء</th>
              <th>حالة الإجراء</th>
              <th>أخر تحديث</th>
            </tr>
          </thead>
          <tbody>
        {filteredProcedures.map((result, index) => (
        <tr key={`${result._id}-${index}`}>
            <td>{result.procedure_type?.name}</td>
            <td>{result.lawyer?.name}</td>
            <td>{result.court?.name}</td>
            <td>{result.date_start}</td>
            <td>{result.date_end}</td>
            <td className="col-4">{result.result}</td>
            <td>{result.status}</td>
            <td>{result.created_by?.name}</td>
        </tr>
        ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};
export default ProcedureSearch;
