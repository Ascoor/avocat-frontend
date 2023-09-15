// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Container, Form, Button } from 'react-bootstrap';
// import { useSpring, animated } from '@react-spring/web';
// import { FaSearch } from 'react-icons/fa';
// import API_CONFIG from '../../config';

// function CourtSearch() {
//   const [degreeOptions, setDegreeOptions] = useState([]);
//   const [selectedDegree, setSelectedDegree] = useState([]);
//   const [courtOptions, setCourtOptions] = useState([]);
//   const [selectedCourt, setSelectedCourt] = useState([]);
//   const [caseTypeOptions, setCaseTypeOptions] = useState([]);
//   const [selectedCaseType, setSelectedCaseType] = useState([]);
//   const [caseYear, setCaseYear] = useState('');
//   const [caseNumber, setCaseNumber] = useState('');
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const { data } = await axios.get(`${API_CONFIG.baseURL}/api/search/degrees`);
//       setDegreeOptions(data.degrees);
//     } catch (error) {
//       console.error(error);
//     }
//   };

  
//   const handleDegreeSelect = async (event) => {
//     const selectedDegree = event.target.value;
//     setSelectedDegree(selectedDegree);
//     try {
//       const { data } = await axios.get(`${API_CONFIG.baseURL}/api/search/court-options/${selectedDegree}`);
//       setCourtOptions(data.courts);
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
//   const handleCourtSelect = async (event) => {
//     const selectedCourt = event.target.value;
//     setSelectedCourt(selectedCourt);
//     try {
//       const { data } = await axios.get(`${API_CONFIG.baseURL}/search/case-type-options/${selectedCourt}`);
//       setCaseTypeOptions(data.caseTypeOptions);
//     } catch (error) {
//       console.error(error);
//     }
//   };
  
//   const handleSearchSubmit = async (event) => {
//     event.preventDefault();
//     const searchParams = {
//       selectedDegree,
//       selectedCourt,
//       selectedCaseType,
//       caseYear,
//       caseNumber,
//     };
  
//     try {
//       const fetchData = await axios.post(`${API_CONFIG.baseURL}/search/perform-search`, searchParams);
//       // Handle response here, for example:
//       // handleResponse(response.data);
//     } catch (error) {
//       // Handle error
//       console.error(error);
//     }
//   };
  
//   const handleCaseTypeSelect = async (event) => {
//     const value = event.target.value;
//     setSelectedCaseType(value);
//     // Add axios request or other logic here if needed
//   };

//   const handleCaseYearInput = (event) => {
//     const value = event.target.value;
//     setCaseYear(value);
//   };

//   const handleCaseNumberInput = (event) => {
//     const value = event.target.value;
//     setCaseNumber(value);
//   };
//   return (
//     <Container>
//       <h1>Court Search</h1>
//       <Link to="/">Back to Home</Link>

//       <animated.div style={formAnimation}>
//         <Form onSubmit={handleSearchSubmit}>
//           <Form.Group controlId="degreeSelect">
//             <Form.Label>Select Degree:</Form.Label>
//             <Form.Control
//               as="select"
//               value={selectedDegree}
//               onChange={handleDegreeSelect}
//             >
//               <option value="">Select</option>
//               {degreeOptions.length > 0 &&
//                 degreeOptions.map((degree) => (
//                   <option key={degree.value} value={degree.value}>
//                     {degree.label}
//                   </option>
//                 ))}
//             </Form.Control>
//           </Form.Group>

//           <Form.Group controlId="courtSelect">
//             <Form.Label>Select Court:</Form.Label>
//             <Form.Control
//               as="select"
//               value={selectedCourt}
//               onChange={handleCourtSelect}
//             >
//               <option value="">Select</option>
//               {courtOptions.map((court) => (
//                 <option key={court.id} value={court.id}>
//                   {court.name}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>

//           <Form.Group controlId="caseTypeSelect">
//             <Form.Label>Select Case Type:</Form.Label>
//             <Form.Control
//               as="select"
//               value={selectedCaseType}
//               onChange={handleCaseTypeSelect}
//             >
//               <option value="">Select</option>
//               {caseTypeOptions.map((caseType) => (
//                 <option key={caseType.id} value={caseType.id}>
//                   {caseType.name}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>

//           <Form.Group controlId="caseYearInput">
//             <Form.Label>Case Year:</Form.Label>
//             <Form.Control
//               type="text"
//               value={caseYear}
//               onChange={handleCaseYearInput}
//             />
//           </Form.Group>

//           <Form.Group controlId="caseNumberInput">
//             <Form.Label>Case Number:</Form.Label>
//             <Form.Control
//               type="text"
//               value={caseNumber}
//               onChange={handleCaseNumberInput}
//             />
//           </Form.Group>

//           <Button variant="primary" type="submit">
//             <FaSearch /> Search
//           </Button>
//         </Form>
//       </animated.div>
//     </Container>
//   );
// }

// export default CourtSearch;
