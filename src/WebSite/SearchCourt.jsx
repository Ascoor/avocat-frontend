import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';
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
  const [searchCaseTypes, setSearchCaseTypes] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get(`${API_CONFIG.baseURL}/api/search-court`)
      .then(response => {
        setAllData(response.data);
      })
      .catch(error => console.log(error));
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

  return (
    <section className="home-page">
      <Card>
        <Card.Header className="home-text-center">لوحة التحكم</Card.Header>
        <Card.Body>
          <Card.Title className="home-text-center">Search Forms</Card.Title>
          <Card.Text className="home-text-center">
            Please select search options
          </Card.Text>

          <Form>
            <Form.Group controlId="formDegree">
              <Form.Label>Degree</Form.Label>
              <Form.Control as="select" value={selectedDegree} onChange={handleDegreeChange}>
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
                <Form.Control as="select" value={selectedCourt} onChange={handleCourtChange}>
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
                <Form.Control as="select" value={selectedCaseType} onChange={handleCaseTypeChange}>
                  <option value="">Select a case type</option>
                  {allData.search_case_types
                    .filter((caseType) => caseType.court_value === selectedCourt)
                    .map((caseType) => (
                      <option key={caseType.id} value={caseType.case_type_value}>
                        {caseType.case_type_name}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
            )}

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
