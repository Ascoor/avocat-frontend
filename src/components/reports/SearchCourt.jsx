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
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const formData = {
      degree: selectedDegree,
      court: selectedCourt,
      caseType: selectedCaseType,
      caseYear: selectedCaseYear,
      caseNumber: selectedCaseNumber,
    };
  
    axios
      .post('https://search-api.avocat.live/search', formData, {

 
      })
      .then((response) => {
        // Update search results state
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.log(error);
        // Handle errors here, such as updating UI to show error message
      });
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
  as="input"
  type="number"
  pattern="\d{2,4}" // Regular expression to match exactly 4 digits
  title="Please enter a 4-digit year"
  value={selectedCaseYear} // Use selectedCaseYear here
  onChange={(event) => setSelectedCaseYear(event.target.value)}
  required
/>
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
      
      <div dangerouslySetInnerHTML={{ __html: searchResults }} />
    </section>
  );
};

export default SearchCourt;
