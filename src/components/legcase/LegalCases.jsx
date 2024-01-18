import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Alert, CardHeader } from 'react-bootstrap';
import API_CONFIG from '../../config';
import AddEditLegCase from './AddEditLegCase';
import SectionHeader from '../home_tools/SectionHeader';
import CustomPagination from '../home_tools/Pagination';
import { LegCaseIcon } from '../../assets/icons/index';

const LegalCases = () => {
  // State declarations
  const [legCases, setLegCases] = useState([]);
  const [filteredLegCases, setFilteredLegCases] = useState([]);
  const [legCasesPage, setLegCasesPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const itemsPerPage = 10;

  // Fetching legal cases
  useEffect(() => {
    const fetchLegCases = async () => {
      try {
        const response = await axios.get(`${API_CONFIG.baseURL}/api/legal-cases`);
        setLegCases(response.data);
        setFilteredLegCases(response.data);
      } catch (error) {
        console.error('Error fetching leg cases', error);
      }
    };

    fetchLegCases();
  }, []);

  // Event handlers
  const handlePageChange = (newPage) => {
    setLegCasesPage(newPage);
  };const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.baseURL}/api/legal-case-search?search=${searchQuery}`
      );
      setFilteredLegCases(response.data);
      setLegCasesPage(1); // Reset pagination to the first page after search
    } catch (error) {
      console.error('Error searching cases:', error);
    }
  };
  
  const deleteLegCase = async (id) => {
    try {
      await axios.delete(`${API_CONFIG.baseURL}/api/leg-cases/${id}`);
      setAlertMessage('Legal case successfully deleted');
      setShowAlert(true);
      fetchLegCases();
    } catch (error) {
      console.error('Error deleting legal case', error);
    }
  };

  // Pagination logic
  const startIndex = (legCasesPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLegCases = filteredLegCases.slice(startIndex, endIndex);

  return (
    <>
      <SectionHeader
        setShowAddModal={() => {
          setShowModal(true);
          setIsEditing(false);
        }}
        listName="القضايا"
        buttonName="قضية"
        icon={LegCaseIcon}
      />

      {showModal && (
        <AddEditLegCase isEditing={isEditing} onClose={() => setShowModal(false)} />
      )}
      <Card className="leg-case-list-card">
  <CardHeader>
    {showAlert && <Alert variant="success">{alertMessage}</Alert>}
  </CardHeader>
  <div className="text-center search-bar">
    {/* Search Bar */}
    <Row className="justify-content-center">
      <Col xs={12} md={6} lg={6} className="text-center text-md">
        <input
          type="text"
          className="form-control search-input"
          placeholder="ابحث..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="btn btn-primary btn-search"
          onClick={handleSearch}
        >
          بحث
        </button>
      </Col>
    </Row>
  </div>

  <Card.Body>
    <div className="table-responsive">
      <table className="special-table">
        <thead>
          <tr>
            <th className="header-cell">رقم الملف</th>
            <th className="header-cell">الموكل</th>
            <th className="header-cell">صفة</th>
            <th className="header-cell">الموضوع</th>
            <th className="header-cell">نوع القضية</th>
            <th className="header-cell">المحكمة</th>
            <th className="header-cell">الحالة</th>
            <th className="header-cell">التحكم</th>
          </tr>
        </thead>
        <tbody>
          {paginatedLegCases.map((legCase, index) => (
            <tr key={index}>
              <td>{legCase.slug}</td>
              <td>
                {legCase.clients && legCase.clients.map((client, clientIndex) => (
                  <span key={clientIndex}>
                    {client.name}
                    {clientIndex < legCase.clients.length - 1 && ', '}
                  </span>
                ))}
              </td>
              <td>{legCase.client_capacity}</td>
              <td>{legCase.title}</td>
              <td>{legCase.case_sub_type?.name || '-'}</td>
              <td>
                {legCase.courts && legCase.courts.map((court, courtIndex) => (
                  <span key={courtIndex}>
                    {court.name}
                    {courtIndex < legCase.courts.length - 1 && ', '}
                  </span>
                ))}
              </td>
              <td>{legCase.status}</td>
              <td>
                <div className="button-container">
                  <Link
                    className="btn btn-secondary mb-2 float-end"
                    to={`/legcases/show/${legCase.id}`}
                  >
                    عرض
                  </Link>
                  <button
                    className="btn btn-danger mb-2 float-end"
                    onClick={() => deleteLegCase(legCase.id)}
                  >
                    حذف
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card.Body>
  <Card.Footer>
    <CustomPagination
      totalCount={filteredLegCases.length}
      itemsPerPage={itemsPerPage}
      currentPage={legCasesPage}
      onPageChange={handlePageChange}
    />
  </Card.Footer>
</Card>

    </>
  );
};

export default LegalCases;
