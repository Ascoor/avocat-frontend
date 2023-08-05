import React, { useState, useCallback, useEffect } from 'react';
import { Form, Table, Row, Col } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import API_CONFIG from '../../config';
import DatePicker from 'react-datepicker';

const ProcedureSearch = () => {
    const [procedureTypes, setProcedureTypes] = useState([]);
    const [procedures, setProcedures] = useState([]);
    const [lawyers, setLawyers] = useState([]);
    const [courts, setCourts] = useState([]);

    const [selectedProcedureType, setSelectedProcedureType] = useState('');
    const [selectedLawyer, setSelectedLawyer] = useState('');
    const [selectedDateStart, setSelectedDateStart] = useState(null);
    const [selectedDateEnd, setSelectedDateEnd] = useState(null);
    const [selectedCourt, setSelectedCourt] = useState('');

    const [filteredProcedures, setFilteredProcedures] = useState([]);
    useEffect(() => {
        fetch(`${API_CONFIG.baseURL}/api/procedure_types`)
            .then((response) => response.json())
            .then((data) => setProcedureTypes(data))
            .catch((error) => console.error('Error fetching procedure types:', error));

        fetch(`${API_CONFIG.baseURL}/api/lawyers`)
            .then((response) => response.json())
            .then((data) => setLawyers(data))
            .catch((error) => console.error('Error fetching lawyers:', error));

        fetch(`${API_CONFIG.baseURL}/api/courts`)
            .then((response) => response.json())
            .then((data) => setCourts(data))
            .catch((error) => console.error('Error fetching courts:', error));

        fetch(`${API_CONFIG.baseURL}/api/procedures`)
            .then((response) => response.json())
            .then((data) => {
                setProcedures(data);
                setFilteredProcedures(data);
            })
            .catch((error) => console.error('Error fetching procedures:', error));
    }, []);

    const filterProcedures = useCallback(() => {
        let filtered = [...procedures]; // Start with all procedures
        if (selectedProcedureType) {
            filtered = filtered.filter((procedure) => procedure.procedure_type === selectedProcedureType);
        }
        if (selectedLawyer) {
            filtered = filtered.filter((procedure) => procedure.lawyer === selectedLawyer);
        }
        if (selectedDateStart && selectedDateEnd) {
            filtered = filtered.filter((procedure) => {
                const date = new Date(procedure.date);
                return date >= selectedDateStart && date <= selectedDateEnd;
            });
        }
        if (selectedCourt) {
            filtered = filtered.filter((procedure) => procedure.court === selectedCourt);
        }
        setFilteredProcedures(filtered);
    }, [selectedProcedureType, selectedLawyer, selectedDateStart, selectedDateEnd, selectedCourt, procedures]);

    const handleSearch = (event) => {
        event.preventDefault();

        filterProcedures();
    };
    return (
        <div className="procedure-search">
            <Form onSubmit={handleSearch}>
                <Row>
                    <Col xs={12} sm={6}>
                        <Form.Group controlId="procedureType">
                            <Form.Label>نوع الإجراء</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedProcedureType}
                                onChange={(event) => setSelectedProcedureType(event.target.value)}
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
                            <Form.Label>المحامي</Form.Label>
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

                    <Col xs={12} sm={6}>
                        <Form.Group controlId="dateRange">
                            <Form.Label>الفترة الزمنية</Form.Label>
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

                        <Form.Group controlId="court">
                            <Form.Label>المحكمة</Form.Label>
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
                </Row>
                <button type="submit" className="search-button">
                    <FaSearch /> بحث
                </button>
            </Form>

            {filteredProcedures.length > 0 && (
                <Table>
                    <thead>
                        <tr>
                            <th>نوع اإجراء</th>
                            <th>المحامى</th>
                            <th>جهة الإجراء</th>
                            <th>تاريخ البدء</th>
                            <th>تاريخ الانتهاء</th>
                            <th>نتيجة الإجراء</th>
                            <th>حالة الإجراء</th>
                            {/* Add additional table headers as per your requirements */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProcedures.map((result) => (
                            <tr key={result._id}>
                                <td>{result.procedure_type?.name}</td>
                                <td>{result.lawyer?.name}</td>
                                <td>{result.court?.name}</td>
                                <td>{result.date_start}</td>
                                <td>{result.date_end}</td>
                                <td className="col-4">{result.result}</td>
                                <td>{result.status}</td>
                                {/* Display additional result fields in table cells */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default ProcedureSearch;
