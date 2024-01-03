import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Alert, Form, Button } from 'react-bootstrap';
import API_CONFIG from '../config';

const SearchCourt = () => {
  const [degrees, setDegrees] = useState([]);
  const [courts, setCourts] = useState([]);
  const [caseTypes, setCaseTypes] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch degrees from the API when the component mounts
    axios.get(`${API_CONFIG.baseURL}/api/search-degrees`)
      .then((response) => {
        setDegrees(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);
  const handleDegreeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDegree(selectedValue);
  
    // Fetch courts based on the selected degree
    axios.get(`${API_CONFIG.baseURL}/api/search-courts?degree_value=${selectedValue}`)
      .then((response) => {
        setCourts(response.data);
        // Reset selected court and case type when the degree changes
        setSelectedCourt('');
        setCaseTypes([]);
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  

  const handleCourtChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCourt(selectedValue);

    // Fetch case types based on the selected court
    axios.get(`${API_CONFIG.baseURL}/api/search-case-types?court_value=${selectedValue}`)
      .then((response) => {
        setCaseTypes(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <Card>
      <Card.Header className="home-text-center">لوحة التحكم</Card.Header>
      <Card.Body>
        <Card.Title className="home-text-center">Search Forms</Card.Title>
        <Card.Text className="home-text-center">
          Please select search options
        </Card.Text>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form>
          <Form.Group controlId="formDegree">
            <Form.Label>Degree</Form.Label>
            <Form.Control as="select" value={selectedDegree} onChange={handleDegreeChange}>
              <option value="">Select a degree</option>
              {degrees.map((degree) => (
                <option key={degree.id} value={degree.degree_value}>
                  {degree.degree_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {courts.length > 0 && ( // Render court select if courts are available
            <Form.Group controlId="formCourt">
              <Form.Label>Court</Form.Label>
              <Form.Control as="select" value={selectedCourt} onChange={handleCourtChange}>
                <option value="">Select a court</option>
                {courts.map((court) => (
                  <option key={court.id} value={court.court_value}>
                    {court.court_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          )}

          <Form.Group controlId="formCaseType">
            <Form.Label>Case Type</Form.Label>
            <Form.Control as="select">
              {caseTypes.map((caseType) => (
                <option key={caseType.id} value={caseType.case_type_value}>
                  {caseType.case_type_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SearchCourt;
