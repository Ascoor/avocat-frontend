import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, FormGroup } from 'react-bootstrap';
import API_CONFIG from '../../config';

const SearchCourt = () => {
  const [allData, setAllData] = useState({
    search_degrees: [],
    search_courts: [],
    search_case_types: [],
  });
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('');
  const [selectedCaseType, setSelectedCaseType] = useState('');
  const [selectedCaseYear, setSelectedCaseYear] = useState('');
  const [selectedCaseNumber, setSelectedCaseNumber] = useState('');

  const [searchResults, setSearchResults] = useState(null);
  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios
      .get(`${API_CONFIG.baseURL}/api/search-court`)
      .then((response) => {
        setAllData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDegreeChange = (event) => {
    const degreeValue = event.target.value;
    setSelectedDegree(degreeValue);
    setSelectedCourt('');
    setSelectedCaseType('');
  };

  const handleCourtChange = (event) => {
    const courtValue = event.target.value;
    setSelectedCourt(courtValue);
    setSelectedCaseType('');
  };

  const handleCaseTypeChange = (event) => {
    const caseTypeValue = event.target.value;
    setSelectedCaseType(caseTypeValue);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = {
      degree: selectedDegree,
      court: selectedCourt,
      caseType: selectedCaseType,
      caseYear: selectedCaseYear,
      caseNumber: selectedCaseNumber,
    };
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/search', formData, {
        headers: {
          'Content-Type': 'application/json',
          'X-Request-Source': 'React', // Make sure this header is expected and correctly handled in your FastAPI app
        },
      });
      // Assuming your FastAPI responds with JSON containing the search results
      setSearchResults(response.data); // Update your component's state with the received search results
    } catch (error) {
      console.error('Search failed:', error);
  };
  };
  return (
    <section className="home-page">
      <Card>
        <Card.Header className="home-text-center">بحث المحكمة</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDegree">
              <Form.Label>الدرجة </Form.Label>
              <Form.Control
                as="select"
                value={selectedDegree}
                onChange={handleDegreeChange}
                required
              >
                <option value="">إختر الدرجة</option>
                {allData.search_degrees.map((degree) => (
                  <option key={degree.id} value={degree.degree_value}>
                    {degree.degree_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {selectedDegree && (
              <Form.Group controlId="formCourt">
                <Form.Label>Court</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedCourt}
                  onChange={handleCourtChange}
                  required
                >
                  <option value="">Select a court</option>
                  {allData.search_courts
                    .filter((court) => court.degree_value === selectedDegree)
                    .map((court) => (
                      <option key={court.id} value={court.court_value}>
                        {court.court_name}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
            )}

            {selectedCourt && (
              <Form.Group controlId="formCaseType">
                <Form.Label>Case Type</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedCaseType}
                  onChange={handleCaseTypeChange}
                  required
                >
                  <option value="">Select a case type</option>
                  {allData.search_case_types
                    .filter(
                      (caseType) =>
                        caseType.degree_value === selectedDegree &&
                        caseType.court_value === selectedCourt,
                    )
                    .map((caseType) => (
                      <option
                        key={caseType.id}
                        value={caseType.case_type_value}
                      >
                        {caseType.case_type_name}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
            )}
            <Form.Group controlId="caseYear">
              <Form.Label>Case Year</Form.Label>
              <Form.Control
                as="select"
                value={selectedCaseYear} // Use selectedCaseYear here
                onChange={(event) => setSelectedCaseYear(event.target.value)}
                required
              >
                <option value="">--اختر--</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
              </Form.Control>
            </Form.Group>
            <FormGroup controlId="caseNumber">
              <Form.Label>Case Number</Form.Label>
              <Form.Control
                as="input"
                type="number"
                value={selectedCaseNumber}
                onChange={(event) => setSelectedCaseNumber(event.target.value)}
                required
              />
            </FormGroup>

            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {searchResults && (
        <Card className="mt-3">
          <Card.Header className="home-text-center">Search Results</Card.Header>
          <Card.Body>
            {/* تخصيص عرض النتائج بتنسيق HTML */}
            <div className="container mt-5">
              <div className="card mt-4">
                <div className="card-header">
                  <h2>تفاصيل القضية</h2>
                </div>
                <div className="card-body">
                  <ul>
                    <li>
                      <strong>رقم الدعوى:</strong> {searchResults['رقم الدعوى']}
                    </li>
                    <li>
                      <strong>السنة:</strong> {searchResults['السنة']}
                    </li>
                    <li>
                      <strong>نوع الدعوى:</strong> {searchResults['نوع الدعوى']}
                    </li>
                    <li>
                      <strong>تاريخ القيد:</strong>{' '}
                      {searchResults['تاريخ القيد']}
                    </li>
                    <li>
                      <strong>اسم المدعى:</strong> {searchResults['اسم المدعى']}
                    </li>
                    <li>
                      <strong>اسم المدعى عليه:</strong>{' '}
                      {searchResults['اسم المدعى عليه']}
                    </li>
                    <li>
                      <strong>الموضوع:</strong> {searchResults['الموضوع']}
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <ul>
                    <li>
                      <strong>تاريخ آخر جلسة:</strong>{' '}
                      {searchResults['تاريخ أخر جلسة']}
                    </li>
                    <li>
                      <strong>قرار آخر جلسة:</strong>{' '}
                      {searchResults['قرار أخر جلسة']}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card mt-4">
                <div className="card-header">
                  <h2>Case Sessions</h2>
                </div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">تاريخ الجلسة</th>
                        <th scope="col">قرار الجلسة</th>
                        <th scope="col">تاريخ الجلسة القادمة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults['جلسات القضية'].map((session, index) => (
                        <tr key={index}>
                          <td>{session['تاريخ الجلسة']}</td>
                          <td>{session['قرار الجلسة']}</td>
                          <td>{session['تاريخ الجلسة القادمة']}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </section>
  );
};

export default SearchCourt;
