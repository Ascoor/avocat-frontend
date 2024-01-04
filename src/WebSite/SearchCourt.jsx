import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Form, Button, FormGroup } from 'react-bootstrap';
import API_CONFIG from '../config';

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      degree_value: selectedDegree,
      court_value: selectedCourt,
      case_type_value: selectedCaseType,
      case_year: selectedCaseYear,
      case_number: selectedCaseNumber,
    };

    axios
      .post(`http://127.0.0.1:5000/search-result`, formData)
      .then((response) => {
        // Handle the response here
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className="home-page">
      <Card>
        <Card.Header className="home-text-center">لوحة التحكم</Card.Header>
        <Card.Body>
          <Card.Title className="home-text-center">Search Forms</Card.Title>
          <Card.Text className="home-text-center">
            Please select search options
          </Card.Text>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDegree">
              <Form.Label>Degree</Form.Label>
              <Form.Control
                as="select"
                value={selectedDegree}
                onChange={handleDegreeChange}
              >
                <option value="">Select a degree</option>
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
                onChange={(event) => setSelectedCaseNumber(event.target.value)} // تحديث قيمة selectedCaseNumber عند التغيير
              />
            </FormGroup>

            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </section>
  );
};

export default SearchCourt;
