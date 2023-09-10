import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { useSpring, animated } from '@react-spring/web';
import { FaSearch } from 'react-icons/fa';
import API_CONFIG from '../../config';

function CourtSearch() {
  const [degreeOptions, setDegreeOptions] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState([]);
  const [courtOptions, setCourtOptions] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState([]);
  const [caseTypeOptions, setCaseTypeOptions] = useState([]);
  const [selectedCaseType, setSelectedCaseType] = useState([]);
  const [caseYear, setCaseYear] = useState('');
  const [caseNumber, setCaseNumber] = useState('');

  useEffect(() => {
    fetchDegrees();
  }, []);

  const fetchDegrees = async () => {
    const response = await fetch(`${API_CONFIG.baseURL}/api/search/degrees`);
    const data = await response.json();
    setDegreeOptions(data.degrees);
  };

  const formAnimation = useSpring({
    opacity: 1,
    marginTop: 0,
    from: { opacity: 0, marginTop: -100 },
  });

  const handleDegreeSelect = async (event) => {
    const selectedDegree = event.target.value;
    setSelectedDegree(selectedDegree);
    const response1 = await fetch(
      `${API_CONFIG.baseURL}/api/search/court-options/${selectedDegree}`
    );
    const data1 = await response1.json();
    setCourtOptions(data1.courts);
  };
  const handleCourtSelect = async (event) => {
    const selectedCourt = event.target.value;
    setSelectedCourt(selectedCourt);

    const response = await fetch(
      `${API_CONFIG.baseURL}/search/case-type-options/${selectedCourt}`
    );
    const data = await response.json();
    setCaseTypeOptions(data.caseTypeOptions);
  };

  const handleCaseTypeSelect = (event) => {
    const selectedCaseType = event.target.value;
    setSelectedCaseType(selectedCaseType);
  };

  const handleCaseYearInput = (event) => {
    const caseYear = event.target.value;
    setCaseYear(caseYear);
  };

  const handleCaseNumberInput = (event) => {
    const caseNumber = event.target.value;
    setCaseNumber(caseNumber);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchParams = {
      selectedDegree,
      selectedCourt,
      selectedCaseType,
      caseYear,
      caseNumber,
    };

    fetch(`${API_CONFIG.baseURL}/search/perform-search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchParams),
    })
      .then((response) => {
        // Handle response
      })
      .catch((error) => {
        // Handle error
      });
  };
  return (
    <Container>
      <h1>Court Search</h1>
      <Link to="/">Back to Home</Link>

      <animated.div style={formAnimation}>
        <Form onSubmit={handleSearchSubmit}>
          <Form.Group controlId="degreeSelect">
            <Form.Label>Select Degree:</Form.Label>
            <Form.Control
              as="select"
              value={selectedDegree}
              onChange={handleDegreeSelect}
            >
              <option value="">Select</option>
              {degreeOptions.length > 0 &&
                degreeOptions.map((degree) => (
                  <option key={degree.value} value={degree.value}>
                    {degree.label}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="courtSelect">
            <Form.Label>Select Court:</Form.Label>
            <Form.Control
              as="select"
              value={selectedCourt}
              onChange={handleCourtSelect}
            >
              <option value="">Select</option>
              {courtOptions.map((court) => (
                <option key={court.id} value={court.id}>
                  {court.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="caseTypeSelect">
            <Form.Label>Select Case Type:</Form.Label>
            <Form.Control
              as="select"
              value={selectedCaseType}
              onChange={handleCaseTypeSelect}
            >
              <option value="">Select</option>
              {caseTypeOptions.map((caseType) => (
                <option key={caseType.id} value={caseType.id}>
                  {caseType.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="caseYearInput">
            <Form.Label>Case Year:</Form.Label>
            <Form.Control
              type="text"
              value={caseYear}
              onChange={handleCaseYearInput}
            />
          </Form.Group>

          <Form.Group controlId="caseNumberInput">
            <Form.Label>Case Number:</Form.Label>
            <Form.Control
              type="text"
              value={caseNumber}
              onChange={handleCaseNumberInput}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            <FaSearch /> Search
          </Button>
        </Form>
      </animated.div>
    </Container>
  );
}

export default CourtSearch;
