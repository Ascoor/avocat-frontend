import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import API_CONFIG from '../../config';

function CourtSearch() {
  const [degrees, setDegrees] = useState([]);
  const [courts, setCourts] = useState([]);
  const [caseTypes, setCaseTypes] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('');
  const [selectedCaseType, setSelectedCaseType] = useState('');
  const [caseYear, setCaseYear] = useState('');
  const [caseNumber, setCaseNumber] = useState('');

  // Fetch degrees when the component mounts
  useEffect(() => {
    fetchDegrees();
  }, []);

  // Fetch degrees from the backend
  const fetchDegrees = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/search-court/degrees`,
      );
      setDegrees(response.data.degrees);
    } catch (error) {
      console.error('Error fetching degrees:', error);
    }
  };

  // Fetch courts when a degree is selected
  const handleDegreeSelect = async (event) => {
    const selectedDegree = event.target.value;
    setSelectedDegree(selectedDegree);
    setCourts([]); // Reset courts when degree changes
    setCaseTypes([]); // Reset case types when degree changes

    if (selectedDegree) {
      try {
        const response = await axios.get(
          `${API_CONFIG.baseURL}/api/search-court/courts/` + selectedDegree,
        );
        if (response.data && Array.isArray(response.data.courts)) {
          setCourts(response.data.courts);
        } else {
          // Handle the case where courts is not an array
          console.error('Invalid courts data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching courts:', error);
      }
    }
  };

  async function handleCourtSelect(event) {
    const courtId = event.target.value;
    setSelectedCourt(courtId);
    if (!courtId) return;

    try {
      const response = await axios.post(
        `${API_CONFIG.baseURL}/api/search-court/case-types/${courtId}`,
      );
      setCaseTypes(response.data.caseTypes);
    } catch (error) {
      console.error('Error fetching case types:', error);
    }
  }

  async function handleSearchSubmit(event) {
    event.preventDefault();
    const searchParams = {
      degree: selectedDegree,
      court: selectedCourt,
      caseType: selectedCaseType,
      year: caseYear,
      number: caseNumber,
    };

    try {
      const response = await axios.post(
        `${API_CONFIG.baseURL}/api/search-court/search`,
        searchParams,
      );
      // Handle the response
    } catch (error) {
      console.error('Error performing search:', error);
    }
  }

  return (
    <Form onSubmit={handleSearchSubmit}>
      <Form.Group controlId="degreeSelect">
        <Form.Label>Select Degree:</Form.Label>
        <Form.Control
          as="select"
          value={selectedDegree}
          onChange={handleDegreeSelect}
        >
          <option value="">Select Degree</option>
          {degrees.map((degree) => (
            <option key={degree.value} value={degree.value}>
              {degree.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {/* Courts dropdown */}
      <Form.Group controlId="courtSelect">
        <Form.Label>Select Court:</Form.Label>
        <Form.Control
          as="select"
          value={selectedCourt}
          onChange={handleCourtSelect}
          disabled={!selectedDegree}
        >
          <option value="">Select Court</option>
          {courts.map((court) => (
            <option key={court.value} value={court.value}>
              {court.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {/* Case Types dropdown */}
      <Form.Group controlId="caseTypeSelect">
        <Form.Label>Select Case Type:</Form.Label>
        <Form.Control
          as="select"
          value={selectedCaseType}
          onChange={(e) => setSelectedCaseType(e.target.value)}
          disabled={!selectedCourt}
        >
          <option value="">Select Case Type</option>
          {caseTypes.map((caseType) => (
            <option key={caseType.value} value={caseType.value}>
              {caseType.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
}

export default CourtSearch;
